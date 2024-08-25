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
  getWeatherForCountry: jest.fn().mockImplementation(() =>
    Promise.resolve({
      name: 'London',
      id: 111111,
      sys: {
        country: 'UK',
      },
    }),
  ),
}));

it('should display card if valid city is added ', async () => {
  // @ts-expect-error
  const {getByTestId} = render(<CitySelectorScreen />);

  const addCityButton = getByTestId('Add_City_Button');

  fireEvent.press(addCityButton);

  const baseModal = getByTestId('base_modal_add_city');

  const textInput = getByTestId('search_input');

  expect(textInput).toBeTruthy();

  fireEvent.changeText(textInput, 'London');
  fireEvent(textInput, 'onSubmitEditing');

  await waitFor(() => {
    //   expect(getByTestId('testID_error_message')).toBeTruthy();
    expect(getByTestId(`testID_London`)).toBeTruthy();
  });
});
