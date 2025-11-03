import React from "react";
import Image from "next/image";
import { Card, Tag } from "antd";

type BookCardProps = {
  title: string;
  author: string;
  status: string;
  image_url: string;
};

const statusColors: Record<BookCardProps["status"], string> = {
  "currently-reading": "geekblue",
  "have-read": "green",
  "to-be-read": "gold",
};

export default function BookCard({
  title,
  author,
  status,
  image_url,
}: BookCardProps) {
  const color = statusColors[status] || "default";

  return (
    <Card
      hoverable
      className="book-card"
      cover={
        <div className="book-card-cover">
          <Image unoptimized
            src={image_url || "/booked-logo.png"}
            alt={title}
            width={200}
            height={250}
            className="book-card-image"
          />
        </div>
      }
    >
      <Card.Meta
        title={<span className="book-card-title">{title}</span>}
        description={<span className="book-card-author">{author}</span>}
      />

      <div className="book-card-status">
        <Tag color={color} className="book-card-tag">
          {status.replace("-", " ")}
        </Tag>
      </div>
    </Card>
  );
}
