/* eslint-disable security/detect-object-injection */
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// This creates a fake localStorage in the Node/JSDOM environment
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

// Define it on the window object
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
