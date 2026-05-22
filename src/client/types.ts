import type { ParsedMail } from "mailparser";

export type Tab = "html" | "plain" | "raw";
export type Email = ParsedMail & {
  read?: boolean;
}