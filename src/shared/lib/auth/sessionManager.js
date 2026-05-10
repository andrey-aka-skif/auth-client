export function createSessionManager({ storage, refreshFn }) {
  let refreshPromise = null

  async function refresh() {
    if (!refreshPromise) {
      refreshPromise = refreshFn().finally(() => {
        refreshPromise = null
      })
    }

    return refreshPromise
  }

  return {
    refresh,
    getAccessToken: storage.getAccessToken,
    clear: storage.clear,
  }
}
