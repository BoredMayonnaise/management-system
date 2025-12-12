#!/usr/bin/env bash
# Start both backend and frontend and forward logs to console.
# This orchestrator runs backend and frontend in background and cleans them up on exit.
# Usage: ./scripts/run_all.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

# Configurable commands (point to your local script locations)
BACKEND_CMD="./run_backend.sh run"
FRONTEND_CMD="./run_frontend.sh dev"

# PIDs we start
PIDS=()
CLEAN_EXIT=false

# Cleanup logic
cleanup() {
    echo
    echo "[run_all] Cleaning up..."
    for pid in "${PIDS[@]}"; do
        if kill -0 "$pid" 2>/dev/null; then
            echo "[run_all] Killing process PID $pid"
            kill "$pid" 2>/dev/null || true
        fi
    done
    wait || true

    if [[ "$CLEAN_EXIT" == true ]]; then
        clear
        echo "[run_all] Clean exit — terminal cleared."
    else
        echo "[run_all] Exited due to error or signal — logs preserved."
    fi
    echo "[run_all] Done."
}

# Handle Ctrl+C, Ctrl+Z, kill, etc.
trap 'CLEAN_EXIT=true; cleanup; exit 0' INT
trap 'CLEAN_EXIT=false; cleanup; exit 1' TERM
trap 'CLEAN_EXIT=true; cleanup; exit 0' SIGTSTP  # Ctrl+Z

# Start backend
echo "[run_all] Starting backend..."
bash -c "$BACKEND_CMD" &
PIDS+=("$!")
sleep 0.5

# Start frontend
echo "[run_all] Starting frontend..."
bash -c "$FRONTEND_CMD" &
PIDS+=("$!")
sleep 0.5

# Wait and show simple status
while true; do
    for pid in "${PIDS[@]}"; do
        if kill -0 "$pid" 2>/dev/null; then
            : # still alive
        else
            echo "[run_all] Process $pid exited. Exiting orchestrator."
            CLEAN_EXIT=true
            cleanup
            exit 0
        fi
    done
    sleep 1
done
