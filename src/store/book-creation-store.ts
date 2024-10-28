// src/stores/photoBook-store.ts
import { createStore } from "zustand/vanilla";

export type PhotoBookState = {
  photoBook: string[];
  orderNo: number;
};

export type PhotoBookActions = {
  updatePhotoBooks: (newImages: string[]) => void; // Accepts new images as an argument
  incrementOrderNo: () => void;
  decrementOrderNo: () => void;
};

export type PhotoBookStore = PhotoBookState & PhotoBookActions;

// Initial state for the photo book
export const defaultInitState: PhotoBookState = {
  photoBook: [],
  orderNo: 0,
};

// Function to create the Zustand store
export const createPhotoBookStore = (
  initState: PhotoBookState = defaultInitState
) => {
  return createStore<PhotoBookStore>()((set) => ({
    ...initState,
    // Update the photo book with new images, replacing the previous state
    updatePhotoBooks: (newImages: string[]) => set({ photoBook: newImages }), // Directly set new images

    // Increment the orderNo by 1
    incrementOrderNo: () => set((state) => ({ orderNo: state.orderNo + 1 })),

    // Decrement the orderNo by 1
    decrementOrderNo: () => set((state) => ({ orderNo: state.orderNo - 1 })),
  }));
};
