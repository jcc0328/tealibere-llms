export default function SettingsPage() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-2xl font-semibold">Billing & Subscription</h2>
      <p className="mt-2 text-slate-300">Use Stripe Customer Portal to self-manage invoices, cancellations, and plan updates.</p>
      <form action="/api/stripe/portal" method="post">
        <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-semibold">Manage Subscription</button>
      </form>
    </div>
  );
}
