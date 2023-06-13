interface Window {
  gtag: (...args: any[]) => void
  dataLayer: Record<string, any>
  ic: {
    plug: {
      requestConnect: () => Promise<any>
      principalId: string
    }
  }
}
