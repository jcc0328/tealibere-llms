interface RequestRow {
  id: string;
  consumer_email: string;
  request_type: string;
  ip_address: string | null;
  created_at: string;
  status: "pending" | "archived";
}

export function RequestManager({ rows }: { rows: RequestRow[] }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <h3 className="text-lg font-semibold">Request Ledger</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-400">
            <tr>
              <th className="py-2">Email</th>
              <th className="py-2">Time</th>
              <th className="py-2">IP</th>
              <th className="py-2">Type</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-800">
                <td className="py-2">{row.consumer_email}</td>
                <td className="py-2">{new Date(row.created_at).toLocaleString()}</td>
                <td className="py-2">{row.ip_address ?? "N/A"}</td>
                <td className="py-2">{row.request_type}</td>
                <td className="py-2">
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-xs">{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
