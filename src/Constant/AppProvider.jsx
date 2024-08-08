import React, { useState, createContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [contacts, setcontacts] = useState("");
  const [phoneNumber, setPhoneNumber] = useState([]);


  const addContact = (contact) => {
    setPhoneNumber((prevContacts) => [...prevContacts, contact]);
  };

  const updateContact = (index, newContact) => {
    setPhoneNumber((prevContacts) => {
      const updatedContacts = [...prevContacts];
      updatedContacts[index] = newContact;
      return updatedContacts;
    });
  };

  const removeContact = (index) => {
    setPhoneNumber((prevContacts) => {
      const updatedContacts = [...prevContacts];
      updatedContacts.splice(index, 1);
      return updatedContacts;
    });
  };
  return (
    <AppContext.Provider value={{ contacts,setcontacts,phoneNumber, addContact, updateContact, removeContact }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
