import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { createNodeWebSocket } from '@hono/node-ws';
import { state } from './state';
import { getTitle } from './lib';
import { loadSMTP } from './smtp';
import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;
const isDev = process.env.NODE_ENV !== 'production';
const smtpPort = +(process.env.SMTP_PORT ?? process.env.BUN_PUBLIC_SMTP_PORT ?? 1025);
const port = smtpPort + 1000;

loadSMTP(smtpPort);

const app = new Hono();

const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app });

app.get(
  '/ws',
  upgradeWebSocket(() => ({
    onOpen(_evt, ws) {
      if (state.ws && state.ws.readyState === state.ws.OPEN) {
        state.ws.close();
      }
      //@ts-expect-error ignore
      state.ws = ws.raw;
      console.log(' WebSocket connection opened');
      for (const msg of state.messages) {
        ws.send(JSON.stringify(msg));
      }
      ws.send(JSON.stringify({ type: 'ready' }));
    },
    onMessage(evt, _ws) {
      const clientMsg = JSON.parse(String(evt.data));
      if (clientMsg.type === 'clear') {
        if (state.ws && state.ws.readyState === state.ws.OPEN) {
          state.ws.send(JSON.stringify({ type: 'clear' }));
        }
        state.messages = [];
        console.log(' WebSocket messages cleared by client');
      }
    },
    onClose(_evt, _ws) {
      console.log(' WebSocket closed');
    },
  }))
);

if (!isDev) {

  app.use(
    '/*',
    serveStatic({
      root: path.join(__dirname, '../../dist/client'),
      rewriteRequestPath: (path) => path,
      onNotFound: (_path, _c) => {
        // fallthrough to SPA fallback below
      },
    })
  );

  app.get('*', serveStatic({ path: path.join(__dirname, '../../dist/client/index.html') }));
}

const server = serve({ fetch: app.fetch, port });
injectWebSocket(server);

console.log(getTitle());
console.log(` 🚀 Web Server : ${isDev ? 'http://localhost:5173' : `http://localhost:${port}`}`);
