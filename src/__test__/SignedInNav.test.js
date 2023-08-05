import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignedInNav from '../components/navbar/SignedInNav';
import { Auth } from 'aws-amplify';

describe('SignedInNav', () => {
  it('renders the SignedInNav component', () => {
    render(
      <MemoryRouter>
        <SignedInNav />
      </MemoryRouter>
    );
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  it('calls Auth.signOut when the Sign Out button is clicked', async () => {
   
    const signOutMock = jest.fn();
    Auth.signOut = signOutMock;

    render(
      <MemoryRouter>
        <SignedInNav />
      </MemoryRouter>
    );

    const signOutButton = screen.getByRole('button', { name: /Sign Out/i });
    fireEvent.click(signOutButton);

    expect(signOutMock).toHaveBeenCalled();
  });

});
