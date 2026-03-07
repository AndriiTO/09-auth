import { cookies } from "next/headers";
import {
  // notehub,
  nextServer,
  FetchNotesResponse,
  User,
  } from "./api";
import type { Note, Tag } from "@/types/note";


export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: {
  page: number;
  perPage?: number;
  search?: string;
  tag?: Tag | string;
}): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
      ...(tag && tag !== "all" ? { tag } : {}),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};


export const getMe = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};


export const checkServerSession = async () => {
    const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
           Cookie: cookieStore.toString(),
    },
  });
   return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const deleteNoteById = async (id: string) => {
  const cookieStore = await cookies();

  const res = await nextServer.delete(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};