export const SUBJECTS = [
  { id: "math", label: "Математика" },
  { id: "phys", label: "Физика" },
  { id: "chem", label: "Химия" },
  { id: "it", label: "Информатика" },
  { id: "bio", label: "Биология" },
];

export const SUBJECT_TAG_CLASS = {
  math: "tag--math",
  phys: "tag--phys",
  chem: "tag--chem",
  it: "tag--it",
};

export const GRADES = [5, 6, 7, 8, 9, 10, 11, 12];

export function subjectLabel(id) {
  return SUBJECTS.find((s) => s.id === id)?.label ?? id;
}
