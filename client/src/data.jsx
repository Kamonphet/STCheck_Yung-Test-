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
  },
  {
    id: 2,
    icon: <FaUserCheck />,
    category: "Check name in class",
  },
  {
    id: 3,
    icon: <FaGamepad />,
    category: "Gamification",
  },
  {
    id: 4,
    icon: <MdSpaceDashboard />,
    category: "Report",
  }
];


export const accordions = [
  {
    id: 1,
    title: "What is Skillex?",
  },
  {
    id: 2,
    title: "What can I learn from Skillex?",
  },
  {
    id: 3,
    title: "Can I teach on Skillex?",
  },
  {
    id: 4,
    title: "What is included in my Skillex membership?",
  },
];

export const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
];