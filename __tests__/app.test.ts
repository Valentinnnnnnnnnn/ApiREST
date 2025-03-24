import request from 'supertest'
import { app } from '../src/config/app'
import { test, describe, expect } from '@jest/globals'

describe('Test du point d\'entrée', () => {
    test('Catch all route', async () => {
        const res = await request(app).get('/')
        expect(res.body).toEqual('Hello World!')
    })
})