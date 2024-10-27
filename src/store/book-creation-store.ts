// src/stores/photoBook-store.ts
import { createStore } from "zustand/vanilla";

export type PhotoBookState = {
  photoBook: string[];
};

export type PhotoBookActions = {
  updatePhotoBooks: (newImages: string[]) => void; // Accepts new images as an argument
};

export type PhotoBookStore = PhotoBookState & PhotoBookActions;

// Initial state for the photo book
export const defaultInitState: PhotoBookState = {
  photoBook: [],
};

// Function to create the Zustand store
export const createPhotoBookStore = (
  initState: PhotoBookState = defaultInitState
) => {
  return createStore<PhotoBookStore>()((set) => ({
    ...initState,
    // Update the photo book with new images, replacing the previous state
    updatePhotoBooks: (newImages: string[]) => set({ photoBook: newImages }), // Directly set new images
  }));
};
