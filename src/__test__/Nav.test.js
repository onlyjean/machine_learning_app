import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Nav from '../components/navbar/Nav';

describe('Nav', () => {
  it('renders the Nav component', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

   
    expect(screen.getByAltText('logo')).toBeInTheDocument();

  
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();

   
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });

  it('navigates to sign-up page when the Sign up button is clicked', () => {
    render(
      <MemoryRouter>
        <Nav />
        <Routes>
          <Route path="/signup" element={<div>Sign Up Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));

    expect(screen.getByText('Sign Up Page')).toBeInTheDocument();
  });

  it('navigates to sign-in page when the Sign in link is clicked', () => {
    render(
      <MemoryRouter>
        <Nav />
        <Routes>
          <Route path="/signin" element={<div>Sign In Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Sign in'));

    expect(screen.getByText('Sign In Page')).toBeInTheDocument();
  });
});
