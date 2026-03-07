
import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note, NoteListResponse } from "@/types/note";

// Notes
export const fetchNotes = async (
  tag?: string,
  page = 1,
  search?: string
): Promise<NoteListResponse> => {
  const res = await nextServer.get<NoteListResponse>("/notes", {
    params: {
      tag,
      page,
      perPage: 12,
      ...(search ? { search } : {}),
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: { title: string; content: string; tag: string }): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

// Auth
export const register = async (data: { email: string; password: string }): Promise<User> => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: { email: string; password: string }): Promise<User> => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
  try {
    const res = await nextServer.get("/auth/session");
    return res.data;
  } catch {
    return null;
  }
};

// Profile
export const getMe = async (): Promise<User> => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};
export const updateMe = async (data: Partial<User>): Promise<User> => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};











// import { nextServer } from "./api";
// import { User } from "@/types/user";
// import { Note, NoteListResponse } from "@/types/note";

// // Notes
// export const fetchNotes = async (tag?: string, page = 1): Promise<NoteListResponse> => {
//   const res = await nextServer.get<NoteListResponse>("/notes", { params: { tag, page, perPage: 12 } });
//   return res.data;
// };

// export const fetchNoteById = async (id: string): Promise<Note> => {
//   const res = await nextServer.get<Note>(`/notes/${id}`);
//   return res.data;
// };

// export const createNote = async (data: { title: string; content: string; tag: string }): Promise<Note> => {
//   const res = await nextServer.post<Note>("/notes", data);
//   return res.data;
// };

// export const deleteNote = async (id: string) => {
//   await nextServer.delete(`/notes/${id}`);
// };

// // Auth
// export const register = async (data: { email: string; password: string }): Promise<User> => {
//   const res = await nextServer.post<User>("/auth/register", data);
//   return res.data;
// };

// export const login = async (data: { email: string; password: string }): Promise<User> => {
//   const res = await nextServer.post<User>("/auth/login", data);
//   return res.data;
// };

// export const logout = async () => {
//   await nextServer.post("/auth/logout");
// };

// export const checkSession = async (): Promise<User | null> => {
//   try {
//     const res = await nextServer.get<User>("/auth/session");
//     return res.data;
//   } catch {
//     return null;
//   }
// };

// // Profile
// export const getMe = async (): Promise<User> => {
//   const res = await nextServer.get<User>("/users/me");
//   return res.data;
// };

// export const updateMe = async (data: Partial<User>): Promise<User> => {
//   const res = await nextServer.patch<User>("/users/me", data);
//   return res.data;
// };