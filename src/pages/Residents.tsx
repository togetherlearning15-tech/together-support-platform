import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Resident = {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  local_authority: string | null;
  support_level: string | null;
  status: string | null;
};

type Property = {
  id: string;
  name: string;
};

type ResidentForm = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  local_authority: string;
  support_level: string;
  status: string;
  property_id: string;
};

export function Residents() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState<ResidentForm>({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    local_authority: "",
    support_level: "Medium",
    status: "Active",
    property_id: ""
  });

  useEffect(() => {
    loadResidents();
    loadProperties();
  }, []);

  async function loadResidents() {
    setLoading(true);

    const { data } = await supabase
      .from("residents")
      .select("*")
      .order("last_name");

    setResidents(data || []);
    setLoading(false);
  }

  async function loadProperties() {
    const { data } = await supabase
      .from("properties")
      .select("id,name")
      .order("name");

    setProperties(data || []);
  }

  function updateForm(field: keyof ResidentForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function resetForm() {
    setForm({
      first_name: "",
      last_name: "",
      date_of_birth: "",
      local_authority: "",
      support_level: "Medium",
      status: "Active",
      property_id: ""
    });

    setErrorMessage("");
  }

  async function saveResident(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);

    const { error } = await supabase.from("residents").insert({
      first_name: form.first_name,
      last_name: form.last_name,
      date_of_birth: form.date_of_birth || null,
      local_authority: form.local_authority,
      support_level: form.support_level,
      status: form.status,
      property_id: form.property_id || null
    });

    if (error) {
      setErrorMessage(error.message);
      setSaving(false);
      return;
    }

    resetForm();
    setShowForm(false);

    await loadResidents();

    setSaving(false);
  }

  return (
    <main className="dashboardContent">
      <div className="pageHeader">
        <div>
          <h1>Residents</h1>
          <p>Manage resident records, placements, support needs and reviews.</p>
        </div>

        <button
          className="primaryButton"
          onClick={() => setShowForm(true)}
        >
          + Add Resident
        </button>
      </div>

      {showForm && (
        <section className="dashboardPanel">

          <p className="eyebrow">New Resident</p>

          <h2>Add Resident</h2>

          <form className="adminForm" onSubmit={saveResident}>

            <label>
              First Name
              <input
                value={form.first_name}
                onChange={(e)=>updateForm("first_name",e.target.value)}
                required
              />
            </label>

            <label>
              Last Name
              <input
                value={form.last_name}
                onChange={(e)=>updateForm("last_name",e.target.value)}
                required
              />
            </label>

            <label>
              Date of Birth
              <input
                type="date"
                value={form.date_of_birth}
                onChange={(e)=>updateForm("date_of_birth",e.target.value)}
              />
            </label>

            <label>
              Property
              <select
                value={form.property_id}
                onChange={(e)=>updateForm("property_id",e.target.value)}
              >
                <option value="">Select Property</option>

                {properties.map(property=>(
                  <option
                    key={property.id}
                    value={property.id}
                  >
                    {property.name}
                  </option>
                ))}

              </select>

            </label>

            <label>
              Local Authority
              <input
                value={form.local_authority}
                onChange={(e)=>updateForm("local_authority",e.target.value)}
              />
            </label>

            <label>
              Support Level

              <select
                value={form.support_level}
                onChange={(e)=>updateForm("support_level",e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

            </label>

            <label>
              Status

              <select
                value={form.status}
                onChange={(e)=>updateForm("status",e.target.value)}
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Moved Out</option>
              </select>

            </label>

            {errorMessage && (
              <p className="formError">
                {errorMessage}
              </p>
            )}

            <div className="formActions">

              <button
                className="primaryButton"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Resident"}
              </button>

              <button
                type="button"
                className="secondaryButton"
                onClick={()=>{
                  resetForm();
                  setShowForm(false);
                }}
              >
                Cancel
              </button>

            </div>

          </form>

        </section>
      )}

      {loading ? (
        <p>Loading residents...</p>
      ) : residents.length === 0 ? (
        <section className="emptyStateCard">
          <h2>No residents added yet</h2>
          <p>Add your first resident to begin building the resident register.</p>
        </section>
      ) : (
        <table className="adminTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Local Authority</th>
              <th>Support Level</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {residents.map((resident)=>(
              <tr key={resident.id}>

                <td>
                  {resident.first_name} {resident.last_name}
                </td>

                <td>{resident.date_of_birth || "-"}</td>

                <td>{resident.local_authority || "-"}</td>

                <td>{resident.support_level || "-"}</td>

                <td>
                  <span className="statusPill">
                    {resident.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}

    </main>
  );
}