/* ─────────────────────────────────────────
   RSVP SETTINGS (template-level config)
   This file is the single source of truth for:
     • rsvpType        — "simple" | "detailed"
     • allowEditRsvp   — guest can re-open the form after submitting
     • form.fields[]   — dynamic field list rendered by the modal
   When wired to the platform later, these values will be overridden
   by the host's real choices.
───────────────────────────────────────── */

export type RsvpFieldType =
  | "text"
  | "longtext"
  | "number"
  | "time"
  | "date"
  | "select"
  | "multiselect"
  | "phone"
  | "email"
  | "yesno";

export type RsvpField = {
  id: string;
  type: RsvpFieldType;
  label: string;
  placeholder?: string;
  hint?: string;
  options?: string[]; // for select / multiselect
  required?: boolean;
  min?: number;
  max?: number;
};

export type RsvpConfig = {
  rsvpType: "simple" | "detailed";
  allowEditRsvp: boolean;
  form: { fields: RsvpField[] };
};

export const RSVP_CONFIG: RsvpConfig = {
  rsvpType: "detailed",
  allowEditRsvp: true,
  form: {
    fields: [
      {
        id: "guestCount",
        type: "number",
        label: "Number of Guests",
        placeholder: "e.g. 2",
        required: true,
        min: 1,
        max: 20,
      },
      {
        id: "arrivalTime",
        type: "time",
        label: "Expected Arrival Time",
        required: false,
      },
      {
        id: "mealPreference",
        type: "select",
        label: "Meal Preference",
        options: ["Veg", "Jain", "Non-Veg"],
        required: false,
      },
    ],
  },
};

/* ─────────────────────────────────────────
   URL preview overrides (development only)
   ?rsvp=simple|detailed
   ?edit=on|off
   ?screen=accepted|submitted
   These MUST be ignored once a real backend is connected.
───────────────────────────────────────── */
export function resolveRsvpConfig(search: string): {
  config: RsvpConfig;
  previewScreen: "none" | "accepted" | "submitted";
} {
  const cfg: RsvpConfig = {
    ...RSVP_CONFIG,
    form: { fields: [...RSVP_CONFIG.form.fields] },
  };
  let previewScreen: "none" | "accepted" | "submitted" = "none";

  if (typeof search !== "string" || !search) return { config: cfg, previewScreen };

  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const rsvp = params.get("rsvp");
  if (rsvp === "simple" || rsvp === "detailed") cfg.rsvpType = rsvp;
  const edit = params.get("edit");
  if (edit === "on") cfg.allowEditRsvp = true;
  if (edit === "off") cfg.allowEditRsvp = false;
  const screen = params.get("screen");
  if (screen === "accepted" || screen === "submitted") previewScreen = screen;

  return { config: cfg, previewScreen };
}
