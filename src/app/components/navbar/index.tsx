"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#0e1a40] to-[#1a237e] text-[#c39439] shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-semibold tracking-wide font-title">
          The Ravenclaw Library
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/pages/all" className="hover:text-[#bfa76f] transition-colors duration-200">Home</Link>
          <Link href="/pages/currently-reading" className="hover:text-[#d17558] transition-colors duration-200">Currently Reading</Link>
          <Link href="/pages/have-read" className="hover:text-[#d17558] transition-colors duration-200">Have Read</Link>
          <Link href="/pages/to-be-read" className="hover:text-[#d17558] transition-colors duration-200">To Be Read</Link>
          {/* <Link href="/archive" className="hover:text-[#bfa76f] transition-colors duration-200">Archive</Link>
          <Link href="/contact" className="hover:text-[#bfa76f] transition-colors duration-200">Contact</Link> */}
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
          <Link href="/pages/all" className="block hover:text-[#bfa76f]">Home</Link>
          <Link href="/pages/currently-reading" className="block hover:text-[#bfa76f]">Currently Reading</Link>
          <Link href="/pages/have-read" className="block hover:text-[#bfa76f]">Have Read</Link>
        <Link href="/pages/to-be-read" className="block hover:text-[#bfa76f]">To Be Read</Link>
          {/* <Link href="/archive" className="block hover:text-[#bfa76f]">Archive</Link>
          <Link href="/contact" className="block hover:text-[#bfa76f]">Contact</Link> */}
        </div>
      )}
    </nav>
  );
}
