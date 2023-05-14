import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

import { MdDelete } from 'react-icons/md';

const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={css.item} key={id}>
            {name}: {number}
            <button className={css.btn} onClick={() => onDeleteContact(id)}>
              {' '}
              <MdDelete className={css.btn_icon} />
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDeleteContact: PropTypes.func,
};

export default ContactsList;
