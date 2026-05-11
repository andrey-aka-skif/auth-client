let unauthorizedHandler = null

export function injectUnauthorizedHandler(handler) {
  unauthorizedHandler = handler
}

export function handleUnauthorized() {
  unauthorizedHandler?.()
}
