import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import { describe, expect, test} from "vitest";
import App from "../components/App.tsx";
import {calculateDiscounts, getTotalAmount,} from "../components/Total.tsx";


describe("App", () => {
    test("should display a Delivery Address section", async () => {
        render(<App/>);
        await screen.findByText("Go to checkout")
        const element =
            screen.getByText("Delivery address");
        expect(element).toBeInTheDocument();
    });
});

describe('10% rebate test', () => {
    test('applies a 10% rebate if the total exceeds $300', async () => {
        render(<App  />);
        await screen.findByText("Go to checkout")
        const items1 = [
            {name: "goat", price: 300, quantity: 1 },
        ];
        expect(calculateDiscounts(items1)).toBe(30);
    });
    });

describe('Zip code to city test and Customer information navigation works', () => {
    test('enters Ballerup for zip code 2750', async () => {
        render(<App />);
        await screen.findByText("Go to checkout")
        const button = screen.getByText('Go to checkout');
        fireEvent.click(button);
        const zipInput = screen.getByLabelText(/Zip Code/i);
        const cityInput = screen.getByLabelText(/City/i);
        fireEvent.change(zipInput, { target: { value: '2750' } });
        await waitFor(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            expect(cityInput.value).toBe('Ballerup');
        });
    });
});

describe('every product will get added to basket', () => {
    test('products gets added to basket', async () => {
        render(<App />);
        await screen.findByText("Go to checkout")
        const inputs = await screen.findAllByRole('spinbutton');
        const goatInput = inputs[0];
        fireEvent.change(goatInput, { target: { value: '1' } });
        const bicycleInput = inputs[1];
        fireEvent.change(bicycleInput, { target: { value: '1' } });
        const songbookInput = inputs[2];
        fireEvent.change(songbookInput, { target: { value: '1' } });
        const cowInput = inputs[3];
        fireEvent.change(cowInput, { target: { value: '1' } });
        const chickenInput = inputs[4];
        fireEvent.change(chickenInput, { target: { value: '1' } });
        const greyKangarooInput = inputs[5];
        fireEvent.change(greyKangarooInput, { target: { value: '1' } });
        const footballInput = inputs[6];
        fireEvent.change(footballInput, { target: { value: '1' } });
        const toothbrushInput = inputs[7];
        fireEvent.change(toothbrushInput, { target: { value: '1' } });
        const subtotalElement = await screen.findByText(/556.14/i);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
        const subtotal = parseFloat(subtotalElement.textContent.replace(/[^0-9.-]+/g, ""));
        const expectedSubtotal = 556.14;
        expect(subtotal).toBeCloseTo(expectedSubtotal);
    });
});


describe('calculateDiscounts function', () => {
    test('should return correct discount amount for items', () => {
        // Test case 1: items with quantities less than or equal to 3
        const items1 = [
            {name: "goat", price: 10, quantity: 2 },
            {name: "goat1", price: 20, quantity: 1 },
        ];
        expect(calculateDiscounts(items1)).toBe(0); // No discount expected

        // Test case 2: items with quantities greater than 3
        const items2 = [
            {name: "goat", price: 10, quantity: 4 }, // quantity > 3
            {name: "goat1", price: 20, quantity: 2 },
        ];
        // Expected discount: (10 * 0.05 * 4) = 2
        expect(calculateDiscounts(items2)).toBe(2);

        // Test case 3: items with subtotal greater than 300
        const items3 = [
            {name: "goat", price: 50, quantity: 2 },
            {name: "goat1", price: 100, quantity: 3 },
        ];
        // Expected discount: (50 * 2 + 100 * 3) * 0.10 = 40
        expect(calculateDiscounts(items3)).toBe(40);
    });
});

describe('getTotalAmount function', () => {
    test('should return correct subtotal for items', () => {
        // Mock items data for testing
        const items = [
            {name: "goat", price: 10, quantity: 3 },
            {name: "goat1", price: 20, quantity: 1 },
        ];

        // Test getTotalAmount function with the mock items
        expect(getTotalAmount(items)).toBe(50); // Subtotal for the provided items

    });
});

