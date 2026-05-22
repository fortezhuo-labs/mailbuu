import { Input } from "@/client/components/ui/input";
import { ListItem } from "./list-item";
import { Search } from "lucide-react";
import { useState } from "react";
import type { Email } from "@/client/types";

type Props = {
  emails: Email[];
  selectedId: string | null;
  onSelect: (email: Email) => void;
};

export function Sidebar({ emails, selectedId, onSelect }: Props) {
  const [query, setQuery] = useState("");

  const filtered = emails.filter((e) => {
    const to = Array.isArray(e.to)
      ? e.to.map((t) => (typeof t === "string" ? t : t.text))
      : [e.to?.text || ""];
    return (
      e?.subject?.toLowerCase().includes(query.toLowerCase()) ||
      e?.from?.text?.toLowerCase().includes(query.toLowerCase()) ||
      to.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
    );
  });

  return (
    <div className="flex flex-col h-full border-r border-gray-200 bg-white">
      <div className="px-3 py-3 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
          <Input
            placeholder="Search ..."
            className="pl-8 text-xs h-8 bg-gray-50 border-gray-200 focus-visible:ring-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter info */}
      <div className="px-4 py-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Filtered:{" "}
          <span className="font-medium text-gray-600">
            {filtered.length} of {emails.length} email
          </span>
        </span>
      </div>

      {/* Email list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-xs text-gray-400">
            {query ? `No Mail found matching "${query}"` : "No Mail found"}
          </div>
        ) : (
          filtered.map((email) => (
            <ListItem
              key={email.messageId}
              email={email}
              selected={selectedId === email.messageId}
              onClick={() => onSelect(email)}
            />
          ))
        )}
      </div>
    </div>
  );
}
