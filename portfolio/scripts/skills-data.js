export async function loadSkills() {
  const response = await fetch("Data/skills.json", { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to load skills.json (HTTP ${response.status})`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("skills.json must be an array");
  }

  return data;
}
