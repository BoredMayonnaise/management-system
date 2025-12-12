#!/usr/bin/env bash
# Build and run the Crow backend (CMake + make)
# Usage: ./scripts/run_backend.sh [build|run|clean]
# Default action: run (builds first if necessary)

set -euo pipefail

# Configuration
: "${BACKEND_SRC_DIR:=../backend}"
: "${BACKEND_BUILD_DIR:=${BACKEND_SRC_DIR}/build}"
: "${BACKEND_BIN:=${BACKEND_BUILD_DIR}/server}"
: "${CMAKE_GENERATOR:=Unix Makefiles}"
: "${BUILD_TYPE:=Release}"
: "${NUM_JOBS:=$(nproc 2>/dev/null || echo 1)}"
: "${BACKEND_PORT:=18080}"

ACTION="${1:-run}"

cd "$(dirname "$0")" || exit 1
SRC_DIR="$(realpath "$BACKEND_SRC_DIR")"
BUILD_DIR="$(realpath "$BACKEND_BUILD_DIR")"
mkdir -p "$BUILD_DIR"

# -------------------------------
# Cleanup logic
# -------------------------------
cleanup() {
    echo
    echo "[backend] Cleaning up (killing backend and clearing terminal)..."

    if [[ -n "${BACKEND_PID:-}" ]] && ps -p "$BACKEND_PID" &>/dev/null; then
        kill -9 "$BACKEND_PID" 2>/dev/null || true
    fi

    if command -v fuser &>/dev/null; then
        fuser -k "${BACKEND_PORT}/tcp" 2>/dev/null || true
    elif command -v lsof &>/dev/null; then
        lsof -ti tcp:"${BACKEND_PORT}" | xargs -r kill -9 2>/dev/null || true
    else
        pkill -f "$BACKEND_BIN" 2>/dev/null || true
    fi

    sleep 0.2
    clear
    echo "[backend] ✅ Server stopped and terminal cleaned."
}

# Only clean on manual signals (not every exit)
trap cleanup SIGINT SIGTERM SIGTSTP

# -------------------------------
# Actions
# -------------------------------
if [[ "$ACTION" == "clean" ]]; then
    echo "[backend] Cleaning build directory: $BUILD_DIR"
    rm -rf "$BUILD_DIR"/*
    exit 0
fi

if [[ "$ACTION" == "build" || "$ACTION" == "run" ]]; then
    echo "[backend] Configuring (CMake) -> build dir: $BUILD_DIR"
    cmake -S "$SRC_DIR" -B "$BUILD_DIR" -G "$CMAKE_GENERATOR" -DCMAKE_BUILD_TYPE="$BUILD_TYPE"
    echo "[backend] Building with $NUM_JOBS jobs"
    make -C "$BUILD_DIR" -j"$NUM_JOBS"
fi

# -------------------------------
# Load environment variables
# -------------------------------
ENV_FILE="${SRC_DIR}/.env"
if [ -f "$ENV_FILE" ]; then
    echo "[backend] Loading environment variables from $ENV_FILE"
    set -o allexport
    # shellcheck source=/dev/null
    source "$ENV_FILE"
    set +o allexport
else
    echo "[backend] No .env file found at $ENV_FILE, using system environment."
fi

if [[ "$ACTION" == "run" ]]; then
    if [[ ! -x "$BACKEND_BIN" ]]; then
        echo "[backend] ERROR: binary not found or not executable: $BACKEND_BIN" >&2
        exit 2
    fi

    echo "[backend] Running $BACKEND_BIN (Press Ctrl+C to stop)"
    "$BACKEND_BIN" > backend.log 2>&1 &
    BACKEND_PID=$!
    wait "$BACKEND_PID"
fi

# Clear only if script succeeded (no errors)
if [[ $? -eq 0 ]]; then
    clear
    echo "[backend] finished successfully."
fi