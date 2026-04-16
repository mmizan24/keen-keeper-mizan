"use client";

import React from "react";
import Image from "next/image";


export default function Footer() {
  return (
    <div className="flex w-auto flex-col justify-end">
      <footer className="bg-[#244d3f] w-full relative">
        <div className="flex flex-col w-full px-8 pt-16 pb-12 md:px-16 max-w-screen-2xl mx-auto">
          {/* Branding Section */}
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white leading-none">
              KeenKeeper
            </h1>
            <p className="text-sm md:text-base font-normal text-white/80 max-w-2xl leading-relaxed">
              Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
            </p>
          </div>

          {/* Social Section */}
          <div className="flex flex-col items-center space-y-4 mb-16">
            <span className="text-lg font-medium text-white">Social Links</span>
            <div className="flex gap-4">
              <a 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white transition-transform hover:scale-110" 
                href="#"
                aria-label="Instagram"
              >
                <Image src="/assets/instagram.png" alt="Instagram" width={30} height={30} />
              </a>
              <a 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white transition-transform hover:scale-110" 
                href="#"
                aria-label="Facebook"
              >
                <Image src="/assets/facebook.png" alt="Facebook" width={30} height={30} />
              </a>
              <a 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white transition-transform hover:scale-110" 
                href="#"
                aria-label="Twitter"
              >
                <Image src="/assets/twitter.png" alt="Twitter" width={30} height={30} />
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full pt-8 border-t border-white/10 gap-4">
            <div className="text-sm text-white/60">
              © {new Date().getFullYear()} KeenKeeper. All rights reserved.
            </div>
            <nav className="flex gap-x-8">
              <a className="text-sm text-white/60 hover:text-white transition-colors" href="#">Privacy Policy</a>
              <a className="text-sm text-white/60 hover:text-white transition-colors" href="#">Terms of Service</a>
              <a className="text-sm text-white/60 hover:text-white transition-colors" href="#">Cookies</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
