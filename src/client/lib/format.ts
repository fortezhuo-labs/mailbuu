import type { AddressObject, ParsedMail } from "mailparser";

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false // Pakai format 24 jam
});

export const formatAddress = function (address?: AddressObject | AddressObject[]) {
  return Array.isArray(address) ? address.map(value => value.text).join(", ") : address?.text || "-"
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }  

  const parts = dateFormatter.formatToParts(date);
  
  const getValue = (type: string) => parts.find(p => p.type === type)?.value || '';

  const day = getValue('day');
  const month = getValue('month').replace('.', ''); // Menghilangkan titik di singkatan bulan (misal: Mei.)
  const year = getValue('year');
  const hour = getValue('hour');
  const minute = getValue('minute');
  const second = getValue('second');

  return `${day} ${month} ${year} ${hour}:${minute}:${second}`;
}

export const formatHeader = function (parsed: ParsedMail) {
  const from = parsed.from?.text
  const to = formatAddress(parsed.to)
  const replyTo = formatAddress(parsed.replyTo)
  const cc = formatAddress(parsed.cc)
  const bcc = formatAddress(parsed.bcc)
  const date = parsed.date?.toLocaleString()
  const id = parsed.messageId
  const subject = parsed.subject

  return `${id}

From     : ${from}
To       : ${to}
Reply To : ${replyTo}
CC       : ${cc}
BCC      : ${bcc}
Date     : ${date}

Subject  : ${subject}
`
}

export const formatRaw = function (parsed: ParsedMail) {
  return `${parsed.html}
`
}

