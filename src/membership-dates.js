const PLAN_MONTHS = {
  Monthly: 1,
  Quarterly: 3,
  "Half Year": 6,
  Yearly: 12,
};

export function getExpiryDate(joiningDate, plan) {
  const months = PLAN_MONTHS[String(plan || "").trim()];
  if (!months || !/^\d{4}-\d{2}-\d{2}$/.test(String(joiningDate || ""))) {
    return "";
  }

  const source = new Date(`${joiningDate}T00:00:00.000Z`);
  if (Number.isNaN(source.getTime()) || source.toISOString().slice(0, 10) !== joiningDate) {
    return "";
  }

  const targetMonth = source.getUTCFullYear() * 12 + source.getUTCMonth() + months;
  const year = Math.floor(targetMonth / 12);
  const month = targetMonth % 12;
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const day = Math.min(source.getUTCDate(), lastDay);

  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
