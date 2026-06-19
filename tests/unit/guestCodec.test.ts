import { describe, expect, it } from 'vitest';
import { encodeGuestPayload, readGuestFromSearch } from '@shared/lib/query/guestCodec';

describe('guestCodec', () => {
  it('decodes couple invitation from base64url query', () => {
    const guest = encodeGuestPayload('м_Дима_и_ж_Вероника');

    expect(readGuestFromSearch(`?guest=${guest}`)).toEqual({
      salutation: 'Дима и Вероника',
      people: [
        { gender: 'male', name: 'Дима' },
        { gender: 'female', name: 'Вероника' }
      ],
      isFallback: false
    });
  });

  it('builds male guest without possible partner copy', () => {
    const guest = encodeGuestPayload('м_Дима');

    expect(readGuestFromSearch(`?guest=${guest}`).salutation).toBe('Дима');
  });

  it('builds female guest without possible partner copy', () => {
    const guest = encodeGuestPayload('ж_Вероника');

    expect(readGuestFromSearch(`?guest=${guest}`).salutation).toBe('Вероника');
  });

  it('decodes plain names without gender markers', () => {
    const guest = encodeGuestPayload('Данил и Алина');

    expect(readGuestFromSearch(`?guest=${guest}`)).toEqual({
      salutation: 'Данил и Алина',
      people: [
        { gender: 'unknown', name: 'Данил' },
        { gender: 'unknown', name: 'Алина' }
      ],
      isFallback: false
    });
  });

  it('decodes plain single name', () => {
    const guest = encodeGuestPayload('Данил');

    expect(readGuestFromSearch(`?guest=${guest}`)).toEqual({
      salutation: 'Данил',
      people: [{ gender: 'unknown', name: 'Данил' }],
      isFallback: false
    });
  });

  it('decodes three plain names', () => {
    const guest = encodeGuestPayload('Александр, Любовь и Михаил');

    expect(readGuestFromSearch(`?guest=${guest}`)).toEqual({
      salutation: 'Александр, Любовь и Михаил',
      people: [
        { gender: 'unknown', name: 'Александр' },
        { gender: 'unknown', name: 'Любовь' },
        { gender: 'unknown', name: 'Михаил' }
      ],
      isFallback: false
    });
  });

  it('decodes prefixed plain names as names', () => {
    const guest = encodeGuestPayload('т.Юля и д.Леша');

    expect(readGuestFromSearch(`?guest=${guest}`)).toEqual({
      salutation: 'т.Юля и д.Леша',
      people: [
        { gender: 'unknown', name: 'т.Юля' },
        { gender: 'unknown', name: 'д.Леша' }
      ],
      isFallback: false
    });
  });

  it('decodes mixed prefixed and unprefixed three-person invitations', () => {
    const guest = encodeGuestPayload('д.Саша, т.Люба и Миша');

    expect(readGuestFromSearch(`?guest=${guest}`)).toEqual({
      salutation: 'д.Саша, т.Люба и Миша',
      people: [
        { gender: 'unknown', name: 'д.Саша' },
        { gender: 'unknown', name: 'т.Люба' },
        { gender: 'unknown', name: 'Миша' }
      ],
      isFallback: false
    });
  });

  it('falls back politely on broken base64', () => {
    expect(readGuestFromSearch('?guest=broken%')).toEqual({
      salutation: 'наш уважаемый гость',
      people: [],
      isFallback: true
    });
  });

  it('uses dear guests when query is missing', () => {
    expect(readGuestFromSearch('')).toEqual({
      salutation: 'Дорогие гости',
      people: [],
      isFallback: true
    });
  });
});
