import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the header', () => {
  render(<App />);
  const element = screen.getByText(/mock/i);
  expect(element).toBeInTheDocument();
});

test('renders the imageGraph', () => {
  render(<App />)
  const element = screen.getByText(/image0/i)
  const element2 = screen.getByText(/image6/i)
  console.log(element);
  expect(element).toBeInTheDocument();
  expect(element2).toBeInTheDocument();
});

test('Renders the clickCount Graph', () => {
  render(<App />)
  const element = screen.getByText(/picture name/i);
  expect(element).toBeInTheDocument();
});



