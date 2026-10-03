import { getUser } from "./users";

export const POSTS = [
  {
    slug: "kvadratni-uravnenia",
    title: "Квадратни уравнения за 3 минути: пълно ръководство",
    excerpt: "Дискриминанта, формули на Виет и кога изобщо не ти трябват.",
    description:
      "Всичко, което трябва да знаеш за квадратните уравнения – от дискриминантата до формулите на Виет, с решени примери и чести грешки.",
    category: "Математика",
    cover: "math",
    symbol: "x²",
    authorId: "elena",
    date: "12 септ. 2026",
    readTime: 6,
    featured: true,
  },
  {
    slug: "greshki-nvo",
    title: "10 грешки, които струват точки на НВО",
    shortTitle: "10 грешки на НВО",
    excerpt: "Най-честите пропуски от миналогодишните изпити и как да ги избегнеш.",
    category: "Изпити",
    cover: "exam",
    symbol: "✎",
    authorName: "Георги Т.",
    readTime: 8,
  },
  {
    slug: "zakoni-na-nyuton",
    title: "Законите на Нютон с примери от ежедневието",
    shortTitle: "Законите на Нютон",
    excerpt: "Защо колата те „дърпа“ назад при потегляне и какво общо има това с F = m·a.",
    category: "Физика",
    cover: "phys",
    symbol: "⚛",
    authorName: "Мария П.",
    readTime: 5,
  },
  {
    slug: "snimka-na-zadacha",
    title: "Как да снимаш задача, за да получиш решение по-бързо",
    excerpt: "Светлина, ъгъл и какво да напишеш в описанието.",
    category: "Съвети за учене",
    cover: "tips",
    symbol: "💡",
    authorName: "Екипът на Задачник",
    readTime: 3,
  },
  {
    slug: "himichni-uravnenia",
    title: "Изравняване на химични уравнения стъпка по стъпка",
    excerpt: "Методът, с който никога повече няма да се чудиш откъде да започнеш.",
    category: "Химия",
    cover: "chem",
    symbol: "⚗",
    authorName: "Димитър С.",
    readTime: 7,
  },
  {
    slug: "python-zadachi",
    title: "Първите ти 5 задачи на Python",
    excerpt: "Цикли, условия и списъци – обяснени така, че да останат.",
    category: "Информатика",
    cover: "it",
    symbol: "</>",
    authorName: "Иван Г.",
    readTime: 6,
  },
  {
    slug: "polezni-reshenia",
    title: "Как да пишеш решения, които наистина помагат",
    excerpt: "Обяснявай, не само давай отговор – и събирай повече точки.",
    category: "Общност",
    cover: "community",
    symbol: "🤝",
    authorName: "Екипът на Задачник",
    readTime: 4,
  },
];

export const HOME_POST_SLUGS = ["kvadratni-uravnenia", "greshki-nvo", "snimka-na-zadacha"];

export const BLOG_CATEGORIES = [
  "Всички",
  "Математика",
  "Физика",
  "Химия",
  "Изпити",
  "Съвети за учене",
  "Общност",
];

export const ARTICLE_SECTIONS = [
  { id: "sec-what", title: "Какво е квадратно уравнение" },
  { id: "sec-discriminant", title: "Дискриминанта" },
  { id: "sec-example", title: "Решен пример" },
  { id: "sec-practice", title: "Упражни се" },
];

export function getPost(slug) {
  return POSTS.find((p) => p.slug === slug);
}

export function postAuthor(post) {
  return post.authorId ? getUser(post.authorId) : { name: post.authorName };
}
