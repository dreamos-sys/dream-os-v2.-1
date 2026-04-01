#!/bin/bash
# ~/dream-os/backup-simple.sh - IMPROVED ✨

set -e  # Exit on error

DATE=$(date +%Y-%m-%d)
VAULT="vault_dream_os_$DATE.zip"
BACKUP_DIR="$HOME/dream-os"
STORAGE_PATH="/sdcard/Download"

echo "🔐 Dream OS Backup Script v2.1"
echo "=============================="

# 🔑 Handle password
if [ -z "$BACKUP_PASS" ]; then
  echo "⚠️ BACKUP_PASS not set! Using unencrypted backup..."
  echo "💡 Hint: export BACKUP_PASS='your-secret-password' for encryption"
  ZIP_CMD="zip -r"
else
  echo "✅ Encryption enabled"
  ZIP_CMD="zip -r -P '$BACKUP_PASS'"
fi

# 📦 Create backup
echo -e "\n📦 Creating backup: $VAULT"
if [ -d "$BACKUP_DIR/config" ] || [ -d "$BACKUP_DIR/data" ]; then
  eval $ZIP_CMD "$VAULT" \
    "$BACKUP_DIR/config" \
    "$BACKUP_DIR/data" \
    "$BACKUP_DIR/pages/api" \
    "$BACKUP_DIR/.env*" 2>/dev/null || true
  echo "✅ Vault created"
else
  echo "⚠️ No config/data folders found, backing up root..."
  eval $ZIP_CMD "$VAULT" "$BACKUP_DIR" 2>/dev/null || true
fi

# 📁 Copy to external storage
if [ -d "$STORAGE_PATH" ]; then
  echo -e "\n📁 Copying to external storage..."
  cp -v "$VAULT" "$STORAGE_PATH/" && echo "✅ Copied to $STORAGE_PATH"
else
  echo "⚠️ External storage not accessible, skipping..."
fi

# ☁️ Cloud upload placeholder
echo -e "\n☁️ Cloud upload: (configure your API here)"
# Example: curl -X POST ... 

# 📋 Summary
echo -e "\n📋 Backup Summary:"
echo "   File: $VAULT"
echo "   Size: $(du -h "$VAULT" 2>/dev/null | cut -f1)"
echo "   Encrypted: $([ -n "$BACKUP_PASS" ] && echo '✅ Yes' || echo '❌ No')"
echo -e "\n✨ Backup completed!"
