import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Page Not Found ",
  description: "This page does not exist or you do not have access",
  openGraph: {
    title: "Page Not Found",
    description:
      "This page does not exist or you do not have access",
    url: "https://notehub.com/notes",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview",
      },
    ],
  },
};
