export const USERS = [
  { id: "elena", name: "Елена К.", initials: "ЕК", grade: 11, points: 1240, alt: true, bio: "Обича алгебрата и да обяснява с примери." },
  { id: "maria", name: "Мария П.", initials: "МП", grade: 10, points: 980 },
  { id: "georgi", name: "Георги Т.", initials: "ГТ", grade: 12, points: 870 },
  { id: "dimitar", name: "Димитър С.", initials: "ДС", grade: 9, points: 320 },
  { id: "ivan", name: "Иван Г.", initials: "ИГ", grade: 8, points: 140 },
];

export function getUser(id) {
  return USERS.find((u) => u.id === id);
}

export const CURRENT_USER = {
  id: "maria",
  name: "Мария П.",
  fullName: "Мария Петрова",
  initials: "МП",
  grade: 10,
  school: "СМГ „Паисий Хилендарски“",
  badges: ["🏅 Математик", "🔥 7 дни поред", "🤝 50 решения"],
  stats: { points: 980, solutions: 52, tasks: 12 },
};
