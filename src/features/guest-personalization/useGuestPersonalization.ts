import { useMemo } from 'react';
import { readGuestFromSearch } from '@shared/lib/query/guestCodec';

export function useGuestPersonalization(search = window.location.search) {
  return useMemo(() => readGuestFromSearch(search), [search]);
}
