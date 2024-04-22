import { sendOrderData } from '../remote/handleOrder.tsx';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('sendOrderData', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should send order data with correct parameters', async () => {
        const url = 'https://eowyyh7aavsptru.m.pipedream.net';
        const items = [{name: 'item1', quantity: 1}, {name: 'item2', quantity: 2}];
        const user = {name: 'John Doe', phone: '1234567890', email: 'john@example.com', address: '123 Street'};
        const orderComment = 'No comment';
        const marketingChecked = true;

        fetchMock.mockResponseOnce(JSON.stringify({data: '12345'}));

        sendOrderData(url, items, user, orderComment, marketingChecked);

        expect(fetchMock.mock.calls.length).toEqual(1);
        expect(fetchMock.mock.calls[0][0]).toEqual(url);

        if (fetchMock.mock.calls[0][1] && typeof fetchMock.mock.calls[0][1].body === 'string') {
            const fetchCallBody = JSON.parse(fetchMock.mock.calls[0][1].body);

            expect(fetchCallBody).toEqual({
                items,
                user,
                orderComment,
                marketingChecked
            });
        }
    });
});