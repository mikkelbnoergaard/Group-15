import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { describe, expect, test,} from "vitest";
import App from "./App";

describe(App.name, () => {
    test("should display", () => {
        render(<App/>);
        const element =
            screen.getByText("Basket Total: $0.00");
        expect(element).toBeInTheDocument();
    });
});

describe('10% rebate test', () => {
    test('applies a 10% rebate if the total exceeds $300', async () => {
        // Render the App component
        render(<App />);

        // Wait for the items to load if necessary
        // For example, if your items are fetched and rendered asynchronously:
        // await waitFor(() => screen.findByText('5-Wheeled Bicycle'));

        // Increase the quantity of the 5-Wheeled Bicycle to 2
        const inputs = screen.getAllByRole('spinbutton');
// Assuming that the bicycle comes second in the order of items, select the second input
        const bicycleInput = inputs[1]; // This selects the second input assuming the bicycle is second
        fireEvent.change(bicycleInput, { target: { value: '2' } });

// Continue with the rest of your test


        // Assuming that there's a button to update the cart after changing the quantity
        // const updateCartButton = screen.getByRole('button', { name: /update cart/i });
        // userEvent.click(updateCartButton);

        // Verify that the subtotal reflects the price of two 5-Wheeled Bicycles
        // Check that the subtotal has been updated
        const subtotalElement = await screen.findByText(/subtotal/i);
        const subtotal = parseFloat(subtotalElement.textContent.replace(/[^0-9.-]+/g, ""));
        expect(subtotal).toBeGreaterThan(300);

        // Verify that the discount is applied
        const discountElement = await screen.findByText(/discount/i);
        const discount = parseFloat(discountElement.textContent.replace(/[^0-9.-]+/g, ""));
        const expectedDiscount = -40;

        expect(discount).toBeCloseTo(expectedDiscount);
    });
});
