import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "../../../../../lib/api/serverApi";
import NotesClient from "./Notes.client";
import type { Tag } from "@/types/note"

import { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const tag: Tag | string = slug?.[0] || "all";

  const title = tag === "all" ? "All Notes" : `Notes — ${tag}`;
  const description =
    tag === "all"
      ? "View all notes in NoteHub"
      : `View all notes tagged with ${tag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${tag}`,
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
}


export default async function NotesPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug;
  const tag: Tag | string = slug?.[0] || "all";

  const client = new QueryClient();

  
  await client.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: "",
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}










// type Props = {
//   params: Promise<{ id: string }>
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     const { id } = await params
//     const note = await getSingleNote(id)
//   return {
//     title: `Note: ${note.title}`,
//     description: note.content.slice(0, 30),
//     openGraph: {
//       title: `Note: ${note.title}`,
//       description: note.content.slice(0, 30),
//       url: `https://notehub.com/notes/${id}`,
//       images: [
//         {
//           url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
//           width: 1200,
//           height: 630,
//           alt: "NoteHub preview",
//         },
//       ],
//     },
//   };
// }

// export default async function NotesPage({ params }: { params: Promise<{ slug: string[] }> }) {
//     const { slug } = await params;
//   const tag: Tag | string = slug[0];
//   const client = new QueryClient();

//   await client.prefetchQuery({
//     queryKey: ["notes", 1, "", tag], 
//     queryFn: () =>
//       fetchNotes({
//         page: 1,
//         perPage: 12,
//         search: "",
//         tag
//       }),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(client)}>
//       <NotesClient tag={tag} />
//     </HydrationBoundary>
//   );
// }
