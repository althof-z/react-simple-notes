import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/api';
import NoteInput from '../components/Detail/NoteInput';

function InputPage() {
  const navigate = useNavigate();

  const onAddNoteHandler = async (note) => {
    const result = await addNote(note);
    if (!result.error) {
      navigate('/');
    }
  };

  return (
    <main>
      <section className="add-new-page">
        <h2>New Note</h2>
        <NoteInput addNote={onAddNoteHandler} />
      </section>
    </main>
  );
}

export default InputPage;
