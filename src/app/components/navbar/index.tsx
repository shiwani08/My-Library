"use client";
import React, { useState } from "react";
import { Menu } from "antd";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserDrawer from "@/app/profile-details/slider";

const items = [
  {
    key: "home",
    label: <Link href="/">Home</Link>,
  },
  {
    key: "currently-reading",
    label: <Link href="/currently-reading">Currently Reading</Link>,
  },
  {
    key: "have-read",
    label: <Link href="/have-read">Have Read</Link>,
  },
  {
    key: "to-be-read",
    label: <Link href="/to-be-read">To Be Read</Link>,
  },
];

export default function Navbar() {
  const [current, setCurrent] = useState("home");
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const onClick = (e: any) => {
    setCurrent(e.key);
  };

  const handleSliderOpen = () => {
    console.log("Avatar clicked");
    setIsSliderOpen(true);
  };

  const handleSliderClose = () => setIsSliderOpen(false);

  return (
    <nav className="bg-gradient-to-r from-[#0e1a40] to-[#1a237e] shadow-md fixed w-full z-50 flex justify-between items-center px-6">
      {/* Logo */}
      <div className="flex items-center gap-3 py-2 shrink-0">
        <Image
          src="/booked-logo.png"
          alt="The Ravenclaw Library Logo"
          width={80}
          height={100}
          className="rounded-full"
        />
        <span className="text-xl text-[#c39439] font-semibold whitespace-nowrap">
          The Ravenclaw Library
        </span>
      </div>

      {/* Ant Design Menu */}
      <div className="flex-1 flex justify-end min-w-0">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          style={{ width: "100%", justifyContent: "right" }}
          items={items}
          overflowedIndicator={null}
          // className="bg-transparent flex justify-end flex-wrap"
        />
      </div>
      <div className="user-icon">
        <Avatar size="large" icon={<UserOutlined />} onClick={handleSliderOpen}/>
        <UserDrawer open={isSliderOpen} onClose={handleSliderClose} />
      </div>
    </nav>
  );
}
