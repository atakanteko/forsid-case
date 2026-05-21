export const buildQueryString = (params: Record<string, string | string[]>) => {
  const query = []

  for (const key in params) {
    const value = params[key]

    if (Array.isArray(value)) {
      value.forEach((val) => {
        query.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
      })
    } else {
      query.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  }

  return query.length ? `?${query.join("&")}` : ""
}
