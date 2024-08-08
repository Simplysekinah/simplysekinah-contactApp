import React, { useContext } from 'react';
import AppContext from '../Constant/AppProvider';

const ContactsList = () => {
  const { phoneNumber } = useContext(AppContext);

  return (
    <div className="contacts-list">
      <h2>Saved Contacts</h2>
      {phoneNumber.length > 0 ? (
        <ul>
          {phoneNumber.map((contact, index) => (
            <li key={index}>
              <div><strong>Name:</strong> {contact.firstName} {contact.lastName}</div>
              <div><strong>Company:</strong> {contact.company}</div>
              <div><strong>Phone:</strong> {contact.contacts}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contacts saved yet.</p>
      )}
    </div>
  );
};

export default ContactsList;
