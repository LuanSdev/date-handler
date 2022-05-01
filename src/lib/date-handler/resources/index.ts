export * from './add-time';
export * from './sub-time';

export const resources = {
  add: import('./add-time'),
  sub: import('./sub-time'),
};
