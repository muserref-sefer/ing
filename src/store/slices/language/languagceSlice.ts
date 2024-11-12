import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import en from '../../../locales/en';
import tr from '../../../locales/tr';

interface LanguageState {
  language: 'tr' | 'en';
  messages: typeof tr;
}

const initialState: LanguageState = {
  language: 'tr',
  messages: tr,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'tr' | 'en'>) => {
      state.language = action.payload;
      state.messages = action.payload === 'tr' ? tr : en;
    }
  }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
