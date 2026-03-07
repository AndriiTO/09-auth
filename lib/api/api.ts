import { Note, NoteTag } from "@/types/note";
import axios from "axios";


export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
}

export type NewNoteData = {
  title: string;
  content: string;
  tag: NoteTag;
};

export const notehub = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});