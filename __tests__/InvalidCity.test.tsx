import {fireEvent, render, waitFor} from '@testing-library/react-native';
import CitySelectorScreen from '../src/Screens/CitySelectorScreen';

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

jest.mock('../src/network/API-Functions', () => ({
  getWeatherForCountry: jest.fn().mockImplementation(() => Promise.reject()),
}));

it('should display error message if invalid city is added ', async () => {
  jest.setMock('../src/network/API-Functions', () => ({
    getWeatherForCountry: jest.fn().mockImplementation(() => Promise.reject()),
  }));
  // @ts-expect-error
  const {getByTestId} = render(<CitySelectorScreen />);

  const addCityButton = getByTestId('Add_City_Button');

  fireEvent.press(addCityButton);

  const baseModal = getByTestId('base_modal_add_city');

  const textInput = getByTestId('search_input');

  expect(textInput).toBeTruthy();

  fireEvent.changeText(textInput, 'aaaaaa');
  fireEvent(textInput, 'onSubmitEditing');

  await waitFor(() => {
    expect(getByTestId('testID_error_message')).toBeTruthy();
  });
});
