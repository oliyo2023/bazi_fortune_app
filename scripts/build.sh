#!/bin/bash

# Flutter build script for both Android and development
# Usage: ./scripts/build.sh [task]
# Tasks: apk-arm64, apk-all, aab, clean, apk-arm64-tag

set -e

TASK="${1:-apk-arm64}"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Resolve repository root
resolve_repo_root() {
    local script_dir
    script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local repo_root
    repo_root="$(dirname "$script_dir")"
    echo "$repo_root"
}

# Ensure fronted directory exists
ensure_fronted_dir() {
    local repo_root
    repo_root=$(resolve_repo_root)
    
    if [ ! -f "$repo_root/fronted/pubspec.yaml" ]; then
        echo -e "${RED}Error: fronted/pubspec.yaml not found${NC}"
        echo "Ensure Flutter project is under 'fronted'"
        exit 1
    fi
    
    cd "$repo_root/fronted"
}

# Common build steps
run_common() {
    echo -e "${YELLOW}==> flutter clean${NC}"
    flutter clean
    echo -e "${YELLOW}==> flutter pub get${NC}"
    flutter pub get
}

# Get app version from pubspec.yaml
get_app_version() {
    if [ -f "pubspec.yaml" ]; then
        grep "version:" pubspec.yaml | head -1 | sed 's/version:[[:space:]]*//g' | sed 's/[[:space:]]*$//'
    else
        echo "0.0.0+0"
    fi
}

# Sanitize filename (replace special chars with -)
sanitize_name() {
    local name="$1"
    echo "$name" | sed 's/[^0-9A-Za-z._-]/-/g'
}

# Build APK for arm64-v8a only
build_apk_arm64() {
    run_common
    echo -e "${YELLOW}==> Build APK (arm64-v8a only)${NC}"
    flutter build apk \
        --release \
        --split-per-abi \
        --target-platform=android-arm64 \
        --obfuscate \
        --split-debug-info=build/symbols \
        --tree-shake-icons
    echo -e "${GREEN}Output: build/app/outputs/flutter-apk/app-arm64-v8a-release.apk${NC}"
}

# Build APK for both armeabi-v7a and arm64-v8a
build_apk_all() {
    run_common
    echo -e "${YELLOW}==> Build APK (armeabi-v7a + arm64-v8a)${NC}"
    flutter build apk \
        --release \
        --split-per-abi \
        --target-platform=android-arm,android-arm64 \
        --obfuscate \
        --split-debug-info=build/symbols \
        --tree-shake-icons
    echo -e "${GREEN}Output: build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk${NC}"
    echo -e "${GREEN}Output: build/app/outputs/flutter-apk/app-arm64-v8a-release.apk${NC}"
}

# Build AAB (App Bundle)
build_aab() {
    run_common
    echo -e "${YELLOW}==> Build AAB (App Bundle)${NC}"
    flutter build appbundle \
        --release \
        --obfuscate \
        --split-debug-info=build/symbols \
        --tree-shake-icons
    echo -e "${GREEN}Output: build/app/outputs/bundle/release/app-release.aab${NC}"
}

# Build APK with version and timestamp tag
build_apk_arm64_tagged() {
    run_common
    echo -e "${YELLOW}==> Build APK (arm64-v8a only, with version+timestamp tag)${NC}"
    
    flutter build apk \
        --release \
        --split-per-abi \
        --target-platform=android-arm64 \
        --obfuscate \
        --split-debug-info=build/symbols \
        --tree-shake-icons
    
    local src="build/app/outputs/flutter-apk/app-arm64-v8a-release.apk"
    
    if [ ! -f "$src" ]; then
        echo -e "${RED}Error: Expected APK not found: $src${NC}"
        exit 1
    fi
    
    local ver
    ver=$(get_app_version)
    local ts
    ts=$(date +"%Y%m%d-%H%M%S")
    local tag
    tag=$(sanitize_name "v$ver-$ts")
    local dst="build/app/outputs/flutter-apk/app-arm64-v8a-release-$tag.apk"
    
    cp "$src" "$dst"
    echo -e "${GREEN}Output: $dst${NC}"
}

# Clean build artifacts
clean_all() {
    echo -e "${YELLOW}==> flutter clean${NC}"
    flutter clean
}

# Main script logic
main() {
    case "$TASK" in
        apk-arm64)
            ensure_fronted_dir
            build_apk_arm64
            ;;
        apk-all)
            ensure_fronted_dir
            build_apk_all
            ;;
        aab)
            ensure_fronted_dir
            build_aab
            ;;
        apk-arm64-tag)
            ensure_fronted_dir
            build_apk_arm64_tagged
            ;;
        clean)
            ensure_fronted_dir
            clean_all
            ;;
        *)
            echo -e "${RED}Error: Unknown task: $TASK${NC}"
            echo "Available tasks: apk-arm64, apk-all, aab, clean, apk-arm64-tag"
            exit 1
            ;;
    esac
    
    echo -e "${GREEN}✓ Done task: $TASK${NC}"
}

# Run main function
main
