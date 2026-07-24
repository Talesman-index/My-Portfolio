import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://saccadafia.com',
  integrations: [react()],
});
