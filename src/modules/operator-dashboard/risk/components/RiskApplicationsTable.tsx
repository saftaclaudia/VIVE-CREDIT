import { reasonCodeMap } from "../constants/reasoneCodeMap";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface Props {
  applications: any[];
  filters: { status: string; search: string };
  onSelect: (add: any) => void;
}

export default function RiskApplicationsTable({
  applications,
  filters,
  onSelect,
}: Props) {
  const filtered = applications.filter((app) => {
    const matchesStatus = !filters.status || app.status === filters.status;
    const matchesSearch =
      !filters.search ||
      app.client.toLowerCase().includes(filters.search.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      case "manual_review":
        return "text-yellow-600 bg-yellow-100";
      case "pending":
      default:
        return "text-blue-600 bg-blue-100";
    }
  };

  return (
    <div className="mt-4 bg-white border brorde-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* TABLE HEADER */}
      <div className="grid grid-cols-5 px-4 py-4 bg-gray-50  font-semibold text-gray-700">
        <div>ID Aplicatie</div>
        <div>Client</div>
        <div>Status</div>
        <div>Scor</div>
        <div>Reason Codes</div>
      </div>
      {/* NO RESULTS */}
      {filtered.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          Nicio aplicatie gasita
        </div>
      )}
      {/* TABLE ROWS */}
      {filtered.map((app) => (
        <div
          key={app.id}
          onClick={() => onSelect(app)}
          className="grid grid-cols-5 px-6 py-4 border-t border-gray-100 hover:bg-blue-50 cursor-pointer transition"
        >
          <div>{app.id}</div>
          <div>{app.client}</div>
          <div>
            <span
              className={`px-2 py-1 text-xs rounded-lg ${getStatusColor(
                app.status
              )}`}
            >
              {app.status.replace("_", " ")}
            </span>
          </div>
          <div className="font-semibold">{app.score}</div>

          {/* REASON CODE */}
          <div>
            {app.reasonCodes?.length > 0 ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-blue-600 underline cursor-help">
                      {app.reasonCodes[0]}
                      {app.reasonCodes.length > 1 && " + more"}
                    </span>
                  </TooltipTrigger>

                  <TooltipContent className="max-w-xs p-3 text-sm bg-white shadow-lg border rounded-md ">
                    <div>Reason Codes:</div>
                    {app.reasonCodes.map((code, index) => (
                      <div key={index} className="mb-1 text-gray-500">
                        <strong>{code}</strong> - {reasonCodeMap[code]}
                      </div>
                    ))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <span className="text-blue-600">-</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
