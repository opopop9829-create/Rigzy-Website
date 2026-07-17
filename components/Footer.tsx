"use client";

import { useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center">
            <Image
              src="/Rigzy Logo with Text.png"
              alt="Rigzy Logo"
              width={120}
              height={32}
              className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
            Crafting premium cinematic editing experiences. Designed with rhythm, emotion, and technical precision to make stories unforgettable.
          </p>
          <div className="flex items-center gap-4 pt-2">
            {/* Social Icons */}
            {["instagram", "vimeo", "youtube", "twitter"].map((social) => (
              <a
                key={social}
                href={`https://${social}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-zinc-900 hover:bg-violet-600 rounded-full flex items-center justify-center text-zinc-500 hover:text-white transition-all duration-300 capitalize text-xs"
              >
                {social[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Portfolio Column */}
        <div>
          <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">Portfolio</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li>
              <a href="#commercial" className="hover:text-violet-400 transition-colors">Commercial Edits</a>
            </li>
            <li>
              <a href="#brand-film" className="hover:text-violet-400 transition-colors">Brand Identity Films</a>
            </li>
            <li>
              <a href="#reels" className="hover:text-violet-400 transition-colors">Social Media Reels</a>
            </li>
            <li>
              <a href="#" className="hover:text-violet-400 transition-colors">Personal Work</a>
            </li>
          </ul>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li>
              <span className="hover:text-violet-400 transition-colors cursor-default">Cinematic Editing</span>
            </li>
            <li>
              <span className="hover:text-violet-400 transition-colors cursor-default">Precision Color Grading</span>
            </li>
            <li>
              <span className="hover:text-violet-400 transition-colors cursor-default">Advanced Motion Graphics</span>
            </li>
            <li>
              <span className="hover:text-violet-400 transition-colors cursor-default">Immersive Sound Design</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">Newsletter</h4>
          <p className="text-zinc-500 text-xs leading-relaxed">
            Subscribe to get filmmaking insights, editing updates, and creative tips.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 focus:border-violet-600 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none w-full transition-colors"
            />
            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-500 text-white rounded-lg px-4 py-2 text-xs font-semibold transition-colors shrink-0"
            >
              Sign Up
            </button>
          </form>
          {subscribed && (
            <p className="text-violet-400 text-xs font-mono animate-fade-in">
              Successfully subscribed!
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-zinc-900/60 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-600">
        <div>&copy; {new Date().getFullYear()} Rigzy. All rights reserved.</div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