describe('amountNeedForDiscount test', () => {
    test('shows true price for discount', async () => {
        render(<App />);
        await screen.findByText("Go to checkout")
        const inputs = await screen.findAllByRole('spinbutton');
        const goatInput = inputs[0]; // Assuming the goat item is the first in the list
        fireEvent.change(goatInput, { target: { value: '1' } });
        const element = await screen.findByText(/add \$295.01 more to your basket for a 10% discount!/i);
        expect(element).toBeInTheDocument();
    });
});

describe('discountMessage test', () => {
    test('Displays the right message', async () => {
        render(<App />);
        await screen.findByText("Go to checkout")
        const inputs = await screen.findAllByRole('spinbutton');
        const goatInput = inputs[0];
        fireEvent.change(goatInput, { target: { value: '3' } });
        const element = screen.getByText(/You only need one more to get a 5% discount!/i);
        expect(element).toBeInTheDocument();
    });
});

describe('validatePhone shows error message for too short input', () => {
    test('shows error message for short phone number', async () => {
        render(<App/>);
        await screen.findByText("Go to checkout")
        // Simulate user input of an invalid phone number
        const button = screen.getByText('Go to checkout');
        fireEvent.click(button);
        const phoneInput = screen.getByLabelText(/Phone Number\*/i); // Get the phone input by its label
        fireEvent.change(phoneInput, {target: {value: '1234'}}); // Fire change event to simulate user input

        // Use findByText to wait for the error message to appear in the document asynchronously
        const errorMessage = await screen.findByText("Must be 8 digits");

        // Assert that the error message is in the document
        expect(errorMessage).toBeInTheDocument();
    });
});

describe('validatePhone shows error message for too long a number', () => {
    test('shows error message for too long phone number', async () => {
        render(<App/>);
        await screen.findByText("Go to checkout")
        const button = screen.getByText('Go to checkout');
        fireEvent.click(button);
        // Simulate user input of an invalid phone number
        const phoneInput = screen.getByLabelText(/Phone Number\*/i); // Get the phone input by its label
        fireEvent.change(phoneInput, {target: {value: '123456780'}}); // Fire change event to simulate user input
        // Use findByText to wait for the error message to appear in the document asynchronously
        const errorMessage = await screen.findByText("Must not exceed 8 digits");
        // Assert that the error message is in the document
        expect(errorMessage).toBeInTheDocument();
    });
});

describe('validateCompanyVAT shows error message if number isnt 8 inputs', () => {
    test('shows error message for uncomplete Company vat number', async () => {
        render(<App/>);
        await screen.findByText("Go to checkout")
        const button = screen.getByText('Go to checkout');
        fireEvent.click(button);
        // Simulate user input of an invalid phone number
        const phoneInput = screen.getByLabelText(/Company VAT:/i); // Get the phone input by its label
        fireEvent.change(phoneInput, {target: {value: '12345'}}); // Fire change event to simulate user input

        // Use findByText to wait for the error message to appear in the document asynchronously
        const errorMessage = await screen.findByText("The VAT number must be 8 digits");

        // Assert that the error message is in the document
        expect(errorMessage).toBeInTheDocument();
    });
});
describe('validateEmail shows error message if illegal email address', () => {
    test('shows error message if illegal email address', async () => {
        render(<App/>);
        await screen.findByText("Go to checkout")
        const button = screen.getByText('Go to checkout');
        fireEvent.click(button);
        // Simulate user input of an invalid phone number
        const phoneInput = screen.getByLabelText(/Email\*/i); // Get the phone input by its label
        fireEvent.change(phoneInput, {target: {value: 'lola 123@hotmail.com'}}); // Fire change event to simulate user input

        // Use findByText to wait for the error message to appear in the document asynchronously
        const errorMessage = await screen.findByText("Invalid email");

        // Assert that the error message is in the document
        expect(errorMessage).toBeInTheDocument();
    });
});
describe('validateZipcode shows error message if zipcode is not 4 digits', () => {
    test('shows error message if zipcode is not 4 digits', async () => {
        render(<App/>);
        await screen.findByText("Go to checkout")
        const button = screen.getByText('Go to checkout');
        fireEvent.click(button);
        // Simulate user input of an invalid phone number
        const zipInput = screen.getByLabelText(/Zip Code\*/i); // Get the phone input by its label
        fireEvent.change(zipInput, {target: {value: '321'}}); // Fire change event to simulate user input

        // Use findByText to wait for the error message to appear in the document asynchronously
        const errorMessage = await screen.findByText("Postcode must be 4 digits");

        // Assert that the error message is in the document
        expect(errorMessage).toBeInTheDocument();
    });
});
    describe('test to see if the back button works', () => {
        test('testing back button', async () => {
            render(<App />);
            await screen.findByText("Go to checkout")
            const button = screen.getByText('Go to checkout');
            fireEvent.click(button);
            const button2 = screen.getByText('Back');
            fireEvent.click(button2);
            const Goat = await screen.findByText("Goat");
            expect(Goat).toBeInTheDocument();
    });
    });
