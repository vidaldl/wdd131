import { loadSkills } from "./skills-data.js";

function createProgressBar(proficiency, skillName, index) {
  let value = parseInt(proficiency, 10);
  if (Number.isNaN(value)) value = 0;


  const wrapper = document.createElement("div");
  wrapper.className = "progress";

  const id = `skill-progress-${index}`;

  const label = document.createElement("label");
  label.className = "progress__label";
  label.htmlFor = id;
  label.textContent = `${skillName}: ${value}%`;

  const bar = document.createElement("progress");
  bar.className = "progress__bar";
  bar.id = id;
  bar.value = value;
  bar.max = 100;
  bar.textContent = `${value}%`;

  wrapper.appendChild(label);
  wrapper.appendChild(bar);

  return wrapper;
}

function createProjectsList(projects) {
  if (!Array.isArray(projects) || projects.length === 0) return null;

  const wrapper = document.createElement("div");
  wrapper.className = "skill-projects";

  const heading = document.createElement("h4");
  heading.textContent = "Projects";

  const list = document.createElement("ul");

  projects.forEach((project) => {
    if (!project) return;

    const title = project.title;
    const url = project.url;

    if (!title || !url) return;

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = url;
    a.textContent = title;
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
  const card = document.createElement("article");
  card.className = "card skill-card";

  let name = "Skill";
  let proficiency = 0;
  let description = "";
  let detailsText = "";
  let projects = [];

  if (skill) {
    if (skill.name) name = skill.name;
    if (skill.proficiency !== undefined) proficiency = skill.proficiency;
    if (skill.description) description = skill.description;
    if (skill.details) detailsText = skill.details;
    if (Array.isArray(skill.projects)) projects = skill.projects;
  }

  const title = document.createElement("h3");
  title.textContent = name;

  const progress = createProgressBar(proficiency, name, index);

  const desc = document.createElement("p");
  desc.className = "skill-description";
  desc.textContent = description;

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

  const projectsEl = createProjectsList(projects);
  if (projectsEl) details.appendChild(projectsEl);

  card.appendChild(title);
  card.appendChild(progress);
  card.appendChild(desc);
  card.appendChild(button);
  card.appendChild(details);

  return card;
}

function setExpanded(button, detailsEl, expanded) {
  button.setAttribute("aria-expanded", expanded ? "true" : "false");
  button.textContent = expanded ? "Hide Details" : "View Details";
  detailsEl.hidden = !expanded;
}

function collapseAllExcept(containerEl, activeButton) {
  const buttons = containerEl.querySelectorAll(".details-toggle");

  buttons.forEach((button) => {
    if (button === activeButton) return;

    const detailsId = button.getAttribute("aria-controls");
    const detailsEl = detailsId ? document.getElementById(detailsId) : null;
    if (!detailsEl) return;

    if (button.getAttribute("aria-expanded") === "true") {
      setExpanded(button, detailsEl, false);
    }
  });
}

async function init() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  const skills = await loadSkills();
  if (!Array.isArray(skills)) return;

  skills.forEach((skill, index) => {
    grid.appendChild(createSkillCard(skill, index));
  });

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
