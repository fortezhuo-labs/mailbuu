import type { Email } from "@/client/types";
import { cn } from "@/client/lib/utils";
import { formatDate } from "@/client/lib/format";
 
type Props = {
  email: Email;
  selected: boolean;
  onClick: () => void;
};
 
export function ListItem({ email, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3 border-b border-gray-100 transition-colors hover:bg-gray-50 focus:outline-none",
        selected && "bg-blue-50 border-l-2 border-l-blue-500",
        !email.read && "bg-white"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className={cn("text-sm truncate max-w-40", !email.read ? "font-semibold text-gray-900" : "font-medium text-gray-600")}>
          {email.from?.text || "Unknown Sender"}
        </span>
        <span className="text-xs text-gray-400 shrink-0">{formatDate(String(email.date))}</span>
      </div>
 
      <div className="flex items-center gap-1 mb-1">
        {!email.read && (
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-0.5" />
        )}
        <p className={cn("text-xs truncate", !email.read ? "font-semibold text-gray-800" : "text-gray-600")}>
          {email.subject}
        </p>
      </div>
    </button>
  );
}