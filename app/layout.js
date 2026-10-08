import { Archivo_Black, Manrope, DM_Serif_Display, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { business } from "@/data/balkansCorner";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "The Balkans Corner | Balkan Burgers & Grill in Dandenong",
  description:
    "Discover The Balkans Corner at 27 Bryants Road, Dandenong, serving burgers, chevapi, grilled meats and Balkan-style plates.",
  openGraph: {
    title: "The Balkans Corner | Balkan Burgers & Grill in Dandenong",
    description:
      "Burgers, chevapi and Balkan grill plates at 27 Bryants Rd, Dandenong VIC 3175.",
    type: "website",
    locale: "en_AU",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: business.name,
  image: "/images/balkans-corner/hero-burger.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.suburb,
    addressRegion: business.address.state,
    postalCode: business.address.postcode,
    addressCountry: "AU",
  },
  telephone: business.phone,
  servesCuisine: business.cuisine,
  url: "https://thebalkanscorner.example",
  hasMenu: "#menu",
  acceptsReservations: false,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Tuesday",
      opens: "12:00",
      closes: "21:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "12:00",
      closes: "21:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "12:00",
      closes: "22:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "12:00",
      closes: "22:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "12:00",
      closes: "22:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "13:00",
      closes: "21:30",
    },
  ],
  potentialAction: {
    "@type": "OrderAction",
    target: business.orderUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-AU"
      className={`${archivoBlack.variable} ${manrope.variable} ${dmSerif.variable} ${ibmMono.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
