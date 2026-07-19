// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import pipelineReducer from '../features/pipeline/pipelineSlice';

export const store = configureStore({
  reducer: {
    pipeline: pipelineReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // React Flow nodes and edges might contain non-serializable data/functions
    }),
});
