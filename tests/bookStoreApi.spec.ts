import test, { expect } from "@playwright/test";

test.describe('Checkbox Page Tests', () => {
    interface GlobalState {
        token?: string
    }

    let globalState: GlobalState = {}

    test.beforeAll(async ({ request }) => {
        const response = await request.post('/Account/v1/GenerateToken', {
            data: {
                'userName': 'testuser',
                'password': '#TestUser12345',
            }
        });
        const body = await response.json();
        globalState.token = body.token
    });

    test('Get books', async ({ request }) => {
        const response = await request.get('/BookStore/v1/Books', {
            headers: {
                'Authorization': `Bearer ${globalState.token}`
            }
        });
        console.log(await response.json())
        expect(response.status()).toBe(200);
    });

    test('Create a user', async ({ request }) => {
        let response = await request.post('/Account/v1/User', {
            data: {
                'userName': 'testuser8',
                'password': '#TestUser12345',
            }
        });
        let responseBody = await response.json();
        let userID = responseBody.userID
        expect(response.status()).toBe(201);

        response = await request.post('/Account/v1/User', {
            data: {
                'userName': 'testuser8',
                'password': '#TestUser12345',
            }
        });
        expect(response.status()).toBe(406);

        response = await request.delete(`/Account/v1/User/${userID}`, {
            headers: {
                'Authorization': `Bearer ${globalState.token}`
            }
        });
        expect(response.status()).toBe(201);

    });

})