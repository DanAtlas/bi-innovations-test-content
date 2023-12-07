/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    '**/*.{ts?(x)?(x)}': () => ['npm run lint'],
    '**/*.ts?(x)': () => ['npm run typecheck'],
    '**/*.{ts?(x),?(s)css,md,json}': () => ['npm run format'],
  };