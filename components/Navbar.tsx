"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("book-project");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-black/60 backdrop-blur-xl border-zinc-800/50 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Branding Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/Rigzy Logo with Text.png"
            alt="Rigzy Logo"
            width={140}
            height={38}
            className="h-9 w-auto object-contain transition-transform duration-300 hover:scale-105"
            priority
          />
        </Link>

        {/* Navigation Items (Links matching structural page areas) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a
            href="#details"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("details")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-white transition-colors duration-300"
          >
            Details
          </a>
          <a
            href="#workflow"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-white transition-colors duration-300"
          >
            Workflow
          </a>
          <a
            href="#book-project"
            onClick={handleBookScroll}
            className="hover:text-white transition-colors duration-300"
          >
            Pricing
          </a>
        </div>

        {/* Action Button */}
        <a
          href="#book-project"
          onClick={handleBookScroll}
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold text-white rounded-full group bg-gradient-to-br from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 focus:ring-2 focus:outline-none focus:ring-violet-800 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.2)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-zinc-950 rounded-full group-hover:bg-opacity-0">
            Book Project
          </span>
        </a>
      </div>
    </nav>
  );
}
