export function getQueryStringValue(key: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

export function setQueryStringValue(key: string, value: string) {
  const params = new URLSearchParams(window.location.search);
  params.set(key, value);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}
