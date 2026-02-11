import { PolicyWizard } from "@/components/dashboard/policy-wizard";
import { RequestManager } from "@/components/dashboard/request-manager";
import { ScriptEmbedBox } from "@/components/dashboard/script-embed-box";

const mockRows = [
  {
    id: "1",
    consumer_email: "consumer@example.com",
    request_type: "opt_out_admt",
    ip_address: "104.23.9.8",
    created_at: new Date().toISOString(),
    status: "pending" as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Compliance Dashboard</h2>
      <ScriptEmbedBox siteId="00000000-0000-0000-0000-000000000001" />
      <PolicyWizard />
      <RequestManager rows={mockRows} />
    </div>
  );
}
