import React from 'react';
import { render, screen } from '@testing-library/react';
import Algo from '../components/ml-algo/Algo';

describe('Algo', () => {
  it('renders the Algo component', () => {
    render(<Algo />);


    expect(screen.getByText('Explore the Engine: Unveiling the Advanced Machine Learning Algorithms Behind The Predictions')).toBeInTheDocument();
    expect(screen.getByText('Sign up for more information')).toBeInTheDocument();

    expect(screen.getByText('Univariate Regression')).toBeInTheDocument();
    expect(screen.getByText('Univariate regression is a type of statistical analysis that predicts an outcome based on a single feature. In the context of our stock price prediction model, the only feature we use is the adjusted closing price. This means we\'re trying to predict future stock prices based solely on past closing prices.')).toBeInTheDocument();

    expect(screen.getByText('Multiple Regression')).toBeInTheDocument();
    expect(screen.getByText('Multivariate regression, on the other hand, is a more complex model that considers multiple features or variables. Instead of just looking at the closing price, it might also take into account factors like moving average, exponential moving avergae, or stochastic oscillator. This can potentially provide a more accurate prediction, as it considers a wider range of influences on stock prices.')).toBeInTheDocument();

    expect(screen.getByText('LSTM')).toBeInTheDocument();
    expect(screen.getByText('LSTM stands for Long Short-Term Memory. It\'s a type of recurrent neural network (RNN) that\'s particularly good at learning from sequences of data. In the case of stock prices, an LSTM can learn patterns over time, such as how prices tend to move up or down following certain events or at certain times of year.')).toBeInTheDocument();
  });
});
