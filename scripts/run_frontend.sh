#!/usr/bin/env bash
# Install & run Next.js frontend
# Usage: ./scripts/run_frontend.sh [install|dev|build|start|clean]
# Default: dev (development server)

set -u  # strict on undefined vars
# note: no 'set -e' so we can handle errors ourselves

: "${FRONTEND_DIR:=../frontend}"
: "${NODE_ENV:=development}"
: "${NEXT_PORT:=3001}"
ACTION="${1:-dev}"

cd "$(dirname "$0")" || exit 1
FRONT_DIR="$(realpath "$FRONTEND_DIR")"
cd "$FRONT_DIR"

# Detect npm or pnpm
if command -v pnpm >/dev/null 2>&1; then
    PM="pnpm"
else
    PM="npm"
fi

# --------------------------------
# Cleanup handler (manual stop only)
# --------------------------------
cleanup_on_signal() {
    echo
    echo "[frontend] Caught interrupt — cleaning up..."
    # Kill any process using the port
    if command -v fuser &>/dev/null; then
        fuser -k "${NEXT_PORT}/tcp" 2>/dev/null || true
    elif command -v lsof &>/dev/null; then
        lsof -ti tcp:"${NEXT_PORT}" | xargs -r kill -9 2>/dev/null || true
    else
        pkill -f "next.*${NEXT_PORT}" 2>/dev/null || true
    fi
    sleep 0.2
    clear
    echo "[frontend] ✅ Server stopped and terminal cleaned."
    exit 0
}
trap cleanup_on_signal SIGINT SIGTERM SIGTSTP

# --------------------------------
# Actions
# --------------------------------
case "$ACTION" in
    install)
        echo "[frontend] Installing dependencies with $PM"
        if ! "$PM" install; then
            echo "[frontend] ❌ Installation failed — logs preserved."
            exit 1
        fi
        ;;

    dev)
        echo "[frontend] Starting Next.js dev server on port ${NEXT_PORT}"
        export NODE_ENV="$NODE_ENV"
        export PORT="$NEXT_PORT"

        # Start the dev server
        if [[ "$PM" == "pnpm" ]]; then
            $PM run dev &
        else
            $PM run dev &
        fi

        FRONT_PID=$!
        wait "$FRONT_PID"
        STATUS=$?

        if [[ $STATUS -ne 0 ]]; then
            echo
            echo "[frontend] ❌ Dev server exited with code $STATUS — logs preserved."
            exit $STATUS
        else
            clear
            echo "[frontend] ✅ Dev server stopped cleanly."
        fi
        ;;

    build)
        echo "[frontend] Building production assets..."
        if ! "$PM" run build; then
            echo "[frontend] ❌ Build failed — logs preserved."
            exit 1
        fi
        clear
        echo "[frontend] ✅ Build finished successfully."
        ;;

    start)
        echo "[frontend] Starting production server (port ${NEXT_PORT})"
        export NODE_ENV=production
        export PORT="$NEXT_PORT"

        if [[ "$PM" == "pnpm" ]]; then
            $PM run start &
        else
            $PM run start &
        fi

        FRONT_PID=$!
        wait "$FRONT_PID"
        STATUS=$?

        if [[ $STATUS -ne 0 ]]; then
            echo
            echo "[frontend] ❌ Server crashed (exit $STATUS) — logs preserved."
            exit $STATUS
        else
            clear
            echo "[frontend] ✅ Frontend stopped cleanly."
        fi
        ;;

    clean)
        echo "[frontend] Cleaning .next and node_modules (use with caution)"
        rm -rf .next node_modules
        ;;

    *)
        echo "Unknown action: $ACTION"
        exit 1
        ;;
esac
