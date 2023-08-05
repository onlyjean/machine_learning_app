import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../containers/header/Header';
import { useNavigate } from 'react-router-dom';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header', () => {
  it('renders the Header component', () => {
    render(<Header />);
    expect(screen.getByText('Helping you learn and trade successfully with Machine Learning.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your email address')).toBeInTheDocument();
    expect(screen.getByAltText('laptop')).toBeInTheDocument();
    expect(screen.getByAltText('people')).toBeInTheDocument();
  });

  it('navigates to the sign-up page when the Get Started button is clicked', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(<Header />);

    const getStartedButton = screen.getByText('Get Started');
    fireEvent.click(getStartedButton);

    expect(navigateMock).toHaveBeenCalledWith('/signup');
  });
});
