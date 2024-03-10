import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test,} from "vitest";
import App from "./App";

describe(App.name, () => {
    test("should display empty basket when opening the website", () => {
        render(<App/>);
        const element =
            screen.getByText("Basket Total: $0.00");
        expect(element).toBeInTheDocument();
    });
});

describe(App.name, () => {
    test("should display a Billing address section", () => {
        render(<App/>);
        const element =
            screen.getByText("Billing Address");
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




describe('Zip code to city test', () => {
    test('enters Ballerup for zip code 2750', async () => {
        render(<App />);

        // Assuming that your zip input has a label "Zip Code"
        const zipInput = screen.getByLabelText(/Zip Code/i);
        const cityInput = screen.getByLabelText(/City/i);

        // Simulate user typing the zip code
        fireEvent.change(zipInput, { target: { value: '2750' } });

        // Wait for the expected value to appear in the city input
        await waitFor(() => {
            expect(cityInput.value).toBe('Ballerup');
        });
    });
});

describe('every product will get added to basket', () => {
    test('products gets added to basket', async () => {
        // Render the App component
        render(<App />);

        // Wait for the items to load if necessary
        // For example, if your items are fetched and rendered asynchronously:
        // await waitFor(() => screen.findByText('5-Wheeled Bicycle'));

        // Increase the quantity of the 5-Wheeled Bicycle to 2
        const inputs = screen.getAllByRole('spinbutton');
// Assuming that the bicycle comes second in the order of items, select the second input
        const goatInput = inputs[0]; // This selects the second input assuming the bicycle is second
        fireEvent.change(goatInput, { target: { value: '1' } });
        const bicycleInput = inputs[1]; // This selects the second input assuming the bicycle is second
        fireEvent.change(bicycleInput, { target: { value: '1' } });
        const songbookInput = inputs[2]; // This selects the second input assuming the bicycle is second
        fireEvent.change(songbookInput, { target: { value: '1' } });
        const cowInput = inputs[3]; // This selects the second input assuming the bicycle is second
        fireEvent.change(cowInput, { target: { value: '1' } });
        const antilopineKangarooInput = inputs[4]; // This selects the second input assuming the bicycle is second
        fireEvent.change(antilopineKangarooInput, { target: { value: '1' } });
        const greyKangarooInput = inputs[5]; // This selects the second input assuming the bicycle is second
        fireEvent.change(greyKangarooInput, { target: { value: '1' } });
        const hoppopotamusInput = inputs[6]; // This selects the second input assuming the bicycle is second
        fireEvent.change(hoppopotamusInput, { target: { value: '1' } });
        const footballInput = inputs[7]; // This selects the second input assuming the bicycle is second
        fireEvent.change(footballInput, { target: { value: '1' } });
        const squirrelInput = inputs[8]; // This selects the second input assuming the bicycle is second
        fireEvent.change(squirrelInput, { target: { value: '1' } });
        const fentanylInput = inputs[9]; // This selects the second input assuming the bicycle is second
        fireEvent.change(fentanylInput, { target: { value: '1' } });
        const toothbrushInput = inputs[10]; // This selects the second input assuming the bicycle is second
        fireEvent.change(toothbrushInput, { target: { value: '1' } });
        const blobfishInput = inputs[11]; // This selects the second input assuming the bicycle is second
        fireEvent.change(blobfishInput, { target: { value: '1' } });
        const tetherballInput = inputs[12]; // This selects the second input assuming the bicycle is second
        fireEvent.change(tetherballInput, { target: { value: '1' } });
        const chargerInput = inputs[13]; // This selects the second input assuming the bicycle is second
        fireEvent.change(chargerInput, { target: { value: '1' } });
        const sodaInput = inputs[14]; // This selects the second input assuming the bicycle is second
        fireEvent.change(sodaInput, { target: { value: '1' } });
        const flightSuitInput = inputs[15]; // This selects the second input assuming the bicycle is second
        fireEvent.change(flightSuitInput, { target: { value: '1' } });
        const panInput = inputs[16]; // This selects the second input assuming the bicycle is second
        fireEvent.change(panInput, { target: { value: '1' } });


// Continue with the rest of your test


        // Assuming that there's a button to update the cart after changing the quantity
        // const updateCartButton = screen.getByRole('button', { name: /update cart/i });
        // userEvent.click(updateCartButton);

        // Verify that the subtotal reflects the price of two 5-Wheeled Bicycles
        // Check that the subtotal has been updated
        const subtotalElement = await screen.findByText(/subtotal/i);
        const subtotal = parseFloat(subtotalElement.textContent.replace(/[^0-9.-]+/g, ""));
        const expectedSubtotal = 2277.84;

        expect(subtotal).toBeCloseTo(expectedSubtotal);
    });
});
