import { createClient } from '@supabase/supabase-js';
global.window = global;
global.DREAM = { config: { supabase: { url: 'https://lfavawkzvdhdpaaplaiq.supabase.co', key: 'Sb_publishable_eypFyNZdOMvnVllzRR28UQ_BArGPZDl' } } };
const config = global.DREAM.config.supabase;
createClient(config.url, config.key);
console.log('Bridge: Connected');
process.exit(0);
