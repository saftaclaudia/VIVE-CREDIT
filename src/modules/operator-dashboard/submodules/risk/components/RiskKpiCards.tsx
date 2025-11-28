import UiCard from "../../../components/ui/UiCard";

import {
  CheckCircle,
  XCircle,
  Hourglass,
  AlertTriangle,
  Clock,
} from "lucide-react";
import type { RiskApplication } from "../pages/RiskDashboard";

interface Props {
  applications: RiskApplication[];
}

export default function RiskKpiCards({ applications }: Props) {
  const total = applications.length;
  const approved = applications.filter(
    (app) => app.status === "approved"
  ).length;
  const rejected = applications.filter(
    (app) => app.status === "rejected"
  ).length;
  const pending = applications.filter((app) => app.status === "pending").length;
  const manual = applications.filter(
    (app) => app.status === "manual_review"
  ).length;

  const cards = [
    { label: "Total aplicatii", value: total, icon: AlertTriangle },
    { label: "Aprobate", value: approved, icon: CheckCircle },
    { label: "Respinse ", value: rejected, icon: XCircle },
    { label: "In asteptare ", value: pending, icon: Clock },
    { label: "Manual review", value: manual, icon: Hourglass },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <UiCard
            key={index}
            icon={<Icon size={28} />}
            label={card.label}
            value={card.value}
          />
        );
      })}
    </div>
  );
}
