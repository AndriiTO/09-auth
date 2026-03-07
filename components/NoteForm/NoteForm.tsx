'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import * as Yup from 'yup';
import { NewNoteData } from '@/lib/api';
import { createNote } from "@/lib/clientApi";
import { useNoteDraftStore } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';
import React from 'react';



export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const initialValues = {
    title: '',
    content: '',
    tag: 'Todo' as NoteTag,
  };

  const { draft = initialValues, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
 
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // обов'язково
  const formData = new FormData(event.currentTarget);
  const values = Object.fromEntries(formData) as NewNoteData;
  mutate(values);
};
  

  //  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const values = Object.fromEntries(formData) as NewNoteData;
  //   mutate(values);
  // };

  const handleCancel = () => router.push('/notes/filter/all');

  //   const validationSchema = Yup.object({
  //   title: Yup.string()
  //     .min(3, 'Title must be at least 3 characters')
  //     .max(50, 'Title cannot exceed 50 characters')
  //     .required('Title is required'),
  //   content: Yup.string().max(500, 'Content cannot exceed 500 characters'),
  //   tag: Yup.mixed<NoteTag>()
  //     .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
  //     .required('Tag is required'),
  // });

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={draft?.title || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"  
          rows={6}
          className={css.textarea}
          value={draft?.content || ''}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft?.tag || 'Todo'}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit">Create</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
