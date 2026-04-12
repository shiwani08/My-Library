import { useBooks } from "@/context/BookContext";
import { useMemo } from "react";

export const useBookStats = () => {
  const { books } = useBooks();

  const stats = useMemo(() => {
    const totalBooks = books.length;
    const booksRead = books.filter(book => book.status === "have-read").length;
    const currentlyReading = books.filter(book => book.status === "currently-reading").length;
    const toBeRead = books.filter(book => book.status === "to-be-read").length;

    const getReadingLevel = (count: number) => {
      if (count >= 100) return "Library Prefect";
      if (count >= 50) return "Bookworm";
      if (count >= 20) return "Avid Reader";
      if (count >= 5) return "Reader";
      return "Beginner";
    };

    return {
      totalBooks,
      booksRead,
      currentlyReading,
      toBeRead,
      readingLevel: getReadingLevel(booksRead),
      favoriteBook: books[0]?.title || "Not set",
    };
  }, [books]);

  return stats;
};