import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CTA from '../components/cta/CTA';

describe('CTA', () => {
  
  global.window.open = jest.fn();

  it('renders the CTA component', () => {
    render(<CTA />);

    expect(screen.getByText('Click here to forecast prices')).toBeInTheDocument();
    expect(screen.getByText('Play with and train our models')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'LSTM' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Linear Regression' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Click to Trade' })).toBeInTheDocument();
  });

  it('opens the LSTM link when the LSTM button is clicked', () => {
    render(<CTA />);
    fireEvent.click(screen.getByRole('button', { name: 'LSTM' }));
    expect(window.open).toHaveBeenCalledWith('https://streamlit-lstm-app-kkl5inde2q-uc.a.run.app', '_blank');
  });

  it('opens the Linear Regression link when the Linear Regression button is clicked', () => {
    render(<CTA />);
    fireEvent.click(screen.getByRole('button', { name: 'Linear Regression' }));
    expect(window.open).toHaveBeenCalledWith('https://streamlit-linear-app-kkl5inde2q-ew.a.run.app', '_blank');
  });

  it('opens the Click to Trade link when the Click to Trade button is clicked', () => {
    render(<CTA />);
    fireEvent.click(screen.getByRole('button', { name: 'Click to Trade' }));
    expect(window.open).toHaveBeenCalledWith('https://freetrade.io', '_blank');
  });
});
