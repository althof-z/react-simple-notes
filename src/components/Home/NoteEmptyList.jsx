import React from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../../contexts/LocaleContext';

function NoteEmptyList({ archived }) {
  const { locale } = React.useContext(LocaleContext);
  let emptyText = '';

  if (locale === 'id') {
    emptyText = archived
      ? 'Tidak Ada Catatan Terarsipkan'
      : 'Tidak Ada Catatan Aktif';
  } else if (locale === 'en') {
    emptyText = archived
      ? 'No Archived Note Available'
      : 'No Active Note Available';
  }

  return (
    <section className="notes-list-empty">
      <p className="notes-list__empty">{emptyText}</p>
    </section>
  );
}

NoteEmptyList.propTypes = {
  archived: PropTypes.bool.isRequired,
};
export default NoteEmptyList;
