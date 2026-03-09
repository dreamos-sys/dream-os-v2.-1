// ===== shared/services/index.js =====
import { config, sha256 } from './config.js';
import { auth } from './auth.js';
import { toast } from './toast.js';

export const services = {
  config,
  crypto: { sha256 },
  auth,
  toast
};

export async function initServices() {
  console.log('[Services] Initialized');
  // Bisa tambah inisialisasi lain (misal cek session)
}
