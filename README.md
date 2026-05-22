# 👻 mailbuu

A local SMTP server for development & testing — catch outgoing emails without sending them for real.

## Features

- 📬 Catches all outgoing SMTP emails locally
- ⚡ Real-time inbox via WebSocket — no refresh needed
- 🔍 Search by subject, sender, or recipient
- 🗑️ Clear inbox with one click
- 🔔 Audio notification on new email
- 👁️ HTML preview, and json view

## Install

```bash
bun install -g @fortezhuo/mailbuu
```

## Usage

```bash
# run with default ports (SMTP: 1025, Web: 2025)
mailbuu

# custom SMTP port
mailbuu --port=2525
```

Then open [http://localhost:2025](http://localhost:2025) in your browser.

## Port Convention

| Service | Default Port |
|---------|-------------|
| SMTP    | 1025        |
| Web UI  | SMTP + 1000 |

So if SMTP is `1025`, Web UI is at `2025`. If SMTP is `2525`, Web UI is at `3525`.

## Configure your app

Point your app's SMTP settings to mailbuu:

```
host: 127.0.0.1
port: 1025
secure: false
auth: (any username/password works)
```

### Node.js (nodemailer)

```javascript
const transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 1025,
  secure: false,
});
```

### Laravel

```dotenv
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_ENCRYPTION=null
```

### Django

```python
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "127.0.0.1"
EMAIL_PORT = 1025
```

## Development

```bash
git clone https://github.com/fortezhuo/mailbuu
cd mailbuu
bun install
bun dev
```

## Stack

- [Bun](https://bun.sh) — runtime, bundler, HTTP server
- [React 19](https://react.dev) — UI
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [shadcn/ui](https://ui.shadcn.com) — components
- [smtp-server](https://nodemailer.com/extras/smtp-server/) — SMTP
- [mailparser](https://nodemailer.com/extras/mailparser/) — email parsing

## License

MIT