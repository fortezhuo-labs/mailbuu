import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
import { state } from "./state";

export const loadSMTP = function (port: number) {
  const host = "127.0.0.1";
  if (!state.smtpServer) {
      state.smtpServer = new SMTPServer({
      banner: undefined,
      secure: false,
      logger: false,
      disabledCommands: ["STARTTLS"],
      authOptional: true,
      onAuth(auth, session, callback) {
        return callback(null, {
          user: auth.username,
        });
      },
      async onData(stream, session, callback) {
        const mail = await simpleParser(stream);
        state.messages.push(mail); 
        state.ws?.send(JSON.stringify(mail));
        return callback();
      },
    });

    state.smtpServer.on("error", (err) => {
      console.error("SMTP Server error:", err);
    });

    state.smtpServer.listen(+port, host, () => {
      console.log(` ⚡ SMTP Port  : ${port}`);
    });
  }
};
