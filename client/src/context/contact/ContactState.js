import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

//initial state
const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Harry WHite',
        email: 'harry@gmail.com',
        phone: '333-333-444',
        type: 'professional'
      },
      {
        id: 2,
        name: 'Marta WHite',
        email: 'marta@gmail.com',
        phone: '888-333-444',
        type: 'professional'
      },
      {
        id: 3,
        name: 'Hagrit Walse',
        email: 'hagrit@gmail.com',
        phone: '222-999-444',
        type: 'personal'
      }
    ]
  };
  //access to state and dispath object to reducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Add Contact

  //Delete Contact

  //Set Current COntact

  //Clear Current COntact

  //Update Contact

  //Filter COntacts

  //Clear Filter

  // return provider so that I could wrapp the whall app
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
