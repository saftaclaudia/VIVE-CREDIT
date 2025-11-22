import { Routes, Route, Navigate } from "react-router-dom";
import OnboardingPage from "@/modules/onboarding/pages/OnboardingPage";
import SuccessPage from "@/modules/onboarding/pages/SuccessPage";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import LoanPage from "@/modules/dashboard/pages/LoanPage";
import PaymentsPage from "@/modules/dashboard/pages/PaymentsPage";
import DocumentsPage from "@/modules/dashboard/pages/DocumentsPage";
import { RiskDashboard } from "@modules/operator-dashboard/risk";
import OperatorDashboardLayout from "@/modules/operator-dashboard/layout/OperatorDashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={<div />} />

      {/* Onboarding */}
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/onboarding/success" element={<SuccessPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/loan" element={<LoanPage />} />
      <Route path="/dashboard/payments" element={<PaymentsPage />} />
      <Route path="/dashboard/documents" element={<DocumentsPage />} />

      {/* OPERATOR DASHBOARD SALES/RISK/COLLENTIONS */}
      <Route path="/operator" element={<OperatorDashboardLayout />}>
        {/* <Route path="sales" element={<SalesDashboard />} /> */}
        <Route path="risk" element={<RiskDashboard />} />
        {/* <Route path="collections" element={<Collectionsashboard />} /> */}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
