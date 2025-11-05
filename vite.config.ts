import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        allowedHosts: ['unif-conversation.onrender.com'] // Ajoute ici le domaine Render
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.AIzaSyDc1FJ9-tFrk8d9lHe9zMcifKE47xP5oG8),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.AIzaSyDc1FJ9-tFrk8d9lHe9zMcifKE47xP5oG8)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
