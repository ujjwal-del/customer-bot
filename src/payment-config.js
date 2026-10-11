export function isConfiguredUpiId(value) {
  const upiId = String(value || "").trim();
  return /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+$/.test(upiId) && !/^YOUR[_-]/i.test(upiId);
}
