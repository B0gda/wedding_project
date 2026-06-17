import '@testing-library/jest-dom/vitest';

Object.defineProperty(document, 'fonts', {
  value: {
    status: 'loaded',
    ready: Promise.resolve()
  },
  configurable: true
});

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: true,
    media: '',
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false
  }),
  configurable: true
});

class IntersectionObserverMock {
  observe() {
    return undefined;
  }

  unobserve() {
    return undefined;
  }

  disconnect() {
    return undefined;
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  value: IntersectionObserverMock,
  configurable: true
});

Object.defineProperty(globalThis, 'IntersectionObserver', {
  value: IntersectionObserverMock,
  configurable: true
});
