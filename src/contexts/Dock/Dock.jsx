import { create } from "zustand";

export const useDockStore = create(set => ({
	mousePosX: null,
	setMousePosX: pos => set({ mousePosX: pos }),
}));
