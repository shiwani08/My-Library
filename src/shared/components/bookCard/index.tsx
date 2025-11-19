import React from "react";
import Image from "next/image";
import { Card, Tag, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

type BookCardProps = {
  _id: string;  // Add this
  title: string;
  author: string;
  status: string;
  image_url: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

const statusColors: Record<string, string> = {
  "currently-reading": "geekblue",
  "have-read": "green",
  "to-be-read": "gold",
};

export default function BookCard({
  _id,
  title,
  author,
  status,
  image_url,
  onEdit,
  onDelete,
}: BookCardProps) {
  const color = statusColors[status] || "default";

  return (
    <Card
      hoverable
      className="book-card"
      cover={
        <div className="book-card-cover">
          <Space className="book-card-actions">
            <Button 
              className="book-card-edit-button"
              type="text"
              icon={<EditOutlined />}
              onClick={onEdit}
              size="small"
            />
            <Popconfirm
              title="Delete this book?"
              description="Are you sure you want to delete this book?"
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button 
                className="book-card-delete-button"
                type="text"
                danger
                icon={<DeleteOutlined />}
                size="small"
              />
            </Popconfirm>
          </Space>
          {/* <Image unoptimized
            src={image_url || "/booked-logo.png"}
            alt={title}
            width={200}
            height={250}
            className="book-card-image"
          /> */}
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