// Reviews purani website ke asli reviews hain (original wording, koi tabdili nahi).
// Photo sirf unki jin ki asli photo mili. Baqi ke liye initials nazar aate hain.
// Kisi patient ki photo mile to us ke object mein ye 2 lines jod dein:
//   avatar: "/images/testimonials/naam.jpg",
//   photo: "/images/testimonials/naam.jpg",
// Google badge band hai kyunke ye Google ke reviews nahi hain.
export const showGoogleBadge = false;

export const testimonials = [
  {
    id: "bilal",
    initials: "MB",
    name: "Muhammad Bilal",
    treatment: "Business Owner",
    tone: "orange",
    text: "Bohat acha experience raha. Doctor ne araam se treatment kiya aur staff bhi bohat cooperative tha. Highly recommended",
    avatar: "/images/testimonials/muhammad-bilal.jpg",
    photo: "/images/testimonials/muhammad-bilal.jpg",
  },
  {
    id: "ahmad",
    initials: "AR",
    name: "Ahmad Raza",
    treatment: "Software Engineer",
    tone: "teal",
    text: "Great experience from start to finish. The dentist was professional, and the treatment was comfortable. Will definitely visit again",
    avatar: "/images/testimonials/ahmad-raza.jpg",
    photo: "/images/testimonials/ahmad-raza.jpg",
  },
  {
    id: "usman",
    initials: "UA",
    name: "Usman Ali",
    treatment: "Braces",
    tone: "teal",
    text: "Clinic ka environment bohat clean aur professional hai. Staff bhi polite hai aur appointment time pe sab kuch smooth chalta hai. Overall good experience raha.",
  },
  {
    id: "hamza",
    initials: "HS",
    name: "Hamza Shah",
    treatment: "Braces",
    tone: "orange",
    text: "Main braces ke liye gaya tha aur initial hesitation tha, lekin doctor ne proper guide kiya. Ab meri teeth alignment improve ho rahi hai. Service kaafi achi hai.",
  },
  {
    id: "ayesha-n",
    initials: "AN",
    name: "Ayesha Noor",
    treatment: "Filling",
    tone: "teal",
    text: "Main filling ke liye gayi thi aur mujhe bilkul pain feel nahi hua. Doctor ne sab kuch calmly explain kiya aur treatment bohat comfortable tha.",
  },
  {
    id: "ayesha-k",
    initials: "AK",
    name: "Ayesha Khalid",
    treatment: "Scaling",
    tone: "orange",
    text: "Main scaling ke liye gayi thi aur result bohat acha raha. Clinic saaf sutra hai aur doctors bohat friendly hain",
  },
];