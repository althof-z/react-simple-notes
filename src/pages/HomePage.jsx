import React from 'react';
import NotesList from '../components/Home/NoteList';
import HomePageAction from '../components/Home/HomePageAction';
import { getActiveNotes } from '../utils/api';
import LocaleContext from '../contexts/LocaleContext';

function HomePage() {
  const { locale } = React.useContext(LocaleContext);
  const archived = false;

  const [notes, setNotes] = React.useState([]);
  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  return (
    <main>
      <section className="homepage">
        <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
        <section className="note-list">
          <NotesList notes={notes} archived={archived} />
        </section>
        <div className="homepage__action">
          <HomePageAction />
        </div>
      </section>
    </main>
  );
}

export default HomePage;
