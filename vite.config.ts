
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement
  // Fix: Cast process to any to access cwd() method which may be missing in some type definitions
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [
      react(),
      // Plugin essentiel pour GitHub Pages : Crée le fichier .nojekyll
      {
        name: 'create-nojekyll',
        closeBundle() {
          try {
            writeFileSync('dist/.nojekyll', '');
            console.log('✨ Fichier .nojekyll créé pour GitHub Pages');
          } catch (error) {
            console.error('Erreur création .nojekyll:', error);
          }
        }
      }
    ],
    // IMPORTANT : Le nom exact de votre dépôt GitHub entre les slashes
    base: '/fc.github.io/', 
    
    define: {
      // Injection sécurisée de la clé API
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || ""),
      'process.env.NODE_ENV': JSON.stringify(mode)
    },
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      // Optimisation pour réduire la taille des fichiers JS/CSS
      minify: 'esbuild',
    },
    resolve: {
      alias: {
        // Fix: Use path.resolve with a relative path which defaults to process.cwd() to avoid __dirname missing in ESM
        '@': path.resolve('./src'),
      },
    },
  };
});
