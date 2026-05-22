import type { Email } from '@/client/types';
import type { WebSocket } from 'ws';
import type { SMTPServer } from 'smtp-server';

export const state = {
  ws: null as WebSocket | null,
  messages: [] as Email[],
  smtpServer: null as SMTPServer | null,
};
