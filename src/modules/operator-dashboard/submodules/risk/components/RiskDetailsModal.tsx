import Modal from "../../../components/ui/Modal";
import type { RiskApplication } from "../pages/RiskDashboard";
import { reasonCodeMap } from "../constants/reasoneCodeMap";
import Button from "@/modules/operator-dashboard/components/ui/Button";
import { ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
  application: RiskApplication;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  onManualReview: () => void;
  onRequestDocs: (selectedDocs: string[], customDocs: string) => void;
}

export default function RiskDetailsModal({
  application,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onManualReview,
  onRequestDocs,
}: Props) {
  const requestDocsRef = useRef<HTMLDivElement>(null);
  const [requestDocsMode, setRequestDocsMode] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [customDocs, setCustomDocs] = useState("");

  const handleRequestDocsClick = () => {
    setRequestDocsMode(true);
    setTimeout(() => {
      requestDocsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // Mock KYC/AML
  const kycStatus = "Paused";
  const amlStatus = "Clear";
  const documents = [
    { nume: "CI.pdf", url: "#" },
    { nume: "Venituri.pdf", url: "#" },
  ];
  const policyRules = [
    { rule: "Scor minim 600", passed: application.score >= 600 },
    { rule: "AML clearance", passed: amlStatus === "Clear" },
  ];

  const standardDocs = ["CI", "Venituri", "Contract"];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalii aplicație: ${application.id}`}
      titleClassName="text-blue-600"
      width="w-full max-w-3xl"
      icon={<ShieldCheck className="w-6 h-6" />}
      footer={
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            onClick={() => {
              onApprove();
              onClose();
            }}
          >
            Aprobă
          </Button>
          <Button
            onClick={() => {
              onReject();
              onClose();
            }}
          >
            Respinge
          </Button>
          <Button
            onClick={() => {
              onManualReview();
              onClose();
            }}
          >
            Manual Review
          </Button>
          <Button onClick={handleRequestDocsClick}>Cere Documente</Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2">
        {/* Client Info */}
        <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
            Client Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Nume:</strong> {application.client}
            </p>
            <p>
              <strong>Status:</strong> {application.status.replace("_", " ")}
            </p>
            <p>
              <strong>Email:</strong> client@exemplu.com
            </p>
            <p>
              <strong>Telefon:</strong> 0722 123 456
            </p>
            <p className="sm:col-span-2">
              <strong>Adresa:</strong> Str. Exemplu, nr.1, Timișoara
            </p>
          </div>
        </section>

        {/* Financial Info */}
        <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
            Date financiare
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Scor:</strong> {application.score}
            </p>
            <p>
              <strong>Venit:</strong> 5000 RON
            </p>
            <p>
              <strong>Cheltuieli:</strong> 3000 RON
            </p>
            <p>
              <strong>Suma cerută:</strong> 5000 RON
            </p>
          </div>
        </section>

        {/* Reason Codes */}
        {application.reasonCodes?.length > 0 && (
          <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
              Reason Codes
            </h3>
            <ul className="space-y-1 text-gray-500 dark:text-gray-400 text-sm">
              {application.reasonCodes.map((code, idx) => (
                <li key={idx}>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {code}
                  </span>{" "}
                  – {reasonCodeMap[code]}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* KYC / AML */}
        <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
            KYC / AML
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
            <p>
              <strong>KYC Status:</strong> {kycStatus}
            </p>
            <p>
              <strong>AML Status:</strong> {amlStatus}
            </p>
          </div>
        </section>

        {/* Documents */}
        <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
            Documente încărcate
          </h3>
          <ul className="space-y-1 text-blue-600 dark:text-blue-400">
            {documents.map((doc) => (
              <li key={doc.nume}>
                <a href={doc.url} className="underline">
                  {doc.nume}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Policy Rules */}
        <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
            Policy Rules
          </h3>
          <ul className="space-y-1 text-gray-600 dark:text-gray-300">
            {policyRules.map((rule, idx) => (
              <li key={idx}>
                {rule.rule} –{" "}
                <span
                  className={rule.passed ? "text-green-600" : "text-red-500"}
                >
                  {rule.passed ? "Passed ✓" : "Failed ✕"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Request Documents Form */}
        {requestDocsMode && (
          <section
            ref={requestDocsRef}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 shadow-sm mt-4"
          >
            <h3 className="font-semibold mb-3 texr-gray-700 dark:text-gray-200">
              Selecteaza documente de cerut
            </h3>
            <div className="flex  flex-col gap-2 ">
              {standardDocs.map((doc) => (
                <label className="flex items-center text-gray-700 dark:text-gray-300 ">
                  <input
                    type="checkbox"
                    value={doc}
                    checked={selectedDocs.includes(doc)}
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedDocs([...selectedDocs, doc]);
                      else selectedDocs(selectedDocs.filter((d) => d !== doc));
                    }}
                  />
                  {doc}
                </label>
              ))}
            </div>
            <textarea
              placeholder="Alte documente"
              value={customDocs}
              onChange={(e) => setCustomDocs(e.target.value)}
              className="mt-2 w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-100"
            />

            <div className="mt-3 flex justify-end gap-2">
              <Button
                onClick={() => {
                  onRequestDocs(selectedDocs, customDocs);
                  setRequestDocsMode(false);
                  onClose();
                }}
              >
                Trimite cererea
              </Button>
              <Button
                // variant="secundary"
                onClick={() => setRequestDocsMode(false)}
              >
                Renunta
              </Button>
            </div>
          </section>
        )}
      </div>
    </Modal>
  );
}
