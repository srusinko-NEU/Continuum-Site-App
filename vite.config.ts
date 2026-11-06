import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function headshotStoragePlugin(): Plugin {
  return {
    name: 'headshot-storage-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-headshot', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const base64Data = data.imageBase64 || data.image;
              if (base64Data && typeof base64Data === 'string') {
                const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                const buffer = matches ? Buffer.from(matches[2], 'base64') : Buffer.from(base64Data, 'base64');

                const publicDir = path.resolve(__dirname, 'public');
                if (!fs.existsSync(publicDir)) {
                  fs.mkdirSync(publicDir, { recursive: true });
                }

                const assetsDir = path.resolve(__dirname, 'src/assets/images');
                if (!fs.existsSync(assetsDir)) {
                  fs.mkdirSync(assetsDir, { recursive: true });
                }

                const publicFile = path.join(publicDir, 'sean_rusinko.jpg');
                const assetsFile = path.join(assetsDir, 'sean_rusinko.jpg');

                fs.writeFileSync(publicFile, buffer);
                fs.writeFileSync(assetsFile, buffer);

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, url: '/sean_rusinko.jpg', timestamp: Date.now() }));
                return;
              }
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'No image data provided' }));
            } catch (err: unknown) {
              const errorMessage = err instanceof Error ? err.message : String(err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: errorMessage }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });

      server.middlewares.use('/api/headshot-status', (req, res) => {
        const publicPath = path.resolve(__dirname, 'public/sean_rusinko.jpg');
        const exists = fs.existsSync(publicPath);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ exists, url: exists ? '/sean_rusinko.jpg' : null }));
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), headshotStoragePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
