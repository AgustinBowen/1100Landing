export function formatDate(date: Date | string, locale: string = "es-AR") {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  }).format(typeof date === "string" ? new Date(date) : date);
}
