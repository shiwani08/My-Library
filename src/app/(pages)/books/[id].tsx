import { useRouter } from "next/router";
import booksData from "../data/books.json";

export default function BookDetails() {
  const router = useRouter();
  const { id } = router.query;

  // Find the matching book
  const book = booksData.find(
    (b) => b.title.toLowerCase().replace(/\s+/g, "-") === id
  );

  if (!book)
    return (
      <div>
        <p>Book not found.</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-[#0e1a40] text-[#c39439] p-8">
      <div className="max-w-3xl mx-auto bg-[#1a237e]/20 p-6 rounded-xl shadow-md">
        <img
          src={book.image_url}
          alt={book.title}
          className="w-40 h-60 mx-auto mb-6 rounded-lg shadow-md"
        />
        <h1 className="text-3xl font-bold text-[#bfa76f] mb-2">{book.title}</h1>
        <div>
          <p className="text-lg italic text-[#d4af37] mb-4">by {book.author}</p>
          <p className="text-sm mb-4">{book.description}</p>
          <p className="text-sm text-gray-400">
            Genre: {book.genre} | Published: {book.year}
          </p>
        </div>
      </div>
    </main>
  );
}
