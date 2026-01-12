import '@testing-library/jest-dom'

// Polyfill IntersectionObserver for jsdom tests
class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}
;(global as any).IntersectionObserver = (global as any).IntersectionObserver || IntersectionObserver
