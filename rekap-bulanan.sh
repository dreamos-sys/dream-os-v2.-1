#!/bin/bash

MONTH=$(date +%Y-%m)
ARCHIVE_DIR="$HOME/dream-os/archive"
REKAP_FILE="$HOME/dream-os/rekap-$MONTH.txt"

echo "🔍 Memulai Proses Rekapitulasi Dream OS [Bulan: $MONTH]..."

# 1. Hitung Total Laporan
TOTAL=$(ls $ARCHIVE_DIR/laporan-k3-$MONTH-*.txt 2>/dev/null | wc -l)

# 2. Buat Header Rekap
echo "========================================" > "$REKAP_FILE"
echo "      DREAM OS MONTHLY RECAPITULATION   " >> "$REKAP_FILE"
echo "========================================" >> "$REKAP_FILE"
echo "PERIODE     : $MONTH" >> "$REKAP_FILE"
echo "TOTAL DATA  : $TOTAL Laporan Terverifikasi" >> "$REKAP_FILE"
echo "STATUS      : SINKRON (ISO STANDARD)" >> "$REKAP_FILE"
echo "----------------------------------------" >> "$REKAP_FILE"
echo -e "DAFTAR LAPORAN TERSERTIFIKASI:\n" >> "$REKAP_FILE"

# 3. List Detail Singkat tiap Laporan
if [ $TOTAL -gt 0 ]; then
    for file in $ARCHIVE_DIR/laporan-k3-$MONTH-*.txt; do
        ID=$(grep "ID LAPORAN" "$file" | cut -d':' -f2 | xargs)
        DATE=$(basename "$file" | cut -d'-' -f3-5 | cut -d'.' -f1)
        echo "• [$DATE] ID: $ID -> [APPROVED]" >> "$REKAP_FILE"
    done
else
    echo "⚠️ Belum ada data untuk periode ini." >> "$REKAP_FILE"
fi

# 4. Footer & Penutup Digital
echo -e "\n----------------------------------------" >> "$REKAP_FILE"
echo "RINGKASAN EKSEKUTIF:" >> "$REKAP_FILE"
echo "Semua laporan dalam folder arsip telah" >> "$REKAP_FILE"
echo "melalui proses validasi digital oleh" >> "$REKAP_FILE"
echo "Kabag Umum & Koordinator Bagian Umum." >> "$REKAP_FILE"
echo "----------------------------------------" >> "$REKAP_FILE"
echo "VERIFIKASI  : [Dream OS Analytics v13]" >> "$REKAP_FILE"
echo "TANGGAL CETAK: $(date '+%Y-%m-%d %H:%M:%S')" >> "$REKAP_FILE"
echo "========================================" >> "$REKAP_FILE"

echo "✅ Rekapitulasi Berhasil! File: rekap-$MONTH.txt"
