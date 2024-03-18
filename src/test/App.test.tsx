import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test,} from "vitest";
import App from "../assets/App.tsx";

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

        render(<App  />);
        const inputs = screen.getAllByRole('spinbutton');
        const bicycleInput = inputs[1];
        fireEvent.change(bicycleInput, { target: { value: '2' } });
        const subtotalElement = await screen.findByText(/subtotal/i);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
        const subtotal = parseFloat(subtotalElement.textContent.replace(/[^0-9.-]+/g, ""));
        expect(subtotal).toBeGreaterThan(300);

        const discountElement = await screen.findByText(/discount/i);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
        const discount = parseFloat(discountElement.textContent.replace(/[^0-9.-]+/g, ""));
        const expectedDiscount = -40;
        expect(discount).toBeCloseTo(expectedDiscount);
    });
});




describe('Zip code to city test', () => {
    test('enters Ballerup for zip code 2750', async () => {
        render(<App />);
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
        const inputs = screen.getAllByRole('spinbutton');
        const goatInput = inputs[0];
        fireEvent.change(goatInput, { target: { value: '1' } });
        const bicycleInput = inputs[1];
        fireEvent.change(bicycleInput, { target: { value: '1' } });
        const songbookInput = inputs[2];
        fireEvent.change(songbookInput, { target: { value: '1' } });
        const cowInput = inputs[3];
        fireEvent.change(cowInput, { target: { value: '1' } });
        const antilopineKangarooInput = inputs[4];
        fireEvent.change(antilopineKangarooInput, { target: { value: '1' } });
        const greyKangarooInput = inputs[5];
        fireEvent.change(greyKangarooInput, { target: { value: '1' } });
        const hoppopotamusInput = inputs[6];
        fireEvent.change(hoppopotamusInput, { target: { value: '1' } });
        const footballInput = inputs[7];
        fireEvent.change(footballInput, { target: { value: '1' } });
        const squirrelInput = inputs[8];
        fireEvent.change(squirrelInput, { target: { value: '1' } });
        const fentanylInput = inputs[9];
        fireEvent.change(fentanylInput, { target: { value: '1' } });
        const toothbrushInput = inputs[10];
        fireEvent.change(toothbrushInput, { target: { value: '1' } });
        const blobfishInput = inputs[11];
        fireEvent.change(blobfishInput, { target: { value: '1' } });
        const tetherballInput = inputs[12];
        fireEvent.change(tetherballInput, { target: { value: '1' } });
        const chargerInput = inputs[13];
        fireEvent.change(chargerInput, { target: { value: '1' } });
        const sodaInput = inputs[14];
        fireEvent.change(sodaInput, { target: { value: '1' } });
        const flightSuitInput = inputs[15];
        fireEvent.change(flightSuitInput, { target: { value: '1' } });
        const panInput = inputs[16];
        fireEvent.change(panInput, { target: { value: '1' } });

        const subtotalElement = await screen.findByText(/subtotal/i);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
        const subtotal = parseFloat(subtotalElement.textContent.replace(/[^0-9.-]+/g, ""));
        const expectedSubtotal = 2277.84;

        expect(subtotal).toBeCloseTo(expectedSubtotal);
    });
});
