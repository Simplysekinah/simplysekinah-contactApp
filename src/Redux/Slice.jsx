import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
    selectedContact: null
  },
  reducers: {
    fetchContactsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchContactsSuccess: (state, action) => {
      state.isLoading = false;
      state.contacts = action.payload;
      state.error = null;
    },
    fetchContactsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
      state.error = null;
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      state.error = null;
    },
    selectContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    clearSelectedContact: (state) => {
      state.selectedContact = null;
    }
  }
});

export const { 
  fetchContactsStart, 
  fetchContactsSuccess, 
  fetchContactsFailure, 
  addContact, 
  removeContact, 
  selectContact, 
  clearSelectedContact 
} = contactsSlice.actions;

export default contactsSlice.reducer;