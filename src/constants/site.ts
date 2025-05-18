export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};

export const siteConfig = {
  name: "HeartConnect Forum",
  description: "A supportive community for pacemaker patients, families, and friends.",
  url: "https://heartconnect.example.com", // Replace with actual URL
  ogImage: "https://heartconnect.example.com/og.jpg", // Replace with actual OG image
  links: {
    twitter: "https://twitter.com/example", // Replace with actual Twitter
    github: "https://github.com/example/heartconnect", // Replace with actual GitHub
  },
};

export const mainNav: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Categories",
    href: "/categories",
  },
  {
    title: "Create Thread",
    href: "/threads/create",
  },
];

export const footerNav: NavItem[] = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
  {
    title: "Terms of Service",
    href: "/terms",
  },
];
