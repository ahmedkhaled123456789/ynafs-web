// breadcrumbStore.ts
import { create } from "zustand";

/**
 * @typedef {Object} BreadcrumbItem
 * @property {string} label
 * @property {string} [_id]
 * @property {string} [to]
 */

/**
 * @typedef {Object} BreadcrumbState
 * @property {BreadcrumbItem[]} path
 * @property {(path: BreadcrumbItem[]) => void} setPath
 * @property {(item: BreadcrumbItem) => void} push
 * @property {() => void} pop
 * @property {() => void} clear
 */

export const useBreadcrumbStore = create((set) => ({
  path: [],
  setPath: (path) => set({ path }),
  push: (item) =>
    set((state) => {
      console.log({ state });
      return { path: [...state.path, item] };
    }),
  pop: () => set((state) => ({ path: state.path.slice(0, -1) })),
  clear: () => set({ path: [] }),
}));
