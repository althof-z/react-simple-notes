import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import showFormattedDate from '../../utils/DateFormatted';

function NoteItem({
  title, createdAt, body, id,
}) {
  const formattedDate = showFormattedDate(createdAt);
  return (
    <Link to={`/notes/${id}`}>
      <div className="note-item">
        <h3 className="note-item__title">{title}</h3>
        <p className="note-item__createdAt">{formattedDate}</p>
        <p className="note-item__body">{body}</p>
      </div>
    </Link>
  );
}

NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default NoteItem;
