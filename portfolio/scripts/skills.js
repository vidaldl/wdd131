import { loadSkills } from "./skills-data.js";

function createProgressBar(proficiency, labelText) {
  const progress = document.createElement("div");
  progress.className = "progress";
  progress.setAttribute("role", "progressbar");
  progress.setAttribute("aria-label", labelText);
  progress.setAttribute("aria-valuemin", "0");
  progress.setAttribute("aria-valuemax", "100");
  progress.setAttribute("aria-valuenow", String(proficiency));

  const fill = document.createElement("div");
  fill.className = "progress__fill";
  fill.style.width = `${proficiency}%`;

  const value = document.createElement("span");
  value.className = "progress__value";
  value.textContent = `${proficiency}%`;

  progress.appendChild(fill);
  progress.appendChild(value);

  return progress;
}

function createProjectsList(projects) {

  const wrapper = document.createElement("div");
  wrapper.className = "skill-projects";

  const heading = document.createElement("h4");
  heading.textContent = "Projects";

  const list = document.createElement("ul");

  projects.forEach((project) => {
    if (!project || !project.title || !project.url) {
      return;
    }
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = project.url;
    a.textContent = project.title;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    li.appendChild(a);
    list.appendChild(li);
  });

  if (list.children.length === 0) return null;

  wrapper.appendChild(heading);
  wrapper.appendChild(list);

  return wrapper;
}

function createSkillCard(skill, index) {
  const name = skill?.name ?? "Skill";
  const proficiency = Number(skill?.proficiency ?? 0);
  const description = skill?.description ?? "";
  const detailsText = skill?.details ?? "";

  const card = document.createElement("article");
  card.className = "card skill-card";

  const title = document.createElement("h3");
  title.textContent = name;

  const desc = document.createElement("p");
  desc.className = "skill-description";
  desc.textContent = description;

  const progress = createProgressBar(
    Number.isFinite(proficiency) ? Math.max(0, Math.min(100, proficiency)) : 0,
    `${name} proficiency`
  );

  const detailsId = `skill-details-${index}`;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "details-toggle";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", detailsId);
  button.textContent = "View Details";

  const details = document.createElement("div");
  details.className = "skill-details";
  details.id = detailsId;
  details.hidden = true;

  if (detailsText) {
    const p = document.createElement("p");
    p.textContent = detailsText;
    details.appendChild(p);
  }

  const projects = createProjectsList(skill?.projects);
  if (projects) {
    details.appendChild(projects);
  }

  card.appendChild(title);
  card.appendChild(progress);
  card.appendChild(desc);
  card.appendChild(button);
  card.appendChild(details);

  return card;
}

function setExpanded(button, detailsEl, expanded) {
  if (expanded) {
    button.setAttribute("aria-expanded", "true");
    button.textContent = "Hide Details";
    detailsEl.hidden = false;
  } else {
    button.setAttribute("aria-expanded", "false");
    button.textContent = "View Details";
    detailsEl.hidden = true;
  }
}

function collapseAllExcept(containerEl, activeButton) {
  const buttons = containerEl.querySelectorAll(".details-toggle");

  buttons.forEach((button) => {
    if (button === activeButton) return;

    const detailsId = button.getAttribute("aria-controls");
    const detailsEl = detailsId ? document.getElementById(detailsId) : null;
    if (!detailsEl) return;

    const expanded = button.getAttribute("aria-expanded") === "true";
    if (expanded) {
      setExpanded(button, detailsEl, false);
    }
  });
}

async function init() {
  const grid = document.getElementById("skills-grid");

  if (!grid) {
    return;
  }

  const skills = await loadSkills();

  const cards = skills.map((skill, index) => createSkillCard(skill, index));
  cards.forEach((card) => grid.appendChild(card));

  grid.addEventListener("click", (event) => {
    const button = event.target.closest(".details-toggle");
    if (!button) return;

    const detailsId = button.getAttribute("aria-controls");
    const detailsEl = detailsId ? document.getElementById(detailsId) : null;
    if (!detailsEl) return;

    const expanded = button.getAttribute("aria-expanded") === "true";

    if (expanded) {
      setExpanded(button, detailsEl, false);
    } else {
      collapseAllExcept(grid, button);
      setExpanded(button, detailsEl, true);
    }
  });
}

init();
