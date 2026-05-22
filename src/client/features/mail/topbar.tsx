import { Button } from "@/client/components/ui/button";
import { Trash2 } from "lucide-react";

type Props = {
  onClear: () => void;
  connected: boolean;
};

export function TopBar({ onClear, connected }: Props) {
  const webPort = parseInt(window.location.port, 10);
  const smtpPort = webPort ? (webPort - 1000).toString() : "1025";

  return (
    <header className="h-14 border-b border-gray-200 bg-slate-400 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-4xl">👻</span>
        <div>
          <h1 className="text-sm font-semibold text-slate-900 leading-none">
            Mail Buu
          </h1>
          <p className="text-[11px] text-gray-900 mt-0.5">
            Local Dev SMTP Server (Port: #{smtpPort})
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            connected
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <span className={`relative flex h-2 w-2`}>
            {connected && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                connected ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </span>
          {connected ? "Online" : "Offline"}
        </span>

        <Button
          variant="destructive"
          size="sm"
          onClick={onClear}
          className="gap-1.5 text-xs h-8"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Inbox
        </Button>
      </div>
    </header>
  );
}
