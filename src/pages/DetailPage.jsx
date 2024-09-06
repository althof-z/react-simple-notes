import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoteDetail from '../components/Detail/NoteDetail';
import {
  getNote,
  deleteNote,
  getActiveNotes,
  archiveNote,
  unarchiveNote,
} from '../utils/api';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null); // Initialize note state with null

  useEffect(() => {
    getNote(id).then(({ data }) => {
      setNote(data);
    });
  }, [id]);

  React.useEffect(() => {
    getNote(id).then(({ data }) => {
      setNote(data);
    });
  }, []);

  async function onDeleteHandler() {
    try {
      await deleteNote(id);
      // update the Notes state from network.js
      const { data } = await getActiveNotes();
      setNote(data);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function onArchiveHandler() {
    try {
      if (note.archived === true) {
        await unarchiveNote(id);
      } else {
        await archiveNote(id);
      }
      // update the Notes state from network.js
      const { data } = await getActiveNotes();
      setNote(data);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (note === null) {
    // Check if note is null, indicating loading
    return (
      <section className="detail-page">
        <h1>Loading...</h1>
      </section>
    );
  }

  if (note === undefined) {
    // Check if note is undefined, indicating no available note
    return (
      <section className="detail-page">
        <h1>No Available Note</h1>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <NoteDetail
        id={note.id}
        title={note.title}
        createdAt={note.createdAt}
        body={note.body}
        archived={note.archived}
        onDelete={() => onDeleteHandler(note.id)}
        onArchive={() => onArchiveHandler(note.id)}
      />
    </section>
  );
}

export default DetailPage;
