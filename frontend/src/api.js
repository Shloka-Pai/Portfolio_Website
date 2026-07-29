const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
  get: (path) => fetch(`${BASE}${path}`).then(r => r.json()),
};
