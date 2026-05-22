export function normalizeInteger(value: unknown): number | null {
  if (value === '' || value === null || value === undefined) {
    return null
  }

  const parsed = typeof value === 'number' ? value : Number(String(value).trim())

  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
    return null
  }

  return parsed
}
