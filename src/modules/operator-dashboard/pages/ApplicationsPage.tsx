import { useLocation } from "react-router-dom";
import { useState } from "react";
import { mockDB } from "../data/mockDB";
import ApplicationTable from "../components/ui/ApplicationTable";
import Modal from "../components/ui/Modal";

import toast from "react-hot-toast";
import type { RiskApplication } from "../submodules/risk/types";

type Mode = "view" | "edit" | null;

const STATUS_OPTIONS: RiskApplication["status"][] = [
  "pending",
  "approved",
  "rejected",
  "manual_review",
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<RiskApplication[]>(
    mockDB.riskApplications
  );
  const [selected, setSelected] = useState<RiskApplication | null>(null);
  const [mode, setMode] = useState<Mode>(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const statusQuery = params.get("status") || "all";

  /* ---------------- FILTER ---------------- */
  const filteredApplications =
    statusQuery === "all"
      ? applications
      : applications.filter((a) => {
          if (statusQuery === "pending") {
            return a.status === "pending" || a.status === "manual_review";
          }
          return a.status === statusQuery;
        });

  /* ---------------- TITLE ---------------- */
  const titleMap: Record<string, string> = {
    all: "Toate aplicațiile",
    approved: "Aplicațiile aprobate",
    rejected: "Aplicațiile respinse",
    pending: "Aplicațiile în așteptare",
    manual_review: "Aplicațiile în analiză",
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = () => {
    if (!selected) return;

    setApplications((prev) =>
      prev.map((app) =>
        app.id === selected.id
          ? {
              ...app,
              ...selected,
            }
          : app
      )
    );

    setMode(null);
    setSelected(null);

    // SHOW TOAST
    toast.success("Modificările au fost salvate cu succes!");
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div className="w-full max-w-7xl mx-auto p-6 flex flex-col gap-6">
      {/* TITLE */}
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {titleMap[statusQuery] ?? "Aplicații"}
      </h1>

      {/* TABLE */}
      <ApplicationTable<RiskApplication>
        data={filteredApplications}
        pageSize={10}
        selectedRow={selected}
        getRowId={(app) => app.id}
        onRowClick={(app) => {
          setSelected(app);
          setMode("view");
        }}
        columns={[
          { key: "id", label: "ID", width: "150px" },
          { key: "client", label: "Client", width: "250px" },
          {
            key: "income",
            label: "Venit",
            width: "150px",
            align: "left",
            render: (app) =>
              app.income ? `${app.income.amount.toLocaleString()} RON` : "-",
          },

          {
            key: "creditAmount",
            label: "Suma credit",
            width: "150px",
            align: "left",
            render: (app) => `${app.creditAmount.toLocaleString()} RON`,
          },

          { key: "status", label: "Status", width: "160px", align: "left" },
          {
            key: "actions",
            label: "Actions",
            width: "120px",
            align: "center",
            render: (app) => (
              <div className="flex gap-4 flex-start">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(app);
                    setMode("view");
                  }}
                  className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(app);
                    setMode("edit");
                  }}
                  className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            ),
          },
        ]}
      />

      {/* VIEW MODAL */}
      <Modal
        isOpen={mode === "view"}
        onClose={() => {
          setMode(null);
          setSelected(null);
        }}
        title="Application details"
      >
        {selected && (
          <div className="space-y-6 text-sm text-gray-700 dark:text-gray-200">
            {/* ID, Client, Status, Score */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="font-medium">ID</span>
                <p className="text-gray-600 dark:text-gray-400">
                  {selected.id}
                </p>
              </div>
              <div>
                <span className="font-medium">Client</span>
                <p> {selected.client}</p>
              </div>
              <div>
                <span className="font-medium">Status</span>
                <p
                  className={`font-semibold ${
                    selected.status === "approved"
                      ? "text-green-600"
                      : selected.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {selected.status}
                </p>
              </div>
              <div>
                <span className="font-medium">Scor</span>
                <p>{selected.score}</p>
              </div>
            </div>

            {/* Credit */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Credit</h3>
              <p>
                <span className="font-medium">Suma solicitată:</span>{" "}
                {selected.creditAmount.toLocaleString()} RON
              </p>
            </div>

            {/* Income */}
            {selected.income && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Venit</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <p>
                    <span className="font-medium">Valoare:</span>{" "}
                    {selected.income.amount.toLocaleString()} RON
                  </p>
                  <p>
                    <span className="font-medium">Angajator:</span>{" "}
                    {selected.income.employer || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Tip contract:</span>{" "}
                    {selected.income.contractType || "-"}
                  </p>
                </div>
              </div>
            )}

            {/* KYC */}
            {selected.kyc && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">KYC</h3>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="font-semibold">{selected.kyc.status}</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                  <a
                    className="text-blue-600 underline"
                    href={selected.kyc.idFront}
                    target="_blank"
                  >
                    ID Front
                  </a>
                  <a
                    className="text-blue-600 underline"
                    href={selected.kyc.idBack}
                    target="_blank"
                  >
                    ID Back
                  </a>
                  <a
                    className="text-blue-600 underline"
                    href={selected.kyc.selfie}
                    target="_blank"
                  >
                    Selfie
                  </a>
                </div>
              </div>
            )}

            {/* Reason Codes */}
            {selected.reasonCodes?.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Reason Codes</h3>
                <ul className="list-disc ml-5 space-y-1">
                  {selected.reasonCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Uploaded documents */}
            {(selected.documents ?? []).length > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Documente încărcate</h3>
                <ul className="space-y-2">
                  {(selected.documents ?? []).map((doc) => (
                    <li key={doc.name} className="flex justify-between">
                      <a
                        href={doc.url}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        {doc.name}
                      </a>
                      <span className="text-xs text-gray-500">
                        {doc.uploadedAt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Requested documents */}
            {(selected.requestedDocuments ?? []).length > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Documente solicitate</h3>
                <ul className="list-disc ml-5">
                  {(selected.requestedDocuments ?? []).map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* notes */}
            {(selected.notes ?? []).length > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Note</h3>
                <ul className="space-y-2">
                  {(selected.notes ?? []).map((note, i) => (
                    <li
                      key={i}
                      className="bg-gray-100 dark:bg-gray-700 p-2 rounded"
                    >
                      <p>{note.text}</p>
                      <span className="text-xs text-gray-500">{note.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={mode === "edit"}
        onClose={() => {
          setMode(null);
          setSelected(null);
        }}
        title="Edit application"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setMode(null);
                setSelected(null);
              }}
              className="
          px-4 py-2 rounded
          bg-gray-200 text-gray-800
          hover:bg-gray-300
          dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600
        "
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        }
      >
        {selected && (
          <div className="space-y-4">
            {/* Client */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Client
              </label>
              <input
                value={selected.client}
                onChange={(e) =>
                  setSelected({ ...selected, client: e.target.value })
                }
                disabled={
                  selected.status === "approved" ||
                  selected.status === "rejected"
                }
                placeholder="Client name"
                className={`
    w-full px-3 py-2 rounded border
    bg-white text-gray-900
    border-gray-300
    dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
    ${
      selected.status === "approved" || selected.status === "rejected"
        ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400"
        : ""
    }
  `}
              />
            </div>

            {/* Income */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                  Venit
                </label>
                <input
                  type="number"
                  value={selected.income?.amount ?? 0}
                  onChange={(e) =>
                    setSelected((prev) => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        income: {
                          ...(prev.income ?? {
                            employer: "",
                            contractType: "",
                            history: [],
                          }),
                          amount: Number(e.target.value),
                        },
                      };
                    })
                  }
                  disabled={
                    selected.status === "approved" ||
                    selected.status === "rejected"
                  }
                  className={`
    w-full px-3 py-2 rounded border
    bg-white text-gray-900
    border-gray-300
    dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
    ${
      selected.status === "approved" || selected.status === "rejected"
        ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400"
        : ""
    }
  `}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                  Angajator
                </label>
                <input
                  type="text"
                  value={selected.income?.employer ?? ""}
                  onChange={(e) =>
                    setSelected((prev) => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        income: {
                          ...(prev.income ?? {
                            amount: 0,
                            contractType: "",
                            history: [],
                          }),
                          employer: e.target.value,
                        },
                      };
                    })
                  }
                  disabled={
                    selected.status === "approved" ||
                    selected.status === "rejected"
                  }
                  className={`
    w-full px-3 py-2 rounded border
    bg-white text-gray-900
    border-gray-300
    dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
    ${
      selected.status === "approved" || selected.status === "rejected"
        ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400"
        : ""
    }
  `}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                  Tip contract
                </label>
                <select
                  value={selected.income?.contractType ?? ""}
                  onChange={(e) =>
                    setSelected((prev) => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        income: {
                          ...(prev.income ?? {
                            amount: 0,
                            employer: "",
                            history: [],
                          }),
                          contractType: e.target.value,
                        },
                      };
                    })
                  }
                  disabled={
                    selected.status === "approved" ||
                    selected.status === "rejected"
                  }
                  className="
      w-full px-3 py-2 rounded border
      bg-white text-gray-900
      dark:bg-gray-800 dark:text-gray-100
      border-gray-300 dark:border-gray-600
    "
                >
                  <option value="">Selectează tipul contractului</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Contractual">Contractual</option>
                </select>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Status
              </label>
              <select
                value={selected.status}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    status: e.target.value as RiskApplication["status"],
                  })
                }
                disabled={
                  selected.status === "approved" ||
                  selected.status === "rejected"
                }
                className={`
            w-full px-3 py-2 rounded border
            bg-white text-gray-900
            dark:bg-gray-800 dark:text-gray-100
            border-gray-300 dark:border-gray-600 ${
              selected.status === "approved" || selected.status === "rejected"
                ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                : ""
            }`}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {(selected.status === "approved" ||
                selected.status === "rejected") && (
                <p className="text-sm text-red-500 mt-2 text-center">
                  Aplicatia este
                  {selected.status === "approved" ? " aprobata" : " respinsa"},
                  nu mai pot fi facute modificari.
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
