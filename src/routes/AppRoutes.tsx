import { AuditDashboard } from "@/modules/admin-audit/AuditDashboard";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import DocumentsPage from "@/modules/dashboard/pages/DocumentsPage";
import LoanPage from "@/modules/dashboard/pages/LoanPage";
import PaymentsPage from "@/modules/dashboard/pages/PaymentsPage";
import OnboardingPage from "@/modules/onboarding/pages/OnboardingPage";
import SuccessPage from "@/modules/onboarding/pages/SuccessPage";
import OperatorDashboardLayout from "@/modules/operator-dashboard/layout/OperatorDashboardLayout";
import OperatorDashboardPage from "@/modules/operator-dashboard/pages/OperatorDasboardPage";
import RiskPage from "@/modules/operator-dashboard/pages/RiskPage";
import LoanForm from "@/pages/loan/LoanForm";
// import PolicyEnginePage from "@/modules/policy-engine/PolicyEnginePage";
import { Route, Routes } from "react-router-dom";

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
      <Route path="/loan-form" element={<LoanForm />} />

      {/* OPERATOR DASHBOARD SALES/RISK/COLLECTIONS */}
      <Route path="/operator" element={<OperatorDashboardLayout />}>
        <Route index element={<OperatorDashboardPage />} />
        <Route path="risk" element={<RiskPage />} />
        {/* <Route path="sales" element={<SalesPage />} /> */}
        {/* <Route path="collection" element={<CollectionPage />} /> */}
      </Route>

      {/* Policy Engine */}
      {/* <Route path='/policy-engine' element={<PolicyEnginePage />} /> */}

      {/* Audit Dashboard */}
      <Route path="/audit" element={<AuditDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
