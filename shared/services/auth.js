import { config } from './config.js';

let currentUser = {
    name: 'Ghost Architect',
    role: 'SUPER_ADMIN',
    access: 'ALL_FLIGHT'
};

export const auth = {
  async login(code) {
    console.log('🔓 AUTH BYPASS: NEURAL OVERRIDE SUCCESS');
    // Kita anggap user-nya selalu Ghost Architect!
    return currentUser;
  },
  logout() {
    console.log('🔒 LOGOUT DISABLED IN BYPASS MODE');
  },
  getUser() {
    return currentUser;
  }
};
