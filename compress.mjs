import sharp from "sharp";
import fs from "fs";

const jobs = [
  ["public/images/hero/hero-dentist-patient.jpg", 1920],
  ["public/images/contact/contact-hero.jpg", 1920],
  ["public/images/testimonials/ahmad-raza.jpg", 400],
  ["public/images/testimonials/muhammad-bilal.jpg", 400],
  ["public/images/highlights/experienced-dentists.jpg", 1000],
  ["public/images/highlights/advanced-technology.jpg", 1000],
  ["public/images/highlights/easy-appointments.jpg", 1000],
  ["public/images/about/dr-siddique-consultation.jpg", 1200],
];

for (const [file, width] of jobs) {
  const buf = await sharp(file)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 75, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(file, buf);
  console.log(file, Math.round(buf.length / 1024) + " KB");
}