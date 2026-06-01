#!/usr/bin/env bash
set -e
# deploy-delphos.sh — Build Delphos SPA (Vite) and deploy to Chromebook
# Usage: ./deploy-delphos.sh [--build-only | --deploy-only]

SOURCE_DIR="$HOME/proyectos/delphos/delphos-app"
CHROMEBOOK_TARGET="/home/satanasio/delphosdesign-site"
SSH_ALIAS="penguin-zrok2"
NODE_BIN="$HOME/.nvm/versions/node/v20.20.2/bin/node"
NPM_BIN="$HOME/.nvm/versions/node/v20.20.2/bin/npm"

BUILD=true
DEPLOY=true

for arg in "$@"; do
    case "$arg" in
        --build-only) DEPLOY=false ;;
        --deploy-only) BUILD=false ;;
        --help) echo "Usage: $0 [--build-only|--deploy-only]" && exit 0 ;;
    esac
done

echo "=== Delphos SPA Deploy ==="

if $BUILD; then
    echo ""
    echo "[BUILD] Building Vite SPA..."
    if [ ! -d "$SOURCE_DIR" ]; then
        echo "ERROR: Source directory not found: $SOURCE_DIR"
        exit 1
    fi
    cd "$SOURCE_DIR"

    if [ -d node_modules ]; then
        echo "   node_modules exists, skipping install"
    else
        echo "   Running npm install..."
        "$NPM_BIN" install
    fi

    echo "   Running npm run build..."
    PATH="$(dirname "$NODE_BIN"):$PATH" "$NPM_BIN" run build

    if [ ! -d dist ]; then
        echo "ERROR: Build failed — no dist/ directory"
        exit 1
    fi
    echo "   Build complete: $(du -sh dist | cut -f1)"
fi

if $DEPLOY; then
    echo ""
    echo "[DEPLOY] Deploying to Chromebook ($SSH_ALIAS)..."
    if ! ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no "$SSH_ALIAS" "echo ok" >/dev/null 2>&1; then
        echo "ERROR: Cannot SSH to $SSH_ALIAS"
        exit 1
    fi

    ssh "$SSH_ALIAS" "mkdir -p '$CHROMEBOOK_TARGET'"

    tar czf - -C "$SOURCE_DIR/dist" . | ssh "$SSH_ALIAS" \
        "rm -rf '$CHROMEBOOK_TARGET'/* && tar xzf - -C '$CHROMEBOOK_TARGET/'"

    echo "   Deployed: $(ssh "$SSH_ALIAS" "ls '$CHROMEBOOK_TARGET/' | wc -l") files"

    echo ""
    echo "[VERIFY] Testing public URL..."
    HTTP_CODE=$(curl -s -o /dev/null -w '%{http_code}' https://delphosdesign.share.zrok.io/ 2>/dev/null || echo "unreachable")
    echo "   https://delphosdesign.share.zrok.io/ → $HTTP_CODE"

    ssh "$SSH_ALIAS" "systemctl --user is-active delphos-site.service 2>/dev/null || echo 'inactive'"
fi

echo ""
echo "=== Done ==="
