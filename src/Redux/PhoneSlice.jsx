import { createSlice } from '@reduxjs/toolkit';

const PhoneSlice = createSlice({
  name: 'phoneNumber',
  initialState: {
    currentContact: {
      phoneNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
    },
    contactsList: [],
    isSaving: false,
    saveError: null,
  },
  reducers: {
    setPhoneNumber: (state, action) => {
      state.currentContact.phoneNumber = action.payload;
    },
    updateContactDetails: (state, action) => {
      state.currentContact = { ...state.currentContact, ...action.payload };
    },
    saveContactStart: (state) => {
      state.isSaving = true;
      state.saveError = null;
    },
    saveContactSuccess: (state) => {
      state.contactsList.push(state.currentContact);
      state.isSaving = false;
      state.currentContact = {
        phoneNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        address: '',
      };
    },
    saveContactFailure: (state, action) => {
      state.isSaving = false;
      state.saveError = action.payload;
    },
  },
});

export const {
  setPhoneNumber,
  updateContactDetails,
  saveContactStart,
  saveContactSuccess,
  saveContactFailure,
} = PhoneSlice.actions;

export default PhoneSlice.reducer;
