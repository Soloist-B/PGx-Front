"use client";

import { useState, useMemo } from "react";
import { usePatients } from "@/context/PatientContext";
import { genotypeMappings } from "@/utils/mappings";
import { Search, Dna, Save } from "lucide-react";
import styles from "./page.module.css";

type MarkerValues = Record<string, string>;

export default function GenePage() {
  const { patients, addPatient, updatePatients } = usePatients();
  const [searchId, setSearchId] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [gene, setGene] = useState("");
  const [markerValues, setMarkerValues] = useState<MarkerValues>({});
  const [genotype, setGenotype] = useState("");
  const [phenotype, setPhenotype] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [patientList, setPatientList] = useState(patients);
  const [recommendation, setRecommendation] = useState("");

  // filter pending patients by ID search
  const pendingPatients = useMemo(() => {
    const list = patientList.filter(
      (p) =>
        p.status === "pending_gene" &&
        p.idCard.includes(searchId.trim())
    );
    return list.slice().reverse(); // show latest first
  }, [patientList, searchId]);

    const handleSelectPatient = (idCard: string) => {
    // ✅ toggle selection
    if (selectedId === idCard) {
        // if clicked again -> unselect
        setSelectedId(null);
        setGene("");
        setMarkerValues({});
        setGenotype("");
        setPhenotype("");
        setErrors({});
        return;
    }

    // otherwise select normally
    setSelectedId(idCard);
    setGene("");
    setMarkerValues({});
    setGenotype("");
    setPhenotype("");
    setErrors({});
    };


  const areAllMarkersSelected = (geneKey: string, values: MarkerValues) => {
    const gm = genotypeMappings[geneKey as keyof typeof genotypeMappings];
    if (!gm) return false;
    return gm.markers.every((m) => values[m.name]);
  };

  const handleMarkerChange = (markerName: string, value: string) => {
    const next = { ...markerValues, [markerName]: value };
    setMarkerValues(next);

    if (gene && areAllMarkersSelected(gene, next)) {
      const gm = genotypeMappings[gene as keyof typeof genotypeMappings];
      const computedGenotype = gm.mapToGenotype(next) || "";
      const found = gm.genotypes.find((g) => g.genotype === computedGenotype);
      setGenotype(computedGenotype);
      setPhenotype(found?.phenotype || "");
      setRecommendation(found?.recommendation || "");
    } else {
      setGenotype("");
      setPhenotype("");
      setRecommendation("");
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedId) newErrors.patient = "Please select a patient";
    if (!gene) newErrors.gene = "Please select gene";
    if (gene) {
      const gm = genotypeMappings[gene as keyof typeof genotypeMappings];
      gm.markers.forEach((m) => {
        if (!markerValues[m.name]) newErrors[m.name] = `Please select ${m.name}`;
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const gm = genotypeMappings[gene as keyof typeof genotypeMappings];
    const computedGenotype = gm.mapToGenotype(markerValues) || "";
    const found = gm.genotypes.find((g) => g.genotype === computedGenotype);
    const computedPhenotype = found?.phenotype || "";

    // ✅ update patient state
    const updated = patientList.map((p) =>
      p.idCard === selectedId
        ? {
            ...p,
            gene,
            markerValues,
            genotype: computedGenotype,
            phenotype: computedPhenotype,
            recommendation: found?.recommendation || "",
            status: "pending_approve" as const,
          }
        : p
    );

    updatePatients(updated);
    localStorage.setItem("patients", JSON.stringify(updated));

    alert("✅ Gene information saved successfully!");

    // clear selection
    setSelectedId(null);
    setGene("");
    setMarkerValues({});
    setGenotype("");
    setPhenotype("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gene Entry</h1>
      <p className={styles.subtitle}>
        Manage and record genetic data for pending patients.
      </p>

      <div className={styles.grid}>
        <div className={styles.left}>
          {/* Pending Patients */}
          <div className={styles.chartBox}>
            <h3>
              <Dna size={18} color="#4CA771" style={{ marginRight: 6 }} />
              Pending Patients
            </h3>
            <p className={styles.sectionNote}>
              Select a patient to fill their genetic information.
            </p>

            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search by ID Card (13 digits)"
                className={styles.searchInput}
                value={searchId}
                onChange={(e) =>
                  setSearchId(e.target.value.replace(/\D/g, "").slice(0, 13))
                }
              />
              <button className={styles.searchButton}>
                <Search size={18} />
              </button>
            </div>

            {pendingPatients.length === 0 ? (
              <p>No pending patients found.</p>
            ) : (
              <div className={styles.scrollBox}>
                {pendingPatients.map((p) => (
                  <div
                    key={p.idCard}
                    className={`${styles.patientCard} ${
                      selectedId === p.idCard ? styles.selected : ""
                    }`}
                    onClick={() => handleSelectPatient(p.idCard)}
                  >
                    <div className={styles.patientName}>
                      {p.firstName} {p.lastName}
                    </div>
                    <div className={styles.patientInfo}>
                      <span>ID: {p.idCard}</span>
                      <span
                        className={`${styles.statusBadge} ${
                          p.status === "pending_gene"
                            ? styles.statusPending
                            : p.status === "pending_approve"
                            ? styles.statusReview
                            : styles.statusApproved
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gene Entry Form */}
          {selectedId && (
            <form onSubmit={handleSubmit} className={styles.chartBox}>
              <h3>Genetic Information</h3>
              <p className={styles.sectionNote}>
                Enter genetic markers and phenotypic interpretations.
              </p>

              <div className={styles.field}>
                <label className={styles.label}>Select Gene</label>
                <select
                  className={`${styles.input} ${
                    errors.gene ? styles.errorInput : ""
                  }`}
                  value={gene}
                  onChange={(e) => {
                    setGene(e.target.value);
                    setMarkerValues({});
                    setGenotype("");
                    setPhenotype("");
                    setErrors((prev) => ({ ...prev, gene: "" }));
                  }}
                >
                  <option value="">-- Select Gene --</option>
                  {Object.keys(genotypeMappings).map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {errors.gene && <span className={styles.error}>{errors.gene}</span>}
              </div>

              {gene &&
                genotypeMappings[gene as keyof typeof genotypeMappings].markers.map(
                  (marker) => (
                    <div key={marker.name} className={styles.field}>
                      <label className={styles.label}>
                        {marker.name} {marker.description}
                      </label>
                      <select
                        className={`${styles.input} ${
                          errors[marker.name] ? styles.errorInput : ""
                        }`}
                        value={markerValues[marker.name] || ""}
                        onChange={(e) =>
                          handleMarkerChange(marker.name, e.target.value)
                        }
                      >
                        <option value="">-- Select --</option>
                        {marker.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors[marker.name] && (
                        <span className={styles.error}>{errors[marker.name]}</span>
                      )}
                    </div>
                  )
                )}

              {genotype && (
                <div className={styles.field}>
                  <label className={styles.label}>Genotype</label>
                  <input className={styles.input} value={genotype} disabled />
                </div>
              )}

              {phenotype && (
                <div className={styles.field}>
                  <label className={styles.label}>Phenotype</label>
                  <input className={styles.input} value={phenotype} disabled />
                </div>
              )}

              {recommendation && (
                <div className={styles.field}>
                  <label className={styles.label}>Recommendation</label>
                  <input className={styles.input} value={recommendation} disabled />
                </div>
              )}

              <div className={styles.actions}>
                <button type="submit" className={styles.button}>
                  <Save size={18} style={{ marginRight: 6 }} /> Save Gene Data
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
