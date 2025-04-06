/**
 * @format
 */

import React from 'react';
import { act, create } from 'react-test-renderer';
import { App } from '../src/app/App';

test('renders correctly', async () => {
  await act(() => {
    create(<App />);
  });
});
