import { SiGoogleclassroom } from "react-icons/si";
import { FaUserCheck } from "react-icons/fa6";
import { FaGamepad } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";


export const navLinks = [
  // {
  //   id: 1,
  //   href: "home",
  //   link: "Home",
  // },
  {
    id: 2,
    href: "about",
    link: "About",
  },
  {
    id: 3,
    href: "service",
    link: "Service",
  },
  {
    id: 5,
    href: "contact",
    link: "Contact",
  },
];

export const categories = [
  {
    id: 1,
    icon: <SiGoogleclassroom />,
    category: "Create Classroom",
    href:"dashboard"
  },
  {
    id: 2,
    icon: <FaUserCheck />,
    category: "Check name in class",
    href:`checkname/`
  },
  {
    id: 3,
    icon: <FaGamepad />,
    category: "Gamification",
    href:`game/`
  },
  {
    id: 4,
    icon: <MdSpaceDashboard />,
    category: "Report",
    href:"report"
  }
];
