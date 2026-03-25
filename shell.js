(function() {
    'use strict';
    let att = 0, lock = false;
    const s = document.createElement('style');
    s.textContent = `:root{--p:#4a148c;--a:#10b981}body{margin:0;background:#e0f2f1;font-family:sans-serif}#app{display:flex;align-items:center;justify-content:center;min-height:100vh}.box{background:var(--p);padding:30px;border-radius:20px;text-align:center;color:#fff;width:280px}.ig{position:relative;margin:20px 0}input{width:100%;padding:12px;border-radius:25px;border:none;text-align:center;box-sizing:border-box}.eye{position:absolute;right:15px;top:50%;transform:translateY(-50%);cursor:pointer;color:var(--p)}.btn{background:var(--a);color:#fff;border:none;padding:12px;border-radius:25px;width:100%;font-weight:700}.grid{display:none;grid-template-columns:repeat(3,1fr);gap:15px;padding:20px}.tile img{width:60px;height:60px;object-fit:contain}`;
    document.head.appendChild(s);
    document.body.innerHTML = `<div id="app"><div class="box"><img src="assets/img/icon-192.png" width="70"><div style="margin:10px 0">بِسْمِ اللّٰهِ</div><div class="ig"><input type="password" id="p" placeholder="ACCESS KEY"><span class="eye" onclick="DREAM.t()">👁️</span></div><button class="btn" onclick="DREAM.v()">VERIFIKASI</button><div id="m" style="font-size:10px;color:#ffeb3b;margin-top:10px"></div></div></div><div id="g" class="grid"></div>`;
    window.DREAM = {
        t:()=> { const p=document.getElementById('p'); p.type=p.type==='password'?'text':'password' },
        v:()=> {
            if(lock) return;
            const p=document.getElementById('p').value, m=document.getElementById('m');
            if(p==='b15m1ll4h_012443410'){ document.getElementById('app').style.display='none'; document.getElementById('g').style.display='grid'; DREAM.r(); }
            else { att++; if(att>=3){ lock=true; m.innerText='TERKUNCI 5 MENIT'; setTimeout(()=>{lock=false;att=0;m.innerText=''},300000) } else m.innerText=`SALAH (${att}/3)`; }
        },
        r:()=> {
            const list=['Gudang','Booking','Security','AI Hub','Settings','Sync','Asset','Report','Network'];
            document.getElementById('g').innerHTML=list.map(l=>`<div class="tile"><img src="assets/img/icon-192.png"><div style="font-size:10px;text-align:center">${l}</div></div>`).join('');
        }
    };
})();
