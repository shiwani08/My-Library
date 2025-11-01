"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Currently Reading", href: "/currently-reading" },
    { name: "Have Read", href: "/have-read" },
    { name: "To Be Read", href: "/to-be-read" },
    // { name: "Archive", href: "/archive" },
    // { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#0e1a40] to-[#1a237e] text-[#c39439] shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Image src="/booked-logo.png" alt="logo" width={80} height={115} />
        <Link
          href="/"
          className="text-2xl font-semibold tracking-wide font-title"
        >
          The Ravenclaw Library
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#d17558] transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#c39439] focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0e1a40] text-[#c39439] space-y-3 py-4 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block hover:text-[#bfa76f] transition-colors duration-200"
              onClick={() => setIsOpen(false)} // close menu on click
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
