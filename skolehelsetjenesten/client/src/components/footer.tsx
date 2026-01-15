import { Link } from "wouter";
import { Heart, Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { SiFacebook, SiInstagram } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-semibold">Hamar</span>
                <span className="text-sm block -mt-1 opacity-80">katedralskole</span>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Skolehelsetjenesten er her for deg. Vi hjelper med psykisk helse, fysisk helse, seksualitet og testing.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Hurtiglenker</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-home">
                  Hjem
                </Link>
              </li>
              <li>
                <Link href="/tjenester" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-services">
                  Tjenester
                </Link>
              </li>
              <li>
                <Link href="/faq" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-faq">
                  FAQ & Ressurser
                </Link>
              </li>
              <li>
                <Link href="/bestill-time" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-booking">
                  Book time
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kontakt oss</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 opacity-70" />
                <span className="opacity-80">62 54 42 00</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 opacity-70" />
                <a href="mailto:post@hamar-katedral.vgs.no" className="opacity-80 hover:opacity-100 transition-opacity">
                  Send e-post
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 opacity-70 mt-0.5" />
                <div className="opacity-80">
                  <p>Ringgata 235</p>
                  <p>2315 Hamar</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Nødressurser</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.telefonforliv.no/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                  Telefon for livet <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://www.mentalhelse.no/fa-hjelp/hjelpetelefonen" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                  Mental Helses hjelpetelefon <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://www.ung.no/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                  Ung.no <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" data-testid="link-facebook">
              <SiFacebook className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity" data-testid="link-instagram">
              <SiInstagram className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm opacity-70">
            Innlandet fylkeskommune
          </p>
        </div>
      </div>
    </footer>
  );
}
