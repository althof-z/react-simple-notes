import React from 'react';
import PropTypes from 'prop-types';
import showFormattedDate from '../../utils/index';
import DeleteButton from './DeleteButton';
import ArchiveButton from './ArchiveButton';

function NoteDetail({
  title,
  createdAt,
  body,
  id,
  archived,
  onDelete,
  onArchive,
}) {
  const formattedDate = showFormattedDate(createdAt);

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{archived === true ? `${title} (archived)` : title}</h3>
      <p className="detail-page__createdAt">{formattedDate}</p>
      <div className="detail-page__body">{body}</div>
      <div className="detail-page__action">
        <ArchiveButton id={id} archived={archived} onArchive={onArchive} />
        <DeleteButton id={id} onDelete={onDelete} />
      </div>
    </section>
  );
}

NoteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteDetail;
