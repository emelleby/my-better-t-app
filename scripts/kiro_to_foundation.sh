#!/bin/bash

# Run this if you're using KIRO

# Configuration
SOURCE_DIR="/home/eivind/my-better-t-app/.kiro"
TARGET_DIR="/home/eivind/my-better-t-app/Foundation"
LOG_FILE="/home/eivind/my-better-t-app/kiro_to_foundation.log"

# Ensure we have the required directories
mkdir -p "$TARGET_DIR"

# Function to sync from .kiro to Foundation
sync_from_kiro() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Starting sync from .kiro to Foundation" >> "$LOG_FILE"
    rsync -av --delete "$SOURCE_DIR/" "$TARGET_DIR" >> "$LOG_FILE" 2>&1
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Sync from .kiro to Foundation completed" >> "$LOG_FILE"
}

# Initial sync
sync_from_kiro

# Monitor .kiro directory for changes
while true; do
    inotifywait -r -e modify,create,delete,move "$SOURCE_DIR" 2>/dev/null
    sync_from_kiro
done
