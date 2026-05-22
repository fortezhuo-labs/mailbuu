# 👻 mailbuu

A modern local SMTP server for development and testing.

Catch outgoing emails locally without sending them to real recipients, complete with a real-time web inbox powered by WebSocket.

---

## Features

* 📬 Catch all outgoing SMTP emails locally
* ⚡ Real-time inbox updates via WebSocket
* 🔍 Search emails by subject, sender, or recipient
* 🗑️ Clear inbox instantly
* 🔔 Audio notification for new emails
* 👁️ HTML preview and raw JSON viewer
* 🧩 Simple CLI usage
* 🚀 Built with Node.js, Hono, React, and WebSocket

---

## Installation

```bash
npm install -g @fortezhuo/mailbuu
```

---

## Usage

### Start with default ports

```bash
mailbuu
```

Default ports:

| Service | Port |
| ------- | ---- |
| SMTP    | 1025 |
| Web UI  | 2025 |

---

### Custom SMTP port

```bash
mailbuu --port=2525
```

If SMTP runs on `2525`, the Web UI will run on `3525`.

---

## Open Web UI

Open this in your browser:

```txt
http://localhost:2025
```

Or:

```txt
http://localhost:<smtp_port + 1000>
```

---

## Configure Your Application

Point your application's SMTP configuration to mailbuu.

### SMTP Configuration

```txt
host: 127.0.0.1
port: 1025
secure: false
auth: any username/password
```

---

## Example Integrations

### Node.js (Nodemailer)

```js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 1025,
  secure: false,
});
```
---

## License

ISC
