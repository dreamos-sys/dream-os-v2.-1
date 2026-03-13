/**
 * js/kernel/antibody.js
 * Immunity System - Ghost Architect Only
 */
class DreamImmunity {
    constructor() {
        this.threatVault = [];
        this.isShadowMode = false;
        this.initBypass();
    }

    // Ghost Bypass Independen (Tanpa tergantung UI)
    initBypass() {
        let taps = 0, tapTimer;
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.shell-header')) return;
            taps++;
            window.DREAM_SYS?.haptic(30);
            clearTimeout(tapTimer);
            if (taps === 5) {
                const pwd = prompt('👻 Ghost Recovery Access:');
                if (pwd === 'dreamos2026') this.launchAnalysis();
                taps = 0;
            }
            tapTimer = setTimeout(() => taps = 0, 1500);
        });
    }

    absorbThreat(error) {
        this.threatVault.push({ time: new Date(), detail: error });
        this.isShadowMode = true;
        window.DREAM_SYS?.log('warn', 'Virus absorbed. Shadow Mode Active.');
    }

    launchAnalysis() {
        alert("Bismillah, Analysis Mode Active.\nAntibody Count: " + this.threatVault.length);
    }
}
const GhostAntibody = new DreamImmunity();
