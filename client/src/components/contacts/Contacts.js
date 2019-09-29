import React, { Fragment, useContext } from 'react';
import ContactItem from '../contacts/ContactItem';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  //bring context
  const contactContext = useContext(ContactContext);
  //get contacts from context
  const { contacts } = contactContext;
  return (
    <div>
      <Fragment>
        {contacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </Fragment>
    </div>
  );
};

export default Contacts;
