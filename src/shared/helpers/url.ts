export const buildQueryString = (params: Record<string, string | string[]>) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (!value) return

    if (Array.isArray(value)) {
      value.filter((v) => v?.trim()).forEach((v) => searchParams.append(key, v))
    } else {
      if (value.trim()) {
        searchParams.append(key, value)
      }
    }
  })

  const query = searchParams.toString()

  return query ? `?${query}` : ''
}
