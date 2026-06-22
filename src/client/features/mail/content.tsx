import type { Tab, Email } from '@/client/types';
import { formatAddress, formatDate } from '@/client/lib/format';
import { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/client/components/ui/tabs';

type Props = {
  email: Email;
};

export function Content({ email }: Props) {
  const [tab, setTab] = useState<Tab>('html');

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-900 mb-3 leading-snug">
          {email.subject}
        </h2>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-400 w-16 shrink-0">From</span>
              <span className="font-medium text-gray-800">
                {email.from?.text}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-400 w-16 shrink-0">To</span>
              <span>{formatAddress(email.to)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-400 w-16 shrink-0">Reply To</span>
              <span>{formatAddress(email.replyTo)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-400 w-16 shrink-0">CC</span>
              <span>{formatAddress(email.cc)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-400 w-16 shrink-0">BCC</span>
              <span>{formatAddress(email.bcc)}</span>
            </div>
          </div>
          <span className="text-sm text-gray-400 shrink-0">
            {formatDate(String(email.date))}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={tab}
        onValueChange={v => setTab(v as Tab)}
        className="flex flex-col flex-1 min-h-0"
      >
        <div className="px-6 border-b border-gray-200">
          <TabsList className="h-10 bg-transparent p-0 gap-0">
            <TabsTrigger
              value="html"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-500 data-[state=active]:text-gray-600 data-[state=active]:bg-transparent text-sm px-4"
            >
              Display HTML
            </TabsTrigger>
            <TabsTrigger
              value="json"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-500 data-[state=active]:text-gray-600 data-[state=active]:bg-transparent text-sm px-4"
            >
              JSON
            </TabsTrigger>
          </TabsList>
        </div>

        {/* HTML Preview */}
        <TabsContent
          value="html"
          className="flex-1 overflow-y-auto m-0 px-6 py-5"
        >
          <span
            dangerouslySetInnerHTML={{
              __html:
                typeof email.html === 'string'
                  ? email.html
                  : email.textAsHtml || '',
            }}
          />
        </TabsContent>
        <TabsContent
          value="json"
          className="flex-1 overflow-y-auto m-0 px-6 py-5"
        >
          <pre className="text-xs text-gray-600 font-mono whitespace-pre-wrap bg-gray-50 rounded-md p-4 leading-relaxed">
            {JSON.stringify(email, null, 2)}
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
}
