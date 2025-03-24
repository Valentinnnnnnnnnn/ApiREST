import request from 'supertest'
import { app } from '../src/app'

describe('Test du point d\'entrée', () => {
    test('Catch all route', async () => {
        const res = await request(app).get('/')
        expect(res.body.message).toEqual('Hello World!')
    })
})