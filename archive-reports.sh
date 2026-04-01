#!/bin/bash

# 1. Buat folder arsip kalau belum ada
mkdir -p ~/dream-os/archive

echo "🔍 Memeriksa laporan yang sudah disetujui..."
COUNT=0

# 2. Cari file .txt yang mengandung kata "DISETUJUI"
for file in ~/dream-os/laporan-k3-*.txt; do
    if [ -f "$file" ]; then
        if grep -q "✅ DISETUJUI (APPROVED)" "$file"; then
            mv "$file" ~/dream-os/archive/
            echo "📦 Mengarsipkan: $(basename "$file") -> [OK]"
            ((COUNT++))
        fi
    fi
done

# 3. Hasil Akhir
if [ $COUNT -gt 0 ]; then
    echo "========================================"
    echo "✅ BERHASIL! $COUNT laporan dipindahkan ke ~/dream-os/archive"
    echo "========================================"
else
    echo "ℹ️ Tidak ada laporan baru yang siap diarsipkan."
fi
