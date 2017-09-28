import React from 'react';
import renderer from 'react-test-renderer';

import PlaidScreen from '../src/screens/PlaidScreen';


it('renders without crashing', () => {
  const rendered = renderer.create(<PlaidScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

describe('Addition', () => {
  it('can add numbers', () => {
    expect(2 + 2).toBe(4);
  });
});
