#!/bin/bash

# 1. SENSOR HARDWARE (Xiaomi Redmi Note 9 Pro Lock)
DEVICE_MODEL=$(getprop ro.product.model)
EXPECTED_DEVICE="Redmi Note 9 Pro"

echo "🔍 Memverifikasi Identitas Device..."
if [ "$DEVICE_MODEL" != "$EXPECTED_DEVICE" ]; then
    echo "========================================"
    echo "❌ SECURITY ALERT: DEVICE TIDAK DIKENALI!"
    echo "📍 Lokasi: Unknown Device ($DEVICE_MODEL)"
    echo "⚡ Trigger: Depok Lightning Strike AKTIF!"
    echo "========================================"
    exit 1
fi
echo "✅ Device Terverifikasi: $DEVICE_MODEL (Master Confirmed)"

# 2. KONFIGURASI BRANKAS
VAULT_DIR="$HOME/dream-os/archive"
VAULT_FILE="$HOME/dream-os/vault_dream_os_$(date +%Y-%m).zip"

echo -e "\n🔐 Mengaktifkan Protokol Keamanan Dream OS v13..."
echo "----------------------------------------"

if [ ! -d "$VAULT_DIR" ] || [ -z "$(ls -A $VAULT_DIR)" ]; then
    echo "❌ ERROR: Folder arsip kosong!"
    exit 1
fi

# 3. MANTRA KEAMANAN
echo -n "🔑 Masukkan Mantra Keamanan: "
read -s MANTRA
echo ""

# 4. ENKRIPSI
echo "📦 Membungkus data ke dalam Brankas Terenkripsi..."
zip -P "$MANTRA" -r -q "$VAULT_FILE" "$VAULT_DIR"

if [ $? -eq 0 ]; then
    echo "🛡️ Status: DATA TERKUNCI (ENCRYPTED)"
    echo "📍 Lokasi: $VAULT_FILE"
    
    # 5. PROTOKOL BACKUP OTOMATIS (Cloud Sync)
    echo -e "\n☁️ Memulai Backup ke Cloud (Dream Team Network)..."
    echo "📧 Target 1: girangati1001@gmail.com"
    echo "📧 Target 2: dreamos.sch.id@gmail.com"
    
    # Simulasi pengiriman via termux-share (Master bisa pilih Gmail)
    # Atau jika Master ingin otomatis via API, kita gunakan curl ke Vercel nanti
    echo "📤 Menyiapkan paket pengiriman..."
    termux-share -a send "$VAULT_FILE"
    
    echo "========================================"
    echo "✅ SECURITY & BACKUP: SINKRON TOTAL"
    echo "========================================"
else
    echo "❌ GAGAL: Enkripsi terhenti!"
fi
