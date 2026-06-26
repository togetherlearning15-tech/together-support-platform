import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type Property = {
  id: string;
  name: string | null;
  title?: string | null;
  address: string | null;
  local_authority: string | null;
  rooms: number | null;
  occupied_rooms: number | null;
};

type PropertyForm = {
  name: string;
  address: string;
  local_authority: string;
  rooms: string;
};

export function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const [form, setForm] = useState<PropertyForm>({
    name: "",
    address: "",
    local_authority: "",
    rooms: ""
  });

  const isEditing = Boolean(editingPropertyId);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("name", { ascending: true, nullsFirst: false });

    if (error) {
      setErrorMessage(error.message);
      setProperties([]);
    } else {
      setProperties(data || []);
    }

    setLoading(false);
  }

  function getPropertyName(property: Property) {
    return property.name || property.title || "Untitled property";
  }

  const filteredProperties = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return properties;

    return properties.filter((property) => {
      const searchableText = [
        property.name,
        property.title,
        property.address,
        property.local_authority,
        property.rooms?.toString(),
        property.occupied_rooms?.toString()
      ]
        .filter((value): value is string => Boolean(value))
        .join(" ")
        .toLowerCase();

      return searchableText.includes(term);
    });
  }, [properties, search]);

  const totals = useMemo(() => {
    const totalProperties = properties.length;
    const totalRooms = properties.reduce((sum, property) => sum + Number(property.rooms || 0), 0);
    const occupiedRooms = properties.reduce((sum, property) => sum + Number(property.occupied_rooms || 0), 0);
    const vacantRooms = Math.max(totalRooms - occupiedRooms, 0);

    return { totalProperties, totalRooms, occupiedRooms, vacantRooms };
  }, [properties]);

  function updateForm(field: keyof PropertyForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function resetForm() {
    setForm({
      name: "",
      address: "",
      local_authority: "",
      rooms: ""
    });
    setEditingPropertyId(null);
    setErrorMessage("");
  }

  function startNewProperty() {
    resetForm();
    setShowForm(true);
    setSelectedProperty(null);
  }

  function startEditProperty(property: Property) {
    setForm({
      name: getPropertyName(property),
      address: property.address || "",
      local_authority: property.local_authority || "",
      rooms: String(property.rooms || "")
    });

    setEditingPropertyId(property.id);
    setErrorMessage("");
    setShowForm(true);
    setSelectedProperty(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveProperty(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setErrorMessage("");

    const cleanName = form.name.trim();

    const payload = {
      name: cleanName,
      title: cleanName,
      address: form.address.trim(),
      local_authority: form.local_authority.trim(),
      rooms: Number(form.rooms)
    };

    if (isEditing && editingPropertyId) {
      const { error } = await supabase
        .from("properties")
        .update(payload)
        .eq("id", editingPropertyId);

      if (error) {
        setErrorMessage(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from("properties").insert({
        ...payload,
        occupied_rooms: 0
      });

      if (error) {
        setErrorMessage(error.message);
        setSaving(false);
        return;
      }
    }

    resetForm();
    setShowForm(false);
    await loadProperties();
    setSaving(false);
  }

  async function deleteProperty(property: Property) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${getPropertyName(property)}"? This cannot be undone.`
    );

    if (!confirmed) return;

    setErrorMessage("");

    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", property.id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (selectedProperty?.id === property.id) {
      setSelectedProperty(null);
    }

    await loadProperties();
  }

  function getOccupancy(property: Property) {
    const rooms = Number(property.rooms || 0);
    const occupied = Number(property.occupied_rooms || 0);

    if (!rooms) return 0;

    return Math.min(Math.round((occupied / rooms) * 100), 100);
  }

  function getStatus(property: Property) {
    const occupancy = getOccupancy(property);

    if (occupancy >= 100) return "Full";
    if (occupancy === 0) return "Vacant";
    return "Active";
  }

  return (
    <main className="dashboardContent">
      <div className="pageHeader propertyHeader">
        <div>
          <h1>Property Management</h1>
          <p>Manage supported accommodation properties, rooms and occupancy.</p>
        </div>

        <button className="primaryButton" type="button" onClick={startNewProperty}>
          + Add Property
        </button>
      </div>

      {errorMessage && <p className="formError">{errorMessage}</p>}

      <section className="propertyStatsGrid">
        <article className="propertyStatCard">
          <span>Properties</span>
          <strong>{totals.totalProperties}</strong>
          <p>Total properties in the register</p>
        </article>

        <article className="propertyStatCard">
          <span>Total rooms</span>
          <strong>{totals.totalRooms}</strong>
          <p>Available supported accommodation rooms</p>
        </article>

        <article className="propertyStatCard">
          <span>Occupied</span>
          <strong>{totals.occupiedRooms}</strong>
          <p>Rooms currently occupied</p>
        </article>

        <article className="propertyStatCard">
          <span>Vacant</span>
          <strong>{totals.vacantRooms}</strong>
          <p>Rooms currently available</p>
        </article>
      </section>

      {selectedProperty && (
        <section className="dashboardPanel">
          <div>
            <p className="eyebrow">Property Profile</p>
            <h2>{getPropertyName(selectedProperty)}</h2>
            <p>{selectedProperty.address || "No address recorded"}</p>

            <div className="propertyProfileGrid">
              <div>
                <strong>Local authority</strong>
                <span>{selectedProperty.local_authority || "-"}</span>
              </div>

              <div>
                <strong>Total rooms</strong>
                <span>{selectedProperty.rooms || 0}</span>
              </div>

              <div>
                <strong>Occupied rooms</strong>
                <span>{selectedProperty.occupied_rooms || 0}</span>
              </div>

              <div>
                <strong>Vacant rooms</strong>
                <span>{Math.max(Number(selectedProperty.rooms || 0) - Number(selectedProperty.occupied_rooms || 0), 0)}</span>
              </div>
            </div>

            <div className="formActions">
              <button
                className="secondaryButton"
                type="button"
                onClick={() => startEditProperty(selectedProperty)}
              >
                Edit property
              </button>

              <button
                className="secondaryButton"
                type="button"
                onClick={() => setSelectedProperty(null)}
              >
                Close profile
              </button>
            </div>
          </div>
        </section>
      )}

      {showForm && (
        <section className="dashboardPanel">
          <div>
            <p className="eyebrow">{isEditing ? "Edit Property" : "New Property"}</p>
            <h2>
              {isEditing
                ? "Update supported accommodation property"
                : "Add supported accommodation property"}
            </h2>

            <form className="adminForm" onSubmit={saveProperty}>
              <label>
                Property name
                <input
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="e.g. Church Road House"
                  required
                />
              </label>

              <label>
                Address
                <textarea
                  value={form.address}
                  onChange={(event) => updateForm("address", event.target.value)}
                  placeholder="Full property address"
                  required
                />
              </label>

              <label>
                Local authority
                <input
                  value={form.local_authority}
                  onChange={(event) => updateForm("local_authority", event.target.value)}
                  placeholder="e.g. Bristol City Council"
                  required
                />
              </label>

              <label>
                Number of rooms
                <input
                  type="number"
                  min="1"
                  value={form.rooms}
                  onChange={(event) => updateForm("rooms", event.target.value)}
                  required
                />
              </label>

              <div className="formActions">
                <button className="primaryButton" type="submit" disabled={saving}>
                  {saving ? "Saving..." : isEditing ? "Save Changes" : "Save Property"}
                </button>

                <button
                  className="secondaryButton"
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      <section className="propertyToolbar">
  <input
    value={search}
    onChange={(event) => setSearch(event.target.value)}
    placeholder="Search by property, title, address or local authority..."
  />

  <p style={{ marginTop: "8px", color: "#5b7087", fontWeight: 700 }}>
    Search: "{search}" | Showing {filteredProperties.length} of {properties.length}
  </p>
</section>

      {loading ? (
        <p>Loading properties...</p>
      ) : filteredProperties.length === 0 ? (
        <section className="emptyStateCard">
          <h2>No properties found</h2>
          <p>Add your first supported accommodation property or adjust your search.</p>
        </section>
      ) : (
        <section className="propertyCardGrid">
          {filteredProperties.map((property) => {
            const occupancy = getOccupancy(property);
            const status = getStatus(property);
            const propertyName = getPropertyName(property);

            return (
              <article className="propertyCard" key={property.id}>
                <div className="propertyCardTop">
                  <div>
                    <p className="eyebrow">{property.local_authority || "No local authority"}</p>
                    <h2>{propertyName}</h2>
                    <p>{property.address || "No address recorded"}</p>
                  </div>

                  <span className={`propertyStatus ${status.toLowerCase()}`}>
                    {status}
                  </span>
                </div>

                <div className="occupancyBlock">
                  <div className="occupancyText">
                    <span>Occupancy</span>
                    <strong>
                      {property.occupied_rooms || 0}/{property.rooms || 0} rooms
                    </strong>
                  </div>

                  <div className="occupancyBar">
                    <div style={{ width: `${occupancy}%` }} />
                  </div>

                  <p>{occupancy}% occupied</p>
                </div>

                <div className="propertyActions">
                  <button
                    className="secondaryButton"
                    type="button"
                    onClick={() => {
                      setSelectedProperty(property);
                      setShowForm(false);
                    }}
                  >
                    View property
                  </button>

                  <button
                    className="secondaryButton"
                    type="button"
                    onClick={() => startEditProperty(property)}
                  >
                    Edit
                  </button>

                  <button
                    className="secondaryButton"
                    type="button"
                    onClick={() => deleteProperty(property)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}