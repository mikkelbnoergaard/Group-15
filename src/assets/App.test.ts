import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test('Updating item quantity in the basket', () => {
  // Render the basket component
  const { getByTestId } = render(<Basket />);

  // Simulate updating the quantity of an item in the basket
  fireEvent.change(getByTestId('quantity-input'), { target: { value: '2' } });

  // Assert that the quantity is updated correctly
  expect(getByTestId('quantity-input').value).toBe('2');
});