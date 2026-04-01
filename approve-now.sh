#!/bin/bash
FILE=$1

if [ -z "$FILE" ]; then
    echo "❌ Gunakan: ./approve-now.sh [nama-file]"
    exit 1
fi

if [ -f "$FILE" ]; then
    sed -i 's/⏳ MENUNGGU PERSETUJUAN/✅ DISETUJUI (APPROVED)/g' "$FILE"
    echo -e "\n--- DIGITAL SIGNATURE ---" >> "$FILE"
    echo "Disetujui Oleh: Hanung Budianto S. E" >> "$FILE"
    echo "Tanggal Acc   : $(date '+%Y-%m-%d %H:%M:%S')" >> "$FILE"
    echo "Status        : SINKRON KE DATABASE ISO" >> "$FILE"
    echo "--------------------------" >> "$FILE"
    echo "✅ Berhasil! Laporan $FILE sudah sah."
else
    echo "❌ File tidak ditemukan!"
fi
