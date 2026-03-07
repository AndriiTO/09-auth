
import type { Metadata } from "next";
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub and organize your tasks efficiently.",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub and organize your tasks efficiently.",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create note preview",
      },
    ],
  },
};


const CreateNotePage = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create Note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNotePage;












// // import css from "./CreateNote.module.css";
// import NoteForm from "@/components/NoteForm/NoteForm";
// import { getCategories } from "@/lib/api";
// // import type { Metadata } from "next";

// const CreateNote = async () => {
//   const categories = await getCategories();

//   return (
//     <>
//       <NoteForm categories={categories} />
//     </>
//   );
// };

// export default CreateNote;


// // const CreateNote = async () => {
// // 	const categories = await getCategories();
// // 	return (
// //     <>
// //       <NoteForm categories={categories} />
// //     </>
// //   );
// //   return (NoteForm categories)
// //   <main className={css.main}>
// //   <div className={css.container}>
// //     <h1 className={css.title}>Create note</h1>
// //   </div>
// // </main>;
// // };

// // export default CreateNote;


// // export const metadata: Metadata = {
// //   title: "Create note",
// //   description: "Create a new note in NoteHub",
// //   openGraph: {
// //     title: "Create note",
// //     description: "Create a new note in NoteHub",
// //     url: "https://notehub.com/notes/action/create",
// //     images: [
// //       {
// //         url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Create note preview",
//       },
//     ],
//   },
// };

// export default function CreateNote() {
//   return (
//     <main className={css.main}>
//       <div className={css.container}>
//         <h1 className={css.title}>Create note</h1>
//         <NoteForm onClose={() => window.history.back()} />
//       </div>
//     </main>
//   );
// }