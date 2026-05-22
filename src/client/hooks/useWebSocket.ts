import type { Email } from "@/client/types";

import { useState, useEffect, useRef } from "react";
import { playNotificationSound } from "../lib/notification";

export function useWebSocket(url: string) {
  const [messages, setMessages] = useState<Email[]>([]);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "ready") {
        isFirstLoad.current = false;
      } else if (data.type === "clear") {
        setMessages([]);
      } else {
        if (!isFirstLoad.current) playNotificationSound();
        setMessages((prev) => [{ ...data, read: false }, ...prev]);
      }
    };

    return () => {
      if (ws.readyState === WebSocket.CONNECTING) {
        ws.onopen = () => ws.close();
      } else {
        ws.close();
      }
    }
  }, [url]);

  const send = (msg: object) => {
    wsRef.current?.send(JSON.stringify(msg));
  };

  return { messages, connected, setMessages, send };
}
