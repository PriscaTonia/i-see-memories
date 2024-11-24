// src/store/index.ts
import { createPhotoBookStore } from "./book-creation-store";
import { createUserStore } from "./user-store";

// Create the store instance
export const photoBookStore = createPhotoBookStore();
export const userStore = createUserStore();
