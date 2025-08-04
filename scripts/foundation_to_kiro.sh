#!/bin/bash

# Run this if NOT using KIRO IDE.
# Run if you are in Cursor, Augment, Windsurf, etc..

# Configuration
SOURCE_DIR="/home/eivind/my-better-t-app/Foundation"
TARGET_DIR="/home/eivind/my-better-t-app/.kiro"
LOG_FILE="/home/eivind/my-better-t-app/foundation_to_kiro.log"

# Ensure we have the required directories
mkdir -p "$TARGET_DIR"

# Function to sync from Foundation to .kiro
sync_from_foundation() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Starting sync from Foundation to .kiro" >> "$LOG_FILE"
    rsync -av --delete "$SOURCE_DIR/" "$TARGET_DIR" >> "$LOG_FILE" 2>&1
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Sync from Foundation to .kiro completed" >> "$LOG_FILE"
}

# Initial sync
sync_from_foundation

# Monitor Foundation directory for changes
while true; do
    inotifywait -r -e modify,create,delete,move "$SOURCE_DIR" 2>/dev/null
    sync_from_foundation
done
