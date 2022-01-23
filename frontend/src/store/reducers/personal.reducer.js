import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const personalSlice = createSlice({
  name: "personal",
  initialState: {
    docs: {
      passwords: [],
      cards: [],
      cryptoWallets: [],
    },
    synced: false,
  },
  reducers: {
    FETCH_PERSONAL_DATA: (personal, action) => {
      return { ...personal, docs: action.payload, synced: true };
    },
    ADD_PERSONAL_DATA: (personal, action) => {
      const category = `${action.payload.category}s`;

      return {
        ...personal,
        docs: {
          ...personal.docs,
          [category]: [...personal.docs[category], action.payload],
        },
      };
    },
    DELETE_PERSONAL_DATA: (personal, action) => {
      const category = `${action.payload.category}s`;

      return {
        ...personal,
        docs: {
          ...personal.docs,
          [category]: personal.docs[category].filter(
            (ele) => ele._id !== action.payload.id
          ),
        },
      };
    },
  },
});

export const { FETCH_PERSONAL_DATA, ADD_PERSONAL_DATA, DELETE_PERSONAL_DATA } =
  personalSlice.actions;

export default personalSlice.reducer;

const selectPersonal = (state) => state.personal.docs;

export const selectPasswords = createSelector(
  selectPersonal,
  (personal) => personal.passwords
);
export const selectWallets = createSelector(
  selectPersonal,
  (personal) => personal.cryptoWallets
);
export const selectCards = createSelector(
  selectPersonal,
  (personal) => personal.cards
);

export const selectPassword = (id) =>
  createSelector(selectPasswords, (passwords) =>
    passwords.find((pass) => pass._id === id)
  );
export const selectWallet = (id) =>
  createSelector(selectWallets, (wallets) =>
    wallets.find((wallet) => wallet._id === id)
  );
export const selectCard = (id) =>
  createSelector(selectCards, (cards) => cards.find((card) => card._id === id));
