import { serve } from 'bun';
import { state } from './state';
import { getTitle } from './lib';
import { loadSMTP } from './smtp';
import { join } from 'path';
import { statSync } from 'fs';

const isDev = process.env.NODE_ENV !== 'production';
const smtpPort = +process?.env?.BUN_PUBLIC_SMTP_PORT! || 1025;
const port = smtpPort + 1000;

loadSMTP(smtpPort);
const server = serve({
  port,
  async fetch(req, server) {
    const url = new URL(req.url);

    if (url.pathname === '/ws') {
      const upgraded = server.upgrade(req);
      if (!upgraded) {
        return new Response('WebSocket upgrade failed', { status: 400 });
      }
      return;
    }

    const distPath = join(import.meta.dir, '../../dist');
    try {
      let filePath = join(
        distPath,
        url.pathname === '/' ? 'index.html' : url.pathname
      );
      let stat = statSync(filePath);
      if (stat.isDirectory()) {
        filePath = join(filePath, 'index.html');
      }

      return new Response(Bun.file(filePath));
    } catch (e) {
      try {
        return new Response(Bun.file(join(distPath, 'index.html')));
      } catch (err) {
        return new Response(
          'Frontend belum di-build. Jalankan `bun run build` terlebih dahulu.',
          { status: 404 }
        );
      }
    }
  },
  websocket: {
    async open(ws) {
      if (state.ws && state.ws.readyState === WebSocket.OPEN) {
        state.ws.close();
      }
      state.ws = ws;
      console.log(`WebSocket connection opened`);
      for (const msg of state.messages) {
        ws.send(JSON.stringify(msg));
      }
      ws.send(JSON.stringify({ type: 'ready' }));
    },
    async message(ws, message) {
      const clientMsg = JSON.parse(String(message));
      if (clientMsg.type === 'clear') {
        state.ws?.send(JSON.stringify({ type: 'clear' }));
        state.messages = [];
        console.log(`Messages cleared by client`);
      }
    },
    async close(ws, code, reason) {
      console.log(`WebSocket closed: ${code} - ${reason}`);
    },
  },

  development: process.env.NODE_ENV !== 'production' && {
    hmr: true,
    console: true,
  },
});

console.log(getTitle());
console.log(` 🚀 Web Server : ${isDev ? 'http://localhost:5173' : server.url}`);
