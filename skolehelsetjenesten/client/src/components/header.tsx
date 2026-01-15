import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import logoImage from "@assets/hamar-katedralskole-dark-text_1768229263048.png";

const navItems = [
  { href: "/", label: "Hjem" },
  { href: "/tjenester", label: "Tjenester" },
  { href: "/faq", label: "FAQ & Ressurser" },
  { href: "/passordstrategi", label: "Passordstrategi" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center" data-testid="link-logo">
          <img 
            src={logoImage} 
            alt="Hamar katedralskole" 
            className="h-10 sm:h-12 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={location === item.href ? "secondary" : "ghost"}
                className="text-sm"
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/logg-inn" className="hidden sm:block">
            <Button variant="ghost" size="icon" data-testid="button-login-header">
              <LogIn className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/bestill-time" className="hidden sm:block">
            <Button data-testid="button-book-appointment-header">
              Book time
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container mx-auto flex flex-col px-4 py-4 gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <Link href="/logg-inn">
              <Button variant="outline" className="w-full mt-2" onClick={() => setMobileMenuOpen(false)} data-testid="button-login-mobile">
                <LogIn className="h-4 w-4 mr-2" />
                Logg inn (ansatt)
              </Button>
            </Link>
            <Link href="/bestill-time">
              <Button className="w-full mt-2" onClick={() => setMobileMenuOpen(false)} data-testid="button-book-appointment-mobile">
                Book time
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
