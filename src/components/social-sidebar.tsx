"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function SocialSidebar() {
  const socials = [
    { icon: Github, href: "https://github.com/ttjerry", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/jeremiah-egemonye-51457420a/",
      label: "LinkedIn",
    },
    { icon: Twitter, href: "https://x.com/_jerry0x", label: "Twitter" },
    {
      icon: Mail,
      href: "mailto:jeremiahegemonye.dev@gmail.com",
      label: "Email",
    },
  ];

  return (
    <div className="fixed left-8 bottom-8 z-50 hidden lg:block">
      <div className="flex flex-col items-center gap-6">
        {socials.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200"
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5" />
          </Link>
        ))}
        <div className="w-px h-24 bg-border"></div>
      </div>
    </div>
  );
}
