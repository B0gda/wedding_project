import type { GuestGender, GuestPersonalization, GuestPerson } from '@entities/guest/model';

const FALLBACK_GUEST: GuestPersonalization = {
  salutation: 'наш уважаемый гость',
  people: [],
  isFallback: true
};

const DEFAULT_GUEST: GuestPersonalization = {
  salutation: 'Дорогие гости',
  people: [],
  isFallback: true
};

const genderMap: Partial<Record<string, GuestGender>> = {
  м: 'male',
  ж: 'female'
};

export function readGuestFromSearch(search: string): GuestPersonalization {
  const rawGuest = new URLSearchParams(search).get('guest');

  if (!rawGuest) {
    return DEFAULT_GUEST;
  }

  try {
    return parseGuestPayload(decodeGuestPayload(rawGuest));
  } catch {
    return FALLBACK_GUEST;
  }
}

export function encodeGuestPayload(payload: string): string {
  // Рекомендуемый формат URL: ?guest=<base64url(UTF-8 строка "м_Дима_и_ж_Вероника")>; base64url убирает символы +, / и =, которые часто ломаются в query.
  const bytes = new TextEncoder().encode(payload);
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function decodeGuestPayload(value: string): string {
  // Декодируем только base64url поверх UTF-8, чтобы кириллические имена не зависели от кодировки браузера и корректно восстанавливались из query.
  const normalized = value.replaceAll('-', '+').replaceAll('_', '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function parseGuestPayload(payload: string): GuestPersonalization {
  const people = parseGenderedGuestPayload(payload);

  if (people.length > 0 && people.length <= 4) {
    return {
      salutation: buildSalutation(people),
      people,
      isFallback: false
    };
  }

  const plainPeople = parsePlainGuestPayload(payload);

  if (plainPeople.length === 0 || plainPeople.length > 4) {
    return FALLBACK_GUEST;
  }

  return {
    salutation: buildSalutation(plainPeople),
    people: plainPeople,
    isFallback: false
  };
}

function parseGenderedGuestPayload(payload: string): GuestPerson[] {
  return payload
    .split('_и_')
    .map(parseGuestPerson)
    .filter((person): person is GuestPerson => person !== null);
}

function parseGuestPerson(part: string): GuestPerson | null {
  const [rawGender, ...nameParts] = part.split('_');
  const gender = genderMap[rawGender];
  const name = nameParts.join('_').trim();

  if (!gender || !name) {
    return null;
  }

  return {
    gender,
    name
  };
}

function parsePlainGuestPayload(payload: string): GuestPerson[] {
  const names = payload
    .split(/\s*,\s*|\s+и\s+|_и_/u)
    .map((name) => name.trim())
    .filter(Boolean);

  if (names.length === 0 || names.length > 4 || names.some((name) => !isValidPlainName(name))) {
    return [];
  }

  return names.map((name) => ({
    gender: 'unknown',
    name
  }));
}

function isValidPlainName(name: string): boolean {
  return /^[\p{L}][\p{L}\s'-]{1,48}$/u.test(name);
}

function buildSalutation(people: GuestPerson[]): string {
  if (people.length > 1) {
    const names = people.map((person) => person.name);
    const lastName = names[names.length - 1] ?? '';
    const previousNames = names.slice(0, -1);

    return `${previousNames.join(', ')} и ${lastName}`;
  }

  const [first] = people;

  return first.name;
}
