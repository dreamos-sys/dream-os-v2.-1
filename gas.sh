#!/bin/bash
V=$(date +%s)

# 1. TULIS ULANG INDEX.HTML (BIAR PASTI BERUBAH & GIT GAK OON)
cat << INDEX > index.html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Dream OS Sovereign</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="style.css?v=$V">
    <link rel="manifest" href="manifest.json?v=$V">
</head>
<body>
    <div id="layer-home" class="layer-active">
        <div class="login-card">
            <img src="assets/img/icon-512.png" class="logo-sovereign" alt="Logo">
            <div class="bismillah">بِسْمِ اللَّهِ</div>
            <div class="input-wrapper">
                <input type="password" id="main-pwd" class="input-pro" placeholder="MASUKKAN PIN DEMO">
                <i class="fa-solid fa-eye" id="togglePassword"></i>
            </div>
            <button class="btn-authorize" onclick="window.DREAM.login()">Authorize</button>
        </div>
    </div>
    <div id="app-shell" class="layer-hidden" style="display:none;"></div>
    
    <script src="js/modules.js?v=$V"></script>
    <script src="js/navigation.js?v=$V"></script>
    <script>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js?v=$V');
        }
    </script>
</body>
</html>
INDEX

# 2. RESTART SERVER
fuser -k 8080/tcp > /dev/null 2>&1
http-server . -p 8080 -c-1 > /dev/null 2>&1 & 

echo "🚀 DREAM OS V.$V - FORCE DEPLOYED!"
echo "🔗 Local: http://localhost:8080"

# 3. PUSH KE CLOUD (PASTI KEDETEKSI BERUBAH)
(
  git add index.html
  git commit -m "brutal-update-v$V" > /dev/null 2>&1
  git push origin main > /dev/null 2>&1 && echo "☁️ GitHub Updated & Pinter!"
) &
