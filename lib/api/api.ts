import { Note } from "@/types/note";
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

export const notehub = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});