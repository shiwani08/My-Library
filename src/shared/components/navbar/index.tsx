"use client";

import React from "react";
import { Menu, Avatar } from "antd";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserOutlined } from "@ant-design/icons";
import UserDrawer from "@/app/profile-details/slider";

const items = [
  { key: "/", label: <Link href="/">Home</Link> },
  // { key: "/currently-reading", label: <Link href="/currently-reading">Currently Reading</Link> },
  // { key: "/have-read", label: <Link href="/have-read">Have Read</Link> },
  // { key: "/to-be-read", label: <Link href="/to-be-read">To Be Read</Link> },
  { key: "/wishlist", label: <Link href="/wishlist">Wishlist</Link> },
];

export default function Navbar() {
  const pathname = usePathname();

  const avatarSrc = "/booked-logo.png";
  const username = "Shiwani";
  const readingLevel = "Library Prefect";
  const [isSliderOpen, setIsSliderOpen] = React.useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#0e1a40] to-[#1a237e] shadow-md fixed w-full z-50 flex justify-between items-center px-6">
      {/* Logo */}
      <div className="flex items-center gap-3 py-2 shrink-0">
        <Image
          src={avatarSrc}
          alt="The Ravenclaw Library Logo"
          width={80}
          height={100}
          className="rounded-full"
        />
        <span className="text-xl text-[#c39439] font-semibold whitespace-nowrap">
          The Ravenclaw Library
        </span>
      </div>

      {/* Menu */}
      <div className="flex-1 flex justify-end min-w-0">
        <Menu
          mode="horizontal"
          items={items}
          selectedKeys={[pathname]}
          style={{ width: "100%", justifyContent: "right" }}
          overflowedIndicator={null}
        />
      </div>

      {/* User */}
      <Avatar
        src={avatarSrc}
        alt={username}
        size="large"
        icon={<UserOutlined />}
        onClick={() => setIsSliderOpen(true)}
      />

      <UserDrawer
        open={isSliderOpen}
        onClose={() => setIsSliderOpen(false)}
        avatarSrc={avatarSrc}
        username={username}
        readingLevel={readingLevel}
      />
    </nav>
  );
}
