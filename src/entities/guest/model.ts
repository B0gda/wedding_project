export type GuestGender = 'male' | 'female' | 'unknown';

export type GuestPerson = {
  gender: GuestGender;
  name: string;
};

export type GuestPersonalization = {
  salutation: string;
  people: GuestPerson[];
  isFallback: boolean;
};
