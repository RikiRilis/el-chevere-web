import type { NavItem } from "@/interfaces/navItems";
import { getI18N } from "@/languages/index.ts";

export const navItemsProvider = (currentLocale: string | undefined): NavItem[] => {
    const i18n = getI18N({currentLocale});
  return [
    {
      title: "Web",
      label: "web",
      url: "/",
    },
    {
      title: "Blog",
      label: "blog",
      url: "/blog",
    },
    {
      title: i18n.PORTFOLIO,
      label: "about",
      url: "/portfolio#about",
    },
    {
      title: i18n.CONTACT,
      label: "contact",
      url: "#contact",
    },
  ];
};
