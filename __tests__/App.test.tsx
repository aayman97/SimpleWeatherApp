/**
 * @format
 */

import 'react-native';
import React, {act} from 'react';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import {fireEvent, render, waitFor} from '@testing-library/react-native';
import CitySelectorScreen from '../src/Screens/CitySelectorScreen';

import axios from 'axios';

jest.mock('axios');

jest.useFakeTimers();
jest.mock('react-native-device-info', () => {
  return {
    __esModule: true,
    default: {
      getVersion: jest.fn(() => {}),
      getBuildNumber: jest.fn(() => {}),
      getUniqueId: jest.fn().mockImplementation(() => Promise.resolve()),
    },
  };
});

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: mockedNavigate}),
}));

it('should display input field after clicking city button', async () => {
  // @ts-expect-error
  const {getByText, getByTestId} = render(<CitySelectorScreen />);

  const addCityButton = getByTestId('Add_City_Button');

  fireEvent.press(addCityButton);

  const baseModal = getByTestId('base_modal_add_city');

  expect(baseModal).toBeTruthy();
});
