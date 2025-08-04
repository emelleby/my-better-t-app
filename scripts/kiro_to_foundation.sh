#!/bin/bash

# Run this if you're using KIRO

# Configuration
SOURCE_DIR="/home/eivind/my-better-t-app/.kiro"
TARGET_DIR="/home/eivind/my-better-t-app/Foundation"

# Ensure we have the required directories
mkdir -p "$TARGET_DIR"

# Function to sync from .kiro to Foundation
sync_from_kiro() {
    rsync -a --delete "$SOURCE_DIR/" "$TARGET_DIR" >/dev/null 2>&1
}

# Initial sync
sync_from_kiro

# Monitor .kiro directory for changes
while true; do
    inotifywait -r -e modify,create,delete,move "$SOURCE_DIR" 2>/dev/null
    sync_from_kiro
done
