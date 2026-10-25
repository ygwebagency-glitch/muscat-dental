import { Link } from "react-router-dom";
import { BatteryFull, Clock, Mail, MapPin, Menu, Phone, Signal, UserRound, Wifi, X } from "lucide-react";
import { site } from "../data/siteConfig.js";
import { previewBackdrop } from "../data/images.js";
import TopBar from "../components/layout/TopBar.jsx";
import NavbarInner from "../components/layout/Navbar.jsx";
import { MegaPanel } from "../components/layout/MegaMenu.jsx";
import { MenuMain, MenuServices } from "../components/layout/MobileMenu.jsx";
import { WhatsAppButton } from "../components/layout/FloatingWhatsApp.jsx";
import { StickyBarButtons } from "../components/layout/MobileStickyBar.jsx";
import ScrollProgress from "../components/layout/ScrollProgress.jsx";
import Logo from "../components/ui/Logo.jsx";
import SmartImage from "../components/ui/SmartImage.jsx";
import { WhatsAppIcon } from "../components/ui/icons.jsx";

const Caption = ({ children }) => (
  <p className="mb-3 text-[13px] font-medium text-teal-800/70">{children}</p>
);

const Card = ({ className = "", children }) => (
  <div className={`relative overflow-hidden rounded-[26px] bg-white shadow-md2 ring-1 ring-line ${className}`}>{children}</div>
);

function PhoneFrame() {
  return (
    <div className="relative mx-auto flex h-[700px] w-[300px] flex-col overflow-hidden rounded-[38px] bg-white shadow-lg2 ring-1 ring-line">
      <div className="relative flex h-11 items-center justify-between bg-teal-800 px-6 text-[13px] font-semibold text-white">
        <ScrollProgress inline value={0.22} />
        <span>9:41</span>
        <span className="flex items-center gap-1.5">
          <Signal className="h-3.5 w-3.5" />
          <Wifi className="h-3.5 w-3.5" />
          <BatteryFull className="h-4 w-4" />
        </span>
      </div>
      <div className="flex h-16 shrink-0 items-center justify-between px-5 shadow-sm2">
        <Logo size="sm" asLink={false} />
        <Menu className="h-7 w-7 text-teal-800" strokeWidth={1.8} />
      </div>
      <div className="flex justify-end px-5 pt-3">
        <X className="h-6 w-6 text-ink" strokeWidth={1.8} />
      </div>
      <div className="min-h-0 flex-1">
        <MenuMain showLogo={false} activePath="/" />
      </div>
      <div className="mx-auto mb-2 h-1 w-28 shrink-0 rounded-full bg-teal-800" />
    </div>
  );
}

function KeyDetails() {
  const row = "flex items-start gap-4 py-2.5";
  const icon = "mt-0.5 h-5 w-5 shrink-0 text-teal-800";
  return (
    <Card className="p-7">
      <h3 className="text-[15px] font-bold text-teal-800">Key Details</h3>
      <ul className="mt-3 text-[14px] text-ink/80">
        <li className={row}><MapPin className={icon} /> {site.location}</li>
        <li className={row}><Clock className={icon} /> {site.timings}</li>
        <li className={row}><Phone className={icon} /> {site.phone}</li>
        <li className={row}><WhatsAppIcon className={icon} /> WhatsApp</li>
        <li className={row}><Mail className={icon} /> {site.email}</li>
        <li className={row}><MapPin className={icon} /> <span>11B Shaheena Avenue North,<br />Gulgasht, Multan, Pakistan 66000</span></li>
        <li className={row}>
          <UserRound className={icon} />
          <span>
            <span className="block font-bold text-teal-800">{site.doctor.name}</span>
            <span className="block text-[12.5px] text-muted">18+ years experience in<br />Muscat (Oman) and Pakistan</span>
          </span>
        </li>
      </ul>
      <div className="mt-5 flex items-center gap-3 text-muted">
        <span className="h-px flex-1 bg-line" />
        <span dir="rtl" lang="ur" className="text-[15px]" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>
          {site.urduLine}
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>
    </Card>
  );
}

export default function NavbarShowcase() {
  return (
    <div className="min-h-screen bg-[#EEF4F5] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-[1500px] space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-semibold text-teal-900">Navbar - Design Board</h1>
          <Link to="/" className="text-sm font-semibold text-teal-500 hover:underline">Open live site</Link>
        </div>

        {/* Row A: desktop (mega menu khula) + phone */}
        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <Caption>Desktop - Header with Services mega menu open (desktop layout ke liye screen 1024px+ honi chahiye)</Caption>
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-mint via-white to-mint shadow-lg2 ring-1 ring-line">
              <ScrollProgress inline value={0.16} />
              <TopBar force />
              <NavbarInner forceMegaOpen activePath="/" />
              <div className="relative h-[310px]">
                <SmartImage src={previewBackdrop} alt="" className="absolute inset-0 h-full w-full opacity-70" />
                <WhatsAppButton className="absolute bottom-8 right-24" />
              </div>
            </div>
          </div>
          <div>
            <Caption>Mobile - Navigation menu</Caption>
            <PhoneFrame />
          </div>
        </div>

        {/* Row B: sticky header + mega sample + key details */}
        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-8">
            <div>
              <Caption>Desktop - Sticky header (on scroll)</Caption>
              <Card className="rounded-2xl">
                <div className="relative h-2 bg-teal-800"><ScrollProgress inline value={0.18} /></div>
                <NavbarInner scrolled activePath="/" />
              </Card>
            </div>
            <div>
              <Caption>Desktop - Mega menu (Services)</Caption>
              <Card className="rounded-2xl p-3 pt-0">
                <div className="relative mb-3 h-2"><ScrollProgress inline value={0.18} /></div>
                <MegaPanel className="shadow-none ring-0" />
              </Card>
            </div>
          </div>
          <KeyDetails />
        </div>

        {/* Row C: mobile panels */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <Caption>Mobile - Navigation menu</Caption>
            <Card className="mx-auto h-[640px] max-w-[340px]">
              <MenuMain activePath="/" />
            </Card>
          </div>
          <div>
            <Caption>Mobile - Mega menu (Services)</Caption>
            <Card className="mx-auto h-[640px] max-w-[340px]">
              <MenuServices />
            </Card>
          </div>
          <div>
            <Caption>Mobile - Sticky bottom bar</Caption>
            <Card className="relative mx-auto h-[640px] max-w-[340px]">
              <SmartImage src={previewBackdrop} alt="" className="absolute inset-0 h-full w-full" />
              <WhatsAppButton className="absolute bottom-28 right-5" />
              <div className="absolute inset-x-0 bottom-0 bg-white/95 px-4 pb-3 pt-3 shadow-[0_-8px_24px_rgba(11,59,60,.12)]">
                <StickyBarButtons />
                <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-teal-800" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}