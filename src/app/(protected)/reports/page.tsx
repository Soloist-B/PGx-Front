"use client";

import { useState, useMemo } from "react";
import { usePatients } from "@/context/PatientContext";
import { Search, FileDown, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import styles from "./page.module.css";

export default function ReportsPage() {
  const { patients } = usePatients();
  const [search, setSearch] = useState("");

  // ✅ Filter only approved patients
  const approvedPatients = useMemo(() => {
    return patients
      .filter(
        (p) =>
          p.status === "approved" &&
          (p.firstName.toLowerCase().includes(search.toLowerCase()) ||
            p.lastName.toLowerCase().includes(search.toLowerCase()) ||
            p.idCard.includes(search))
      )
      .reverse();
  }, [patients, search]);

  // 📤 Export CSV
  const exportCSV = () => {
    const headers = [
      "First Name",
      "Last Name",
      "ID Card",
      "Gene",
      "Genotype",
      "Phenotype",
      "Status",
    ];
    const rows = approvedPatients.map((p) => [
      p.firstName,
      p.lastName,
      p.idCard,
      p.gene || "-",
      p.genotype || "-",
      p.phenotype || "-",
      "Approved",
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PGx_Approved_Reports.csv";
    a.click();
  };

  // 🧾 Export PDF (with jsPDF + autoTable)
  const exportPDF = () => {
    const doc = new jsPDF("p", "pt");

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("PGx Approved Patient Reports", 40, 40);

    // Subtitle
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      40,
      60
    );

    // Table Data
    const tableColumn = [
      "Name",
      "ID Card",
      "Gene",
      "Genotype",
      "Phenotype",
      "Status",
    ];

    const tableRows = approvedPatients.map((p) => [
      `${p.firstName} ${p.lastName}`,
      p.idCard,
      p.gene || "-",
      p.genotype || "-",
      p.phenotype || "-",
      "Approved",
    ]);

    // Table styling
    autoTable(doc, {
      startY: 80,
      head: [tableColumn],
      body: tableRows,
      styles: {
        fontSize: 9,
        cellPadding: 5,
        halign: "left",
      },
      headStyles: {
        fillColor: [76, 167, 113], // green header
        textColor: [255, 255, 255],
      },
    });

    doc.save("PGx_Approved_Reports.pdf");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Approved Reports</h1>
      <p className={styles.subtitle}>
        Review and export pharmacogenomic reports of approved patients.
      </p>

      {/* Top Controls */}
      <div className={styles.topBar}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by Name or ID..."
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={styles.searchButton}>
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableBox}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID Card</th>
              <th>Gene</th>
              <th>Genotype</th>
              <th>Phenotype</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
            <tbody>
              {approvedPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                    No approved reports found.
                  </td>
                </tr>
              ) : (
                approvedPatients.map((p) => (
                  <tr key={p.idCard}>
                    <td className={styles.nameCell}>
                      {p.firstName} {p.lastName}
                    </td>
                    <td>{p.idCard}</td>
                    <td>{p.gene}</td>
                    <td>{p.genotype}</td>
                    <td>{p.phenotype}</td>
                    <td>
                      <span className={styles.statusApproved}>Approved</span>                 
                    </td>
                    <td>
                      <button className={styles.exportBtnSmall}>Export</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
        </table>
      </div>
    </div>
  );
}
