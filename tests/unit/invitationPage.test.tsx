import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InvitationPage } from '@pages/invitation';
import { encodeGuestPayload } from '@shared/lib/query/guestCodec';

describe('InvitationPage', () => {
  it('renders personalized invitation and core sections', () => {
    const guest = encodeGuestPayload('м_Дима_и_ж_Вероника');
    window.history.replaceState(null, '', `/?guest=${guest}`);

    render(<InvitationPage />);

    expect(screen.getByRole('heading', { level: 1, name: /Дима\s+и\s+Вероника/u })).toBeVisible();
    expect(screen.getAllByText(/Дима и Вероника,/u).length).toBeGreaterThan(0);
    expect(screen.getByText(/рады сообщить вам/u)).toBeVisible();
    expect(screen.getByRole('heading', { name: /Ресторан Event Roof/u })).toBeVisible();
    expect(screen.getAllByText(/Дресс-код/u).length).toBeGreaterThan(0);
    expect(
      screen.getByRole('heading', { name: /В день свадьбы появились вопросы/u })
    ).toBeVisible();
    expect(
      screen.queryByRole('heading', { name: /Пожалуйста, подтвердите присутствие/u })
    ).not.toBeInTheDocument();
  });

  it('uses a neutral hero title without query parameters', () => {
    window.history.replaceState(null, '', '/');

    render(<InvitationPage />);

    expect(screen.getByRole('heading', { name: /Приглашаем\s+на свадьбу/u })).toBeVisible();
    expect(screen.getAllByText(/Дорогие гости,/u).length).toBeGreaterThan(0);
  });

  it('renders single guest without possible partner copy', () => {
    const guest = encodeGuestPayload('м_Дима');
    window.history.replaceState(null, '', `/?guest=${guest}`);

    render(<InvitationPage />);

    expect(screen.getByRole('heading', { level: 1, name: /^Дима$/u })).toBeVisible();
    expect(screen.getAllByText(/Дима,/u).length).toBeGreaterThan(0);
    expect(screen.queryByText(/возможн/u)).not.toBeInTheDocument();
  });
});
