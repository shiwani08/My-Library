import React from "react";

type BookCardProps = {
  title: string;
  author: string;
  status: string;
};

const statusColors: Record<BookCardProps["status"], string> = {
  "Currently Reading": "bg-[#1a237e] text-[#c39439]",
  Finished: "bg-[#0e1a40] text-[#bfa76f]",
  Wishlist: "bg-[#bfa76f] text-[#0e1a40]",
};

export default function BookCard({ title, author, status }: BookCardProps) {
  const statusStyle = statusColors[status];

  return (
    <div className="bg-[#0e1a40] border border-[#1a237e] rounded-lg p-4 text-[#c39439] shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 w-48 h-72 mx-auto flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-[#bfa76f] font-title leading-snug">
          {title}
        </h3>
        <p className="text-sm italic text-[#d4af37] mt-1">by {author}</p>
      </div>

      <span
        className={`inline-block self-start mt-auto px-3 py-1 rounded-full text-xs font-medium ${statusStyle}`}
      >
        {status}
      </span>
    </div>
  );
}
