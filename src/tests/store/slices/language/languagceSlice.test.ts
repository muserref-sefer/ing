import { describe, it, expect } from 'vitest';
import reducer, { setLanguage } from '@/store/slices/language/languagceSlice';
import en from '@/locales/en';
import tr from '@/locales/tr';

describe('language slice', () => {
  it('should default to tr', () => {
    const state = reducer(undefined, { type: 'unknown' } as any);
    expect(state.language).toBe('tr');
    expect(state.messages).toEqual(tr);
  });

  it('should switch to en', () => {
    const state = reducer(undefined, setLanguage('en'));
    expect(state.language).toBe('en');
    expect(state.messages).toEqual(en);
  });

  it('should switch back to tr explicitly', () => {
    const stateEn = reducer(undefined, setLanguage('en'));
    const stateTr = reducer(stateEn, setLanguage('tr'));
    expect(stateTr.language).toBe('tr');
    expect(stateTr.messages).toEqual(tr);
  });
});
