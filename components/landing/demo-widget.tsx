"use client";

import { Shield, X } from "lucide-react";
import { useState } from "react";

export function DemoWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
      <p className="text-xs uppercase tracking-widest text-blue-300">Live Demo</p>
      <h3 className="mt-2 text-xl font-semibold">Consumer Opt-Out Flow</h3>
      <p className="mt-2 text-sm text-slate-300">
        Experience exactly what your website visitors will see before embedding the widget.
      </p>

      <button
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
        onClick={() => setOpen(true)}
      >
        <Shield size={16} />
        Open Privacy Options
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950 p-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Opt-Out of ADMT</h4>
              <button onClick={() => setOpen(false)}>
                <X className="text-slate-300" size={18} />
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Submit your email and we will record your request under CCPA/ADMT rights.
            </p>
            <input
              className="mt-4 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm"
              placeholder="consumer@email.com"
            />
            <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold">Submit Opt-Out Request</button>
          </div>
        </div>
      )}
    </div>
  );
}
