import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

interface NotePageProps {
  params: { id: string }; 
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 30),
      url: `https://notehub.com/notes/${params.id}`,
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

export default async function NotePage({ params }: NotePageProps) {
  const client = new QueryClient();

  await client.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <NoteDetailsClient /> {/* Клієнтський компонент для взаємодії */}
    </HydrationBoundary>
  );
}









// import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { fetchNoteById } from "../../../../lib/api/serverApi";
// import NoteDetailsClient from "./NoteDetails.client";
// // import { getSingleNote } from "@/lib/api/clientApi";
// import { Metadata } from "next";
// type Props = {
//   params: Promise<{ id: string }>
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { id } = await params
//   const note = await fetchNoteById(id)
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


// export default async function NotePage({
//   params,
// }: {
//   params: { id: string };
// }) {

//   const client = new QueryClient();

//   await client.prefetchQuery({

//     queryKey: ["note", params.id],

//     queryFn: () =>
//       fetchNoteById(params.id),

//   });

//   return (

//     <HydrationBoundary state={dehydrate(client)}>

//       <NoteDetailsClient />

//     </HydrationBoundary>

//   );

// }