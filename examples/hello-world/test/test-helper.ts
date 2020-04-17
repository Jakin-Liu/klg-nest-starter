import {TestDateBaseHelper} from '@akajs/mongoose'
import {INestApplication} from '@nestjs/common'
import * as supertest from 'supertest'
import {bootstrap} from './main'

process.env.NODE_ENV = 'test'
console.log('current env', process.env.NODE_ENV)

let app: INestApplication
let request: supertest.SuperTest<supertest.Test>

export async function genFixtures (template: object, nums: number, modelName: string, fixData?: (it: object, i: number) => any) {
  return TestDateBaseHelper.genFixtures(app as any, template, nums, modelName, fixData)
}

beforeAll(async function () {
  const res = await bootstrap()
  app = res.app
  request = res.request
  await TestDateBaseHelper.clearDatabase(app as any)
})

afterAll(async () => {
  await app.close()
})

export {app, request}