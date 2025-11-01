import React from "react";
import Image from "next/image";

type BookCardProps = {
  title: string;
  author: string;
  status: string;
  image_url: string;
};

const statusColors: Record<BookCardProps["status"], string> = {
  "Currently Reading": "bg-[#1a237e] text-[#c39439]",
  Finished: "bg-[#0e1a40] text-[#bfa76f]",
  Wishlist: "bg-[#bfa76f] text-[#0e1a40]",
};

export default function BookCard({ title, author, status, image_url }: BookCardProps) {
  const statusStyle = statusColors[status] || "bg-gray-600 text-white";

  return (
    <div className="rounded-lg p-3 text-[#c39439] hover:-translate-y-1 transform transition-all duration-300 w-48 mx-auto flex flex-col items-center">
      
      {/* Book Image */}
      {image_url && (
        <div className="w-full h-64 overflow-hidden rounded-md">
          <Image
            src={image_url || "/booked-logo.png"}
            alt={title}
            width={200}
            height={300}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
      )}

      {/* Book Info */}
      <div className="text-center mt-3">
        <h3 className="text-lg font-semibold text-[#bfa76f] font-title leading-snug">
          {title}
        </h3>
        <p className="text-sm italic text-[#d4af37] mt-1">{author}</p>
      </div>

      {/* Status Badge */}
      <span
        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${statusStyle}`}
      >
        {status.replace("-", " ")}
      </span>
    </div>
  );
}

