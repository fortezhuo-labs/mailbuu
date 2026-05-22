import type { Email } from "@/client/types";
import type { ServerWebSocket } from "bun";
import type { SMTPServer } from "smtp-server";

export const state = {
  ws: null as ServerWebSocket<undefined> | null,
  messages: [] as Email[],
  smtpServer: null as SMTPServer | null
}