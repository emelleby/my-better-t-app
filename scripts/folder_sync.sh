#!/bin/bash

# Configuration
SOURCE_DIR="/home/eivind/my-better-t-app/.kiro"
TARGET_DIR="/home/eivind/my-better-t-app/Foundation"
LOG_FILE="/home/eivind/my-better-t-app/sync.log"

# Ensure we have the required directories
mkdir -p "$TARGET_DIR"

# Function to sync directories
sync_directories() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Starting sync" >> "$LOG_FILE"
    rsync -av --delete "$SOURCE_DIR/" "$TARGET_DIR" >> "$LOG_FILE" 2>&1
    rsync -av --delete "$TARGET_DIR/" "$SOURCE_DIR" >> "$LOG_FILE" 2>&1
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Sync completed" >> "$LOG_FILE"
}

# Initial sync
sync_directories

# Monitor both directories for changes
while true; do
    inotifywait -r -e modify,create,delete,move "$SOURCE_DIR" "$TARGET_DIR" 2>/dev/null
    sync_directories
done