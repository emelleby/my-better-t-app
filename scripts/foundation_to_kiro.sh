#!/bin/bash

# Run this if NOT using KIRO IDE.
# Run if you are in Cursor, Augment, Windsurf, etc..

# Configuration
SOURCE_DIR="/home/eivind/my-better-t-app/Foundation"
TARGET_DIR="/home/eivind/my-better-t-app/.kiro"

# Ensure we have the required directories
mkdir -p "$TARGET_DIR"

# Function to sync from Foundation to .kiro
sync_from_foundation() {
    rsync -a --delete "$SOURCE_DIR/" "$TARGET_DIR" >/dev/null 2>&1
}

# Initial sync
sync_from_foundation

# Monitor Foundation directory for changes
while true; do
    inotifywait -r -e modify,create,delete,move "$SOURCE_DIR" 2>/dev/null
    sync_from_foundation
done
