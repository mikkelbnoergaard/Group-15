import { sendOrderData } from '../remote/handleOrder.tsx';
import fetchMock from 'jest-fetch-mock';



describe('sendOrderData', () => {
    beforeEach(() => {
        fetchMock.enableMocks();
        fetchMock.resetMocks();
    });

    it('should send order data with correct parameters', async () => {
        const url = 'https://eowyyh7aavsptru.m.pipedream.net';
        const items = [{name: 'item1', quantity: 1}, {name: 'item2', quantity: 2}];
        const user = {name: 'Test', phone: '12341234', email: 'test@test.test', address: 'Testgade'};
        const orderComment = 'Jeg vil gerne have at den bliver leveret på hovedet';
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