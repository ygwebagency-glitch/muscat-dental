export const site = {
  name: "Muscat Dental Clinics",
  location: "Gulgasht, Multan",
  timings: "Mon-Sat [ADD TIMINGS]",
  phone: "+92 300 7874031",
  phoneHref: "tel:+923007874031",
  whatsappHref:
    "https://wa.me/923007874031?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment.",
  email: "dr.siddiquesattar@gmail.com",
  address: "11B Shaheena Avenue North, Gulgasht, Multan, Pakistan 66000",
  doctor: {
    name: "Dr. Siddique Sattar",
    line: "18+ years experience in Muscat (Oman) and Pakistan",
  },
  urduLine: "آپ کی مسکراہٹ — ہماری ترجیح",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services", mega: true },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

// Order matters: the mega menu fills 3 columns x 3 rows, column by column.
export const services = [
  { slug: "general-dentistry", name: "General Dentistry" },
  { slug: "cosmetic-dentistry", name: "Cosmetic Dentistry" },
  { slug: "scaling-polishing", name: "Scaling & Polishing" },
  { slug: "dental-implants", name: "Dental Implants" },
  { slug: "root-canal-treatment", name: "Root Canal Treatment" },
  { slug: "pediatric-dentistry", name: "Pediatric Dentistry" },
  { slug: "orthodontics-braces", name: "Orthodontics & Braces" },
  { slug: "crowns-bridges", name: "Crowns & Bridges" },
  { slug: "tooth-extraction", name: "Tooth Extraction" },
];