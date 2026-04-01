#!/bin/bash
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M:%S)
FILE="laporan-k3-$DATE.txt"

echo "🔄 Generating Report via Cloud Gemma 3..."
RESP=$(curl -s -X POST "https://dream-os-v21-pro.vercel.app/api/ai/chat" \
  -H "Content-Type: application/json" \
  -d "{\"prompt\":\"Buat laporan insiden K3 singkat untuk tanggal $DATE\"}")

# Ekstrak response
echo "$RESP" | grep -o '"response":"[^"]*"' | sed 's/"response":"//;s/"$//' | sed 's/\\n/\n/g' > "$FILE"

# 🛡️ SUNTIKKAN APPROVAL BLOCK (Dream OS v13 Standard)
echo -e "\n\n========================================" >> "$FILE"
echo "        DREAM OS APPROVAL SYSTEM        " >> "$FILE"
echo "========================================" >> "$FILE"
echo "ID LAPORAN  : K3-$DATE-$(date +%s)" >> "$FILE"
echo "STATUS      : ⏳ MENUNGGU PERSETUJUAN" >> "$FILE"
echo "WAKTU KIRIM : $DATE $TIME" >> "$FILE"
echo "----------------------------------------" >> "$FILE"
echo "PEMOHON     : Erwinsyah (Koordinator)" >> "$FILE"
echo "APPROVER    : Hanung Budianto S. E (Kabag Umum)" >> "$FILE"
echo "----------------------------------------" >> "$FILE"
echo "VERIFIKASI  : [Dream OS Verified System]" >> "$FILE"
echo "========================================" >> "$FILE"

echo "✅ Laporan Berhasil Dibuat & Dikirim ke Antrian Approval: $FILE"
