import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PaymentSuccess from '../components/payment-success/PaymentSuccess';

describe('PaymentSuccess', () => {
  it('renders the payment success message', () => {
    render(
      <MemoryRouter initialEntries={['/success?session_id=12345']}>
        <Routes>
          <Route path="/success" element={<PaymentSuccess />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Payment Successful')).toBeInTheDocument();
    expect(screen.getByText('Your session ID is: 12345')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
  });

  it('navigates to /signedIn when the Home button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/success?session_id=12345']}>
        <Routes>
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/signedIn" element={<div>Signed In Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Home' }));

    expect(screen.getByText('Signed In Page')).toBeInTheDocument();
  });
});
