import React, { Component } from 'react';
import { nanoid } from 'nanoid';
// import Notiflix from 'notiflix';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

const INITIAL_STATE = {
  // contacts: [
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ],
  contacts: [],
  filter: '',
};

const STORAGE_KEY = 'contacts';

export default class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    try {
      const arrContacts = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (arrContacts) {
        this.setState({
          contacts: arrContacts,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
    }
  }

  submitForm = ({ name, number }) => {
    if (this.findContacts(name).length) {
      // Notiflix.Notify.failure(`${name} is already in contacts.`);
      toast.error(`${name} is already in contacts.`);
    } else {
      const id = nanoid();

      this.setState(prev => {
        return {
          contacts: [...prev.contacts, { id, name, number }],
        };
      });
    }
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  findContacts = name => {
    const normalizFilter = name.toLowerCase();

    return this.state.contacts.filter(el => {
      return el.name.toLowerCase().includes(normalizFilter);
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== contactId),
    }));
  };

  render() {
    const visibleContacts = this.findContacts(this.state.filter);

    return (
      <>
        <div className="container">
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.submitForm}></ContactForm>
          <h2>Contacts</h2>
          <Filter
            value={this.state.filter}
            onChange={this.changeFilter}
          ></Filter>
          {visibleContacts.length > 0 && (
            <ContactsList
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            ></ContactsList>
          )}
        </div>

        <ToastContainer />
      </>
    );
  }
}
