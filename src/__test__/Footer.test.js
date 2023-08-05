import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../containers/footer/Footer';

describe('Footer', () => {
  it('renders the Footer component', () => {
    render(<Footer />);

    
    expect(screen.getByText('Learn and explore the capabilities of ML in the financial world')).toBeInTheDocument();
    expect(screen.getByText('Join Us')).toBeInTheDocument();
    expect(screen.getByText('Links')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText('© 2023 FuturStox. All rights reserved.')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });
});
