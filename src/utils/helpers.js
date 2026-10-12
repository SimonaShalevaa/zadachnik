export function getInitials(fullName) {
  return fullName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function cleanTags(text) {
  const result = [];

  text.split(",").forEach((tag) => {
    const clean = tag.trim().toLowerCase();
    if (clean && !result.includes(clean)) {
      result.push(clean);
    }
  });

  return result.slice(0, 5).join(", ");
}
