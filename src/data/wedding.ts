// Editable content — designed for future backend integration.
import engagementImg from "@/assets/event-engagement.jpg";
import haldiImg from "@/assets/event-haldi.jpg";
import mehendiImg from "@/assets/event-mehendi.jpg";
import sangeetImg from "@/assets/event-sangeet.jpg";
import weddingImg from "@/assets/event-wedding.jpg";
import receptionImg from "@/assets/event-reception.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import brideGroupImg from "@/assets/family-bride-group.jpg";
import brideFatherImg from "@/assets/family-bride-father.jpg";
import brideMotherImg from "@/assets/family-bride-mother.jpg";
import brideGrandmotherImg from "@/assets/family-bride-grandmother.jpg";
import brideBrotherImg from "@/assets/family-bride-brother.jpg";
import groomGroupImg from "@/assets/family-groom-group.jpg";
import groomFatherImg from "@/assets/family-groom-father.jpg";
import groomMotherImg from "@/assets/family-groom-mother.jpg";
import groomGrandfatherImg from "@/assets/family-groom-grandfather.jpg";
import groomBrotherImg from "@/assets/family-groom-brother.jpg";

export type FamilyMember = { name: string; relation: string; image: string };
export type FamilySide = {
  side: "bride" | "groom";
  title: string;
  subtitle: string;
  surname: string;
  groupImage: string;
  members: FamilyMember[];
};

export const familySides: FamilySide[] = [
  {
    side: "bride",
    title: "Bride’s Family",
    subtitle: "The Sharma Household",
    surname: "Sharma Parivaar",
    groupImage: brideGroupImg,
    members: [
      { name: "Shri Rajeev Sharma", relation: "Father of the Bride", image: brideFatherImg },
      { name: "Smt. Meera Sharma", relation: "Mother of the Bride", image: brideMotherImg },
      { name: "Smt. Lakshmi Devi", relation: "Daadi (Grandmother)", image: brideGrandmotherImg },
      { name: "Rohan Sharma", relation: "Brother of the Bride", image: brideBrotherImg },
    ],
  },
  {
    side: "groom",
    title: "Groom’s Family",
    subtitle: "The Rajvanshi Household",
    surname: "Rajvanshi Parivaar",
    groupImage: groomGroupImg,
    members: [
      { name: "Shri Vikram Rajvanshi", relation: "Father of the Groom", image: groomFatherImg },
      { name: "Smt. Anjali Rajvanshi", relation: "Mother of the Groom", image: groomMotherImg },
      { name: "Shri Hari Prasad", relation: "Baba (Grandfather)", image: groomGrandfatherImg },
      { name: "Aditya Rajvanshi", relation: "Brother of the Groom", image: groomBrotherImg },
    ],
  },
];

export const guestName = "Dear Guest";

export const couple = {
  brideFirst: "Aanya",
  groomFirst: "Arjun",
  brideFull: "Aanya Sharma",
  groomFull: "Arjun Rajvanshi",
  weddingDate: "23rd November 2026",
  destination: "Udaipur, Rajasthan",
  countdownTarget: "2026-11-23T18:00:00+05:30",
};

export const families = {
  bride: {
    title: "Bride’s Family",
    parents: "Shri Rajeev Sharma & Smt. Meera Sharma",
    elders: "With the blessings of Smt. Lakshmi Devi (Daadi)",
  },
  groom: {
    title: "Groom’s Family",
    parents: "Shri Vikram Rajvanshi & Smt. Anjali Rajvanshi",
    elders: "With the blessings of Shri Hari Prasad (Baba)",
  },
};

export type WeddingEvent = {
  id: string;
  name: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  mapUrl: string;
  meaning: string;
  dress: string;
  image: string;
  accent: "gold" | "haldi" | "mehendi" | "sangeet" | "wedding" | "maroon";
};

export const events: WeddingEvent[] = [
  {
    id: "engagement",
    name: "Engagement",
    date: "20 Nov 2026",
    day: "Friday",
    time: "7:00 PM onwards",
    venue: "Sheesh Mahal, Taj Lake Palace",
    mapUrl: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur",
    meaning: "The first promise of a lifelong union.",
    dress: "Indo-Western Elegance",
    image: engagementImg,
    accent: "gold",
  },
  {
    id: "haldi",
    name: "Haldi",
    date: "21 Nov 2026",
    day: "Saturday",
    time: "11:00 AM onwards",
    venue: "Mewar Courtyard, Leela Palace",
    mapUrl: "https://maps.google.com/?q=Leela+Palace+Udaipur",
    meaning: "A joyful ritual of blessings, purity, and golden beginnings.",
    dress: "Shades of Yellow",
    image: haldiImg,
    accent: "haldi",
  },
  {
    id: "mehendi",
    name: "Mehendi",
    date: "21 Nov 2026",
    day: "Saturday",
    time: "4:00 PM onwards",
    venue: "Garden Pavilion, Leela Palace",
    mapUrl: "https://maps.google.com/?q=Leela+Palace+Udaipur",
    meaning: "An evening of artistry, beauty, and celebration.",
    dress: "Pastel & Floral",
    image: mehendiImg,
    accent: "mehendi",
  },
  {
    id: "sangeet",
    name: "Sangeet",
    date: "22 Nov 2026",
    day: "Sunday",
    time: "7:30 PM onwards",
    venue: "Durbar Hall, Taj Lake Palace",
    mapUrl: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur",
    meaning: "A night of music, dance, and shared joy.",
    dress: "Festive Jewel Tones",
    image: sangeetImg,
    accent: "sangeet",
  },
  {
    id: "wedding",
    name: "Wedding",
    date: "23 Nov 2026",
    day: "Monday",
    time: "6:00 PM onwards",
    venue: "Mandap Lawns, Taj Lake Palace",
    mapUrl: "https://maps.google.com/?q=Taj+Lake+Palace+Udaipur",
    meaning: "The sacred union witnessed by family, tradition, and fire.",
    dress: "Traditional Red & Gold",
    image: weddingImg,
    accent: "wedding",
  },
  {
    id: "reception",
    name: "Reception",
    date: "24 Nov 2026",
    day: "Tuesday",
    time: "8:00 PM onwards",
    venue: "Grand Ballroom, Leela Palace",
    mapUrl: "https://maps.google.com/?q=Leela+Palace+Udaipur",
    meaning: "A heartfelt celebration of togetherness with loved ones.",
    dress: "Black-Tie & Couture",
    image: receptionImg,
    accent: "maroon",
  },
];

export const gallery = [
  { src: gallery1, alt: "The couple at the palace courtyard" },
  { src: gallery2, alt: "The bride in regal attire" },
  { src: gallery3, alt: "The groom in royal sherwani" },
  { src: gallery4, alt: "The couple amidst marigolds" },
];

export const contacts = [
  { side: "Bride’s Side", name: "Rohan Sharma (Brother)", phone: "+919876543210", whatsapp: "919876543210" },
  { side: "Groom’s Side", name: "Aditya Rajvanshi (Brother)", phone: "+919812345678", whatsapp: "919812345678" },
  { side: "Family Coordinator", name: "Mr. Suresh Mehta", phone: "+919900112233", whatsapp: "919900112233" },
];

export const travel = {
  airport: "Maharana Pratap Airport (UDR), Udaipur — 25 km from venues.",
  stay: "Reserved blocks at Taj Lake Palace, Leela Palace & Trident Udaipur. Kindly mention the Sharma–Rajvanshi wedding while booking.",
  note: "A dedicated travel desk will assist with airport pickups and inter-venue transfers.",
};
