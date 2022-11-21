import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {getTestData} from "./models/data";

test('renders learn react link', () => {
  render(<App presentation={getTestData()}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
