"use client";

import { useEffect, useState, useTransition } from "react";
import { getPreferences, savePreferences } from "./actions";
import type { PreferencesForm } from "@/types/preferences";

export default function PreferencesPage() {
  const [form, setForm] = useState<PreferencesForm>({
    difficulty: "",
    targetMuscle: "",
    equipment: "",
  });

  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getPreferences().then(setForm);
  }, []);

  function updateField<K extends keyof PreferencesForm>(
    key: K,
    value: PreferencesForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    startTransition(async () => {
      await savePreferences(form);
      setSaved(true);
    });
  }

  return (
    <div className="max-w-lg mx-auto mt-20 space-y-6 border-2 border-gray-300 rounded-xl p-8">
      <h1 className="text-3xl font-bold text-center">
        ⚙️ Preferences
      </h1>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Difficulty
        </label>
        <select
          value={form.difficulty}
          onChange={(e) =>
            updateField("difficulty", e.target.value)
          }
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Target Muscle */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Target Muscle
        </label>
        <select
          value={form.targetMuscle}
          onChange={(e) =>
            updateField("targetMuscle", e.target.value)
          }
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Any</option>
          <option value="legs">Legs</option>
          <option value="arms">Arms</option>
          <option value="core">Core</option>
          <option value="full-body">Full Body</option>
        </select>
      </div>

      {/* Equipment */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Equipment
        </label>
        <select
          value={form.equipment}
          onChange={(e) =>
            updateField("equipment", e.target.value)
          }
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Any</option>
          <option value="none">None</option>
          <option value="mat">Mat</option>
          <option value="dumbbells">Dumbbells</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        disabled={isPending}
        className="w-full py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save Preferences"}
      </button>

      {saved && (
        <p className="text-green-600 text-center">
          Preferences saved ✓
        </p>
      )}
    </div>
  );
}
