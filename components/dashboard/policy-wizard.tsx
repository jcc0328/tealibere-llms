"use client";

import { useMemo, useState } from "react";

const decisionUseCases = ["招聘", "信贷", "住房", "其他"];

export function PolicyWizard() {
  const [company, setCompany] = useState("");
  const [useCase, setUseCase] = useState(decisionUseCases[0]);

  const policyText = useMemo(() => {
    if (!company) return "Fill the form to generate your ADMT policy clause.";
    return `${company} may use automated decision-making technologies for ${useCase} related workflows. Under CCPA/ADMT rights, California consumers can opt out of certain automated profiling decisions by submitting a verifiable request through our Privacy Options widget. We will process and log each request within required statutory timelines.`;
  }, [company, useCase]);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <h3 className="text-lg font-semibold">Policy Wizard</h3>
      <div className="mt-4 space-y-3">
        <label className="block text-sm">
          Step 1: 公司名称
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            placeholder="Acme Inc"
          />
        </label>
        <label className="block text-sm">
          Step 2: AI 决策用途
          <select value={useCase} onChange={(e) => setUseCase(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2">
            {decisionUseCases.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <textarea readOnly value={policyText} className="mt-4 h-40 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-200" />
    </div>
  );
}
