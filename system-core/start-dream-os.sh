#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'
echo "╔════════════════════════════════════════════════════════════════╗"
echo -e "║   ${GREEN}🚀 DREAM OS STARTUP SEQUENCE${NC}                              ║"
# --- [1/3] Jantung MariaDB ---
if pgrep -x "mariadbd" > /dev/null; then
    echo -e "║   ✅ MariaDB: ALREADY RUNNING"
else
    echo -e "║   ⏳ Memaksa MariaDB Bangun..."
    # Pakai mysqld_safe (standar Termux mariadb)
    mysqld_safe --datadir=$PREFIX/var/lib/mysql > /dev/null 2>&1 &
    sleep 6
    if pgrep -x "mariadbd" > /dev/null; then
        echo -e "║   ✅ MariaDB: ONLINE NOW"
    else
        echo -e "║   ❌ MariaDB: GAGAL (Coba ketik 'mariadbd' manual)"
    fi
fi

# --- [2/3] Jantung Bridge API ---
echo -e "║   ⏳ Menghubungkan Bridge..."
# Pastikan bridge.js ada di folder home (~)
nohup node ~/bridge.js > ~/bridge.log 2>&1 &
sleep 3
if pgrep -f "node.*bridge.js" > /dev/null; then
    echo -e "║   ✅ Bridge: ACTIVE"
else
    echo -e "║   ❌ Bridge: CRASHED (Cek log di ~/bridge.log)"
fi



echo -e "║   ${BLUE}[2/3] Checking Bridge API...${NC}                                ║"
if pgrep -f "node.*bridge.js" > /dev/null; then
    echo -e "║   ${GREEN}✅ Bridge API: RUNNING${NC}                                  ║"
else
    echo -e "║   ${YELLOW}⚠️  Bridge API: Starting...${NC}                             ║"
    cd ~
    nohup node bridge.js > ~/bridge.log 2>&1 &
    sleep 2
fi
echo -e "║   ${BLUE}[3/3] Checking Prayer Time...${NC}                               ║"
if [ -f ~/jadwal_sholat.py ]; then
    echo -e "║   ${GREEN}✅ Prayer Script: EXISTS${NC}                                ║"
    python3 ~/jadwal_sholat.py
fi
echo "╠════════════════════════════════════════════════════════════════╣"
echo -e "║   ${GREEN}🎉 DREAM OS READY${NC}                                            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