describe('testing continue button', () => {
    test('Testing that the continue button works', async () => {
        render(<App/>);
        await screen.findByText("Go to checkout")
        const button = screen.getByText('Go to checkout');
        fireEvent.click(button);
        const zipInput = screen.getByLabelText(/Zip Code\*/i); // Get the phone input by its label
        fireEvent.change(zipInput, {target: {value: '2100'}});
        const addressInput = screen.getByLabelText(/Address Line 1\*/i); // Get the phone input by its label
        fireEvent.change(addressInput, {target: {value: 'nyborhadde 4'}});
        const nameInput = screen.getByLabelText(/Name\*/i); // Get the phone input by its label
        fireEvent.change(nameInput, {target: {value: 'jaylo'}});
        const phoneInput = screen.getByLabelText(/Phone Number\*/i); // Get the phone input by its label
        fireEvent.change(phoneInput, {target: {value: '12345678'}});
        const emailInput = screen.getByLabelText(/Email\*/i); // Get the phone input by its label
        fireEvent.change(emailInput, {target: {value: 'niklas@hotmail.com'}});
        const button2 = screen.getByText('Continue');
        fireEvent.click(button2);
        const FindTermsandConditionsmessage = await screen.findByText("Select delivery address:");
        // Assert that the error message is in the document
        expect(FindTermsandConditionsmessage).toBeInTheDocument();
    });
});

describe('testing view Terms and conditions popup', () => {
    test('Testing the term and conditions', async () => {
        render(<App/>);
        await screen.findByText("Go to checkout")
        const button = screen.getByText('Go to checkout');
        fireEvent.click(button);
        const zipInput = screen.getByLabelText(/Zip Code\*/i); // Get the phone input by its label
        fireEvent.change(zipInput, {target: {value: '2100'}});
        const addressInput = screen.getByLabelText(/Address Line 1\*/i); // Get the phone input by its label
        fireEvent.change(addressInput, {target: {value: 'nyborhadde 4'}});
        const nameInput = screen.getByLabelText(/Name\*/i); // Get the phone input by its label
        fireEvent.change(nameInput, {target: {value: 'jaylo'}});
        const phoneInput = screen.getByLabelText(/Phone Number\*/i); // Get the phone input by its label
        fireEvent.change(phoneInput, {target: {value: '12345678'}});
        const emailInput = screen.getByLabelText(/Email\*/i); // Get the phone input by its label
        fireEvent.change(emailInput, {target: {value: 'niklas@hotmail.com'}});
        const button2 = screen.getByText('Continue');
        fireEvent.click(button2);
        const image = await screen.getByAltText('Kumasi, Ghana');
        fireEvent.click(image);
        const button4 = screen.getByText('Continue');
        fireEvent.click(button4);
        const FindinTermsandConditionspopup = await screen.findByText("View Terms and Conditions");
        // Assert that the error message is in the document
        expect(FindinTermsandConditionspopup).toBeInTheDocument();
    });
});


