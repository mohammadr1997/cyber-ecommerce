import faceBook from "@/assets/icons/Facebook.png";
import instagram from "@/assets/icons/Instagram.png";
import twitter from "@/assets/icons/Twitter.png";
import tiktok from "@/assets/icons/tiktok.png";

interface footerLinkType {
  label: string;
  path: string;
}

interface footerItemType {
  header: string;
  item: footerLinkType[];
}

export const footerItems: footerItemType[] = [
  {
    header: "Services",
    item: [
      { label: "Bonus program", path: "/bonus-program" },
      { label: "Gift cards", path: "/gift-cards" },
      { label: "credit and payment", path: "/credit-and-payment" },
      { label: "Service Contracts", path: "/service-contracts" },
      { label: "Non-cash account", path: "/non-cash-account" },
      { label: "Payment", path: "/payment" },
    ],
  },
  {
    header: "Assistance to the buyer",
    item: [
      { label: "Find an order", path: "/find-an-order" },
      { label: "Terms of delivery", path: "/terms-of-delivery" },
      { label: "Exchange and returns of goods", path: "/exchange-and-returns" },
      { label: "Guarantee", path: "/guarantee" },
      { label: "Frequently asked questions", path: "/faq" },
      { label: "Terms of the use of site", path: "/terms-of-use" },
    ],
  },
];

export const socialIconsFooter: {
  label: string;
  icon: string;
  link: string;
}[] = [
  {
    label: "Facebook",
    icon: faceBook,
    link: "https://www.facebook.com",
  },
  {
    label: "Instagram",
    icon: instagram,
    link: "https://www.instagram.com",
  },
  {
    label: "Twitter",
    icon: twitter,
    link: "https://x.com",
  },
  {
    label: "TikTok",
    icon: tiktok,
    link: "https://www.tiktok.com",
  },
];
