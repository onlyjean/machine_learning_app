import React from 'react';
import { render, screen } from '@testing-library/react';
import Pricing from '../components/pricing/Pricing';

describe('Pricing', () => {
  it('renders the Pricing component', () => {
    render(<Pricing isAuthenticated={true} />);

  
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Subscribe for our premium plan and get access to advanced models and features.')).toBeInTheDocument();

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Get more advanced')).toBeInTheDocument();
    expect(screen.getByText('£10')).toBeInTheDocument();
    expect(screen.getByText('LSTM Model Predictions')).toBeInTheDocument();
    expect(screen.getByText('Unlimited Predictions')).toBeInTheDocument();
    expect(screen.getByText('Start Premium Plan')).toBeInTheDocument();
  });

  it('passes isAuthenticated prop to PlanCard', () => {
   
    const planCardSpy = jest.spyOn(require('../components/pricing/PlanCard'), 'default');

    render(<Pricing isAuthenticated={true} />);

    expect(planCardSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        isAuthenticated: true,
      }),
      {}
    );
  });
});
