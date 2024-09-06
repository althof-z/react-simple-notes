import React from 'react';
import { RiInboxArchiveLine, RiInboxUnarchiveLine } from 'react-icons/ri';
import PropTypes from 'prop-types';

function ArchiveButton({ id, archived, onArchive }) {
  return (
    <button className="action" type="button" onClick={() => onArchive(id)}>
      <svg
        aria-label="Archive"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        {archived === true ? (
          <RiInboxUnarchiveLine size={24} />
        ) : (
          <RiInboxArchiveLine size={24} />
        )}
      </svg>
    </button>
  );
}

ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ArchiveButton;
