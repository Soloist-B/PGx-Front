// src/app/(protected)/patient/page.tsx
"use client";

import { usePatients } from "@/context/PatientContext";
import { useState } from "react";
import { Search, User, Save } from "lucide-react";
import styles from "./page.module.css";

export default function PatientPage() {
  const { patients, addPatient } = usePatients();

  const [form, setForm] = useState({
    idCard: "",
    firstName: "",
    lastName: "",
    sex: "",
    dob: "",
    phone: "",
    ethnicity: "",
    otherEthnicity: "",
  });

  const [searchId, setSearchId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);

  // ===== Search & Autofill =====
  const handleSearch = () => {
    if (!/^\d{13}$/.test(searchId)) {
      setErrors((prev) => ({ ...prev, searchId: "ID Card must be 13 digits" }));
      return;
    }

    const existing = patients.find((p) => p.idCard === searchId);

    if (existing) {
      const fieldsToFill = [
        "idCard",
        "firstName",
        "lastName",
        "sex",
        "dob",
        "phone",
        "ethnicity",
        "otherEthnicity",
      ];

      setForm({
        idCard: existing.idCard,
        firstName: existing.firstName,
        lastName: existing.lastName,
        sex: existing.sex,
        dob: existing.dob,
        phone: existing.phone,
        ethnicity: existing.ethnicity,
        otherEthnicity: existing.otherEthnicity || "",
      });

      setErrors((prev) => {
        const cleared = { ...prev };
        fieldsToFill.concat("searchId").forEach((k) => delete cleared[k]);
        return cleared;
      });

      setHighlightedFields(fieldsToFill);
      setTimeout(() => setHighlightedFields([]), 2000);
    } else {
      setErrors((prev) => ({ ...prev, searchId: "No patient record found" }));
    }
  };

  // ===== Handlers =====
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "idCard") {
      const onlyNums = value.replace(/\D/g, "").slice(0, 13);
      setForm((prev) => ({ ...prev, idCard: onlyNums }));
      setErrors((prev) => ({ ...prev, idCard: "" }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRadio = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ===== Validate =====
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!/^\d{13}$/.test(form.idCard)) newErrors.idCard = "ID Card must be 13 digits";
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.sex) newErrors.sex = "Please select sex";

    if (!form.dob) {
      newErrors.dob = "Date of birth is required";
    } else if (new Date(form.dob) >= new Date()) {
      newErrors.dob = "Date of birth cannot be today or future";
    }

    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Phone must be 10 digits";

    if (!form.ethnicity) {
      newErrors.ethnicity = "Please select ethnicity";
    } else if (form.ethnicity === "other" && !form.otherEthnicity) {
      newErrors.otherEthnicity = "Please specify ethnicity";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== Submit =====
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // ✅ บันทึกข้อมูลพร้อมสถานะ + ค่า default ของฟิลด์ที่ยังไม่ได้ใช้
    addPatient({
      ...form,
      gene: "",
      markerValues: {},
      genotype: "",
      phenotype: "",
      status: "pending_gene",
    });

    // ✅ แจ้งเตือนและล้างฟอร์ม
    alert("✅ บันทึกข้อมูลเรียบร้อยแล้ว");

    setForm({
      idCard: "",
      firstName: "",
      lastName: "",
      sex: "",
      dob: "",
      phone: "",
      ethnicity: "",
      otherEthnicity: "",
    });
  };

  // ===== UI =====
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Patient Form</h1>
      <p className={styles.subtitle}>Add new patient record</p>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          className={`${styles.searchInput} ${
            errors.searchId ? styles.errorInput : ""
          }`}
          value={searchId}
          onChange={(e) => {
            const only = e.target.value.replace(/\D/g, "").slice(0, 13);
            setSearchId(only);
            setErrors((prev) => ({ ...prev, searchId: "" }));
          }}
          placeholder="Search by ID Card (13 digits)"
          maxLength={13}
        />
        <button type="button" className={styles.searchButton} onClick={handleSearch}>
          <Search size={18} />
        </button>
      </div>
      {errors.searchId && <span className={styles.searchError}>{errors.searchId}</span>}

      {/* Patient Info */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <User size={18} color="#4CA771" style={{ marginRight: 6 }} />
          Pending Patients
        </h2>
        
        {/* ID Card */}
        <div className={styles.field}>
          <label className={styles.label}>ID Card</label>
          <input
            type="text"
            className={`${styles.input} ${
              errors.idCard ? styles.errorInput : ""
            } ${highlightedFields.includes("idCard") ? styles.autofilled : ""}`}
            name="idCard"
            value={form.idCard}
            onChange={handleChange}
            placeholder="ID Card (13 digits)"
            maxLength={13}
          />
          {errors.idCard && <span className={styles.error}>{errors.idCard}</span>}
        </div>

        {/* First + Last */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Firstname</label>
            <input
              className={`${styles.input} ${
                errors.firstName ? styles.errorInput : ""
              } ${highlightedFields.includes("firstName") ? styles.autofilled : ""}`}
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Lastname</label>
            <input
              className={`${styles.input} ${
                errors.lastName ? styles.errorInput : ""
              } ${highlightedFields.includes("lastName") ? styles.autofilled : ""}`}
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
          </div>
        </div>

        {/* DOB + Sex */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Date of Birth</label>
            <input
              type="date"
              className={`${styles.input} ${styles.dateInput} ${
                errors.dob ? styles.errorInput : ""
              } ${highlightedFields.includes("dob") ? styles.autofilled : ""}`}
              name="dob"
              value={form.dob}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.dob && <span className={styles.error}>{errors.dob}</span>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Sex</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  className={styles.radioInput}
                  name="sex"
                  checked={form.sex === "male"}
                  onChange={() => handleRadio("sex", "male")}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  className={styles.radioInput}
                  name="sex"
                  checked={form.sex === "female"}
                  onChange={() => handleRadio("sex", "female")}
                />
                Female
              </label>
            </div>
            {errors.sex && <span className={styles.error}>{errors.sex}</span>}
          </div>
        </div>

        {/* Phone */}
        <div className={styles.field}>
          <label className={styles.label}>Phone</label>
          <input
            type="text"
            className={`${styles.input} ${
              errors.phone ? styles.errorInput : ""
            } ${highlightedFields.includes("phone") ? styles.autofilled : ""}`}
            name="phone"
            value={form.phone}
            onChange={(e) => {
              // ✅ กรองให้พิมพ์ได้เฉพาะตัวเลข
              const onlyNums = e.target.value.replace(/\D/g, "").slice(0, 10);
              setForm((prev) => ({ ...prev, phone: onlyNums }));
              setErrors((prev) => ({ ...prev, phone: "" }));
            }}
            placeholder="Phone (10 digits)"
            maxLength={10}
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>

        {/* Ethnicity */}
        <div className={styles.field}>
          <label className={styles.label}>Ethnicity</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                className={styles.radioInput}
                name="ethnicity"
                checked={form.ethnicity === "thai"}
                onChange={() => handleRadio("ethnicity", "thai")}
              />
              Thai
            </label>
            <label>
              <input
                type="radio"
                className={styles.radioInput}
                name="ethnicity"
                checked={form.ethnicity === "other"}
                onChange={() => handleRadio("ethnicity", "other")}
              />
              Other
            </label>
          </div>

          {form.ethnicity === "other" && (
            <input
              className={`${styles.input} ${
                errors.otherEthnicity ? styles.errorInput : ""
              } ${
                highlightedFields.includes("otherEthnicity") ? styles.autofilled : ""
              }`}
              name="otherEthnicity"
              value={form.otherEthnicity}
              onChange={handleChange}
              placeholder="Specify ethnicity"
            />
          )}

          {errors.ethnicity && <span className={styles.error}>{errors.ethnicity}</span>}
          {errors.otherEthnicity && (
            <span className={styles.error}>{errors.otherEthnicity}</span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.button} type="submit">
          <Save size={18} style={{ marginRight: 6 }} /> Save
        </button>
      </div>
    </form>
  );
}
