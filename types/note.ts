export type NoteTag =
  | "Todo"
  | "Work"
  | "Personal"
  | "Meeting"
  | "Shopping";


export interface Note {

  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;

}
export type NoteListResponse = {
  notes: Note[];
  totalPages: number;
};

  export type Tag = "Work"| "Personal"| "Todo"| "Meeting"| "Shopping"

 