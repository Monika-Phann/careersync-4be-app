// src/store/authAtom.js
import { atom } from 'jotai';

export const authAtom = atom({
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
});