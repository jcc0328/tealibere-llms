"use client";

import { Copy } from "lucide-react";
import { useMemo, useState } from "react";

interface ScriptEmbedBoxProps {
  siteId: string;
}

export function ScriptEmbedBox({ siteId }: ScriptEmbedBoxProps) {
  const [copied, setCopied] = useState(false);

  const snippet = useMemo(
    () => `<script defer src="${process.env.NEXT_PUBLIC_APP_URL}/widget.js" data-site-id="${siteId}" data-position="bottom-right"></script>`,
    [siteId],
  );

  const onCopy = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <h3 className="text-lg font-semibold">Script Generator</h3>
      <p className="mt-2 text-sm text-slate-300">Embed this one-line script into your website footer to activate the widget.</p>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs text-blue-200">{snippet}</pre>
      <button onClick={onCopy} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold">
        <Copy size={14} /> {copied ? "Copied!" : "Copy Script"}
      </button>
    </div>
  );
}
