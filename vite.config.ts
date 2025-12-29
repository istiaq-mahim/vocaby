
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Prioritize the shell process env, then the .env file.
      // Stringify to ensure it's a valid JS literal.
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || env.API_KEY || env.VITE_API_KEY || "")
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: './index.html',
        },
      },
    },
  };
});
