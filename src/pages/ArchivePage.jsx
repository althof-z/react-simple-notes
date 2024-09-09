import React from 'react';
import NotesList from '../components/Home/NoteList';
import { getArchivedNotes } from '../utils/api';
import LocaleContext from '../contexts/LocaleContext';

function HomePage() {
  const { locale } = React.useContext(LocaleContext);
  const archived = true;
  const [notes, setNotes] = React.useState([]);
  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => { // TODO: Get archive notes
      setNotes(data);
    });
  }, []);

  return (
    <main>
      <section className="homepage">
        <h2>{locale === 'id' ? 'Catatan Terarsip' : 'Archived Notes'}</h2>
        <section className="note-list">
          <NotesList notes={notes} archived={archived} />
        </section>
      </section>
    </main>
  );
}

export default HomePage;
