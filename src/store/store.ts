import { configureStore } from '@reduxjs/toolkit'
import booksSlice from './features/books/booksSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        books: booksSlice
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']