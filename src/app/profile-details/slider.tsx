"use client";
import { Drawer, Avatar } from "antd";
import { useEffect } from "react";

export default function UserDrawer({
  open,
  onClose,
  avatarSrc,
  username,
}: {
  open: boolean;
  onClose: () => void;
  avatarSrc: string;
  username: string;
  readingLevel:string;
}) {
  const userDetails = {
    User: username,
    "Books owned": 8745,
    "Books read": 7521,
    "Favorite Book": "Harry Potter and the Prisoner of Azkaban",
    "Reading Level": "Library Prefect"
  };

  useEffect(() => {
    if (open) {
      console.log("Avatar clicked — opening user drawer!");
    }
  }, [open]);

  return (
    <Drawer
      title="User Details"
      placement="right"
      onClose={onClose}
      open={open}
    >
      <Avatar
        src={avatarSrc}
        size={100}
        style={{
          marginBottom: "1rem",
          border: "2px solid #c39439",
          boxShadow: "0 0 10px rgba(195, 148, 57, 0.5)",
        }}
      />
      <div className="user-details">
        {Object.entries(userDetails).map(([label, value]) => (
          <p key={label}>
            <strong>{label}:</strong> {value}
          </p>
        ))}
      </div>
    </Drawer>
  );
}
