"use client";

import { useState } from "react";

export default function PreferencesPage() {
  const [difficulty, setDifficulty] = useState("");
  const [targetMuscle, setTargetMuscle] = useState("");
  const [equipment, setEquipment] = useState("");

  async function savePreferences() {
    await fetch("/api/preferences/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ difficulty, targetMuscle, equipment }),
    });
    alert("Preferences saved");
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h1 className="text-2xl font-bold">Preferences</h1>

      <select onChange={(e) => setDifficulty(e.target.value)} className="input">
        <option value="">Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <select onChange={(e) => setTargetMuscle(e.target.value)} className="input">
        <option value="">Target Muscle</option>
        <option value="legs">Legs</option>
        <option value="arms">Arms</option>
        <option value="core">Core</option>
        <option value="full-body">Full Body</option>
      </select>

      <input
        className="input"
        placeholder="Equipment (optional)"
        onChange={(e) => setEquipment(e.target.value)}
      />

      <button onClick={savePreferences} className="btn">
        Save
      </button>
    </div>
  );
}
