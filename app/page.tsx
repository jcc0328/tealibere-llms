import { DemoWidget } from "@/components/landing/demo-widget";
import { Check, ShieldCheck } from "lucide-react";

const plans = [
  "One-line script embed",
  "Unlimited opt-out requests",
  "Stripe Tax automatic calculation",
  "24/7 audit log retention",
  "Dashboard + policy wizard",
];

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:pt-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">PrivacyWidget.io</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            在5分钟内搞定加州 ADMT 隐私合规
          </h1>
          <p className="mt-5 text-lg text-slate-300">
            Avoid California privacy penalties up to <span className="font-semibold text-white">$7,500 per consumer</span>.
            Deploy a compliant opt-out workflow with no coding required.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold hover:bg-blue-500">Start 7-Day Trial</button>
            <button className="rounded-lg border border-slate-500 px-6 py-3 text-base font-semibold">View Dashboard Demo</button>
          </div>
          <p className="mt-4 text-sm text-slate-400">Mobile-first: CTA remains visible in first screen on phones.</p>
        </div>
        <DemoWidget />
      </section>

      <section className="mt-16 grid gap-6 rounded-2xl border border-red-900/60 bg-red-950/20 p-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold">不合规的真实风险</h2>
          <p className="mt-3 text-slate-200">
            California enforcement may trigger fines between <strong>$2,500 - $7,500</strong> per affected consumer.
            PrivacyWidget provides a documented, auditable opt-out system to reduce regulatory exposure.
          </p>
        </div>
        <div className="flex items-center justify-center rounded-xl border border-red-800 bg-red-950/30 p-6 text-center text-xl font-semibold text-red-200">
          $2,500 - $7,500 / Consumer
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">Simple Pricing</h2>
        <div className="mt-6 max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Compliance Starter</h3>
            <ShieldCheck className="text-blue-300" />
          </div>
          <p className="mt-2 text-slate-300">Built for SMBs that need immediate ADMT compliance coverage.</p>
          <p className="mt-4 text-4xl font-bold">$19<span className="text-lg text-slate-400">/month</span></p>
          <p className="text-slate-400">or $199 yearly</p>
          <ul className="mt-5 space-y-2 text-sm text-slate-200">
            {plans.map((plan) => (
              <li key={plan} className="flex items-center gap-2">
                <Check size={16} className="text-blue-300" />
                {plan}
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-500">Go to Stripe Checkout</button>
        </div>
      </section>
    </main>
  );
}
