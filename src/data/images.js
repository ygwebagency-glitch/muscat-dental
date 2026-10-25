// Saari images ki list yahin hai. File na mile to placeholder tile dikhta hai.
// Baad mein asli image lagane ke liye: same naam ki file public/images/services/ mein
// rakh dein, ya neeche kisi entry ko full URL ("https://...") se badal dein.
// Thumbnail size: 160 x 160 px (square), jpg/webp.
const s = (name) => `/images/services/${name}.jpg`;

export const serviceImages = {
  "general-dentistry": s("general-dentistry"),
  "cosmetic-dentistry": s("cosmetic-dentistry"),
  "scaling-polishing": s("scaling-polishing"),
  "dental-implants": s("dental-implants"),
  "root-canal-treatment": s("root-canal-treatment"),
  "pediatric-dentistry": s("pediatric-dentistry"),
  "orthodontics-braces": s("orthodontics-braces"),
  "crowns-bridges": s("crowns-bridges"),
  "tooth-extraction": s("tooth-extraction"),
};

// Sirf design board (/navbar-preview) mein use hoti hai. 1200 x 700 px.
export const previewBackdrop = "/images/preview-backdrop.jpg";

// Hero photo: 1400 x 1200 px, jpg/webp, dentist (left) + smiling patient (right).
export const heroImage = "/images/hero/hero-dentist-patient.jpg";

// Highlight cards (3 photos): har ek 1200 x 600 px (2:1), jpg/webp.

export const highlightImages = {
  dentists: "/images/highlights/experienced-dentists.jpg",
  appointments: "/images/highlights/easy-appointments.jpg",
  technology: "/images/highlights/advanced-technology.jpg",
};


// About section: portrait 1000 x 1170 px, consultation photo 800 x 760 px (jpg/webp).
export const aboutImages = {
  main: "/images/about/dr-siddique-portrait.jpg",
  secondary: "/images/about/dr-siddique-consultation.jpg",
};


// Why Choose Us photo: 1400 x 1460 px, jpg/webp (ratio 0.96 : 1).
export const whyImage = "/images/why/why-choose-us.jpg";
// How it works (4 photos): har ek 1012 x 744 px, jpg
export const processImages = {
  book: "/images/process/step-1-book-appointment.jpg",
  consult: "/images/process/step-2-consultation.jpg",
  plan: "/images/process/step-3-treatment-plan.jpg",
  smile: "/images/process/step-4-healthy-smile.jpg",
};

// Smile gallery preview: before/after 1760 x 896 px, case thumbnails 612 x 360 px (jpg)
export const galleryImages = {
  before: "/images/gallery/before.jpg",
  after: "/images/gallery/after.jpg",
  cosmetic: "/images/gallery/case-cosmetic.jpg",
  ortho: "/images/gallery/case-orthodontics.jpg",
  implants: "/images/gallery/case-implants.jpg",
};
export const faqImage = "/images/faq/faq-support.jpg";
export const contactImage = "/images/contact/contact-hero.jpg";