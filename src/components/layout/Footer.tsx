"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Brand/Name */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">Jeremiah Egemonye</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Frontend and Mobile Developer crafting digital experiences with
              passion and precision.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/ttjerry"
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/jeremiah-egemonye-51457420a/"
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/_jerry0x"
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:jeremiahegemonye.dev@gmail.com"
              className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t w-full text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Jeremiah Egemonye. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
