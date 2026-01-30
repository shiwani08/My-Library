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
    <nav className="bg-gradient-to-r from-[#0e1a40] to-[#1a237e] shadow-md fixed w-full z-50 flex justify-between items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 md:px-6">
      {/* Logo */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 py-1 shrink-0 min-w-0">
        <Image
          src={avatarSrc}
          alt="The Ravenclaw Library Logo"
          width={80}
          height={80}
          className="rounded-full w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-20 lg:w-20 lg:h-[100px] object-cover"
        />
        <span className="text-[#c39439] font-semibold truncate text-sm sm:text-base md:text-xl">
          The Ravenclaw Library
        </span>
      </div>

      {/* Menu */}
      <div className="flex-1 flex justify-end min-w-0 overflow-hidden">
        <Menu
          mode="horizontal"
          items={items}
          selectedKeys={[pathname]}
          className="!border-0 !bg-transparent min-w-0 w-full [&_.ant-menu-item]:!px-2 sm:[&_.ant-menu-item]:!px-3 md:[&_.ant-menu-item]:!px-4 text-xs sm:text-sm md:text-base"
          style={{ justifyContent: "flex-end" }}
        />
      </div>

      {/* User */}
      <Avatar
        src={avatarSrc}
        alt={username}
        size="default"
        icon={<UserOutlined />}
        onClick={() => setIsSliderOpen(true)}
        className="shrink-0 !w-8 !h-8 sm:!w-9 sm:!h-9 md:!w-10 md:!h-10 lg:!w-12 lg:!h-12"
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
