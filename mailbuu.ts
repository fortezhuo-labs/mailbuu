#!/usr/bin/env bun

const args = process.argv.slice(2);
const portArg = args.find(a => a.startsWith("--port="));
if (portArg) {
  process.env.BUN_PUBLIC_SMTP_PORT = portArg.split("=")[1];
}
process.env.NODE_ENV = "production";

await import("./src/server/index.ts");