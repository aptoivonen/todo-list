export default function formatrfc3339date(date) {
  const yearString = String(date.getFullYear());
  const monthString = String(date.getMonth() + 1).padStart(2, "0");
  const dateString = String(date.getDate()).padStart(2, "0");
  return `${yearString}-${monthString}-${dateString}`;
}
