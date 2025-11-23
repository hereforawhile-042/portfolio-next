import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                J
              </div>
              <span className="text-lg font-bold">Jeremiah Egemonye</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer crafting digital experiences with passion and
              precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex items-center space-x-4">
              <Link
                href="https://github.com/ttjerry"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/jeremiah-egemonye-51457420a/"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:jeremiahegemonye.dev@gmail.com"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" />{" "}
            using Next.js & Tailwind CSS
          </p>
          <p>
            © {new Date().getFullYear()} Jeremiah Egemonye. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
