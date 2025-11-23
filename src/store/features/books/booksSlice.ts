import { API_BASE } from "@/constants/ApiConstants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";

export interface Book {
  _id: string;
  title: string;
  author: string;
  status: string;
  image_url?: string;
}

interface BooksState {
  list: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  list: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    console.log("API_BASE in thunk in the book slice file:", API_BASE);
    try {
      const response = await fetch(`${API_BASE}/get-books`);
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      console.log("API Response:", data);
      return data;
    } catch (error: any) {
      message.error("Failed to fetch books");
      return rejectWithValue(error.message);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (
    bookData: {
      title: string;
      author: string;
      status: string;
      image_url: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${API_BASE}/add-book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add book");
      }

      const data = await response.json();
      message.success("Book added successfully!");
      return data;
    } catch (error: any) {
      message.error("Failed to add book");
      return rejectWithValue(error.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (
    {
      bookId,
      bookData,
    }: {
      bookId: string;
      bookData: {
        title: string;
        author: string;
        status: string;
        image_url: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${API_BASE}/update-book/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update book");
      }

      const data = await response.json();
      message.success("Book updated successfully!");
      return data;
    } catch (error: any) {
      message.error("Failed to update book");
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/delete-book/${bookId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete book");

      message.success("Book deleted successfully!");
      return bookId;
    } catch (error: any) {
      message.error("Failed to delete book");
      return rejectWithValue(error.message);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Books
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add Book
    builder
      .addCase(addBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Book
    builder.addCase(updateBook.fulfilled, (state, action) => {
      const index = state.list.findIndex(
        (book) => book._id === action.payload._id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    });

    // Delete Book
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.list = state.list.filter((book) => book._id !== action.payload);
    });
  },
});

export const { clearError } = booksSlice.actions;
export default booksSlice.reducer;
