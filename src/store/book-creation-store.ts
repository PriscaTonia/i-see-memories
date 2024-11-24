// src/stores/photoBook-store.ts
import { createStore } from "zustand/vanilla";

export type PhotoBookState = {
  photoBook: File[];
  quantity: number;
  productId: string;
  template: {
    fullCoverUrl: string;
    frontCoverUrl: string;
  };
};

export type PhotoBookActions = {
  updatePhotoBooks: (newImages: File[]) => void; // Accepts new images as an argument
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  setProductId: (id: string) => void;
  setTemplateId: ({
    fullCoverUrl,
    frontCoverUrl,
  }: {
    fullCoverUrl: string;
    frontCoverUrl: string;
  }) => void;
};

export type PhotoBookStore = PhotoBookState & PhotoBookActions;

// Initial state for the photo book
export const defaultInitState: PhotoBookState = {
  photoBook: [],
  quantity: 1,
  productId: "",
  template: {
    fullCoverUrl: "",
    frontCoverUrl: "",
  },
};

// Function to create the Zustand store
export const createPhotoBookStore = (
  initState: PhotoBookState = defaultInitState
) => {
  return createStore<PhotoBookStore>()((set) => ({
    ...initState,
    // Update the photo book with new images, replacing the previous state
    updatePhotoBooks: (newImages: File[]) => set({ photoBook: newImages }), // Directly set new images

    // Increment the orderNo by 1
    incrementQuantity: () => set((state) => ({ quantity: state.quantity + 1 })),

    // Decrement the orderNo by 1
    decrementQuantity: () => set((state) => ({ quantity: state.quantity - 1 })),

    // set product id and template object
    setProductId: (id: string) => set((state) => ({ ...state, productId: id })),
    setTemplateId: ({ fullCoverUrl, frontCoverUrl }) =>
      set((state) => ({
        ...state,
        template: { fullCoverUrl, frontCoverUrl },
      })),
  }));
};
