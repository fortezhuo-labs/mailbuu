import { useState } from "react";
import type { Email } from "@/client/types";
import { TopBar } from "./topbar";
import { Sidebar } from "./sidebar";
import { Content } from "./content";
import { Mail } from "lucide-react";
import { useWebSocket } from "@/client/hooks/useWebSocket";

export function Inbox() {
  const { messages, setMessages, send, connected } = useWebSocket(`ws://${window.location.host}/ws`);
  const [selected, setSelected] = useState<Email | null>(messages[0] ?? null);

  const handleSelect = (email: Email) => {
    setSelected(email);
    setMessages((prev) =>
      prev.map((e) =>
        e.messageId === email.messageId ? { ...e, read: true } : e,
      ),
    );
  };

  const handleClear = () => {
    setMessages([]);
    setSelected(null);
    send({ type: "clear" });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      <TopBar onClear={handleClear} connected={connected} />

      <div className="flex flex-1 min-h-0">
        {/* Left panel */}
        <div className="w-72 shrink-0 flex flex-col min-h-0">
          <Sidebar
            emails={messages}
            selectedId={selected?.messageId ?? null}
            onSelect={handleSelect}
          />
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-white min-h-0 overflow-hidden">
          {selected ? (
            <Content email={selected} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-3">
              <Mail className="w-12 h-12" />
              <p className="text-sm">No mail selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
