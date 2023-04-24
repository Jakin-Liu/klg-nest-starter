import { Module, INestApplication, Logger } from '@nestjs/common'
import { getRepositoryToken, getDataSourceToken } from '@nestjs/typeorm'
import { EntitySchema } from 'typeorm'
import * as Mock from 'mockjs'
import { parseConfig } from './config.parse'

export class MysqlTestDatabaseHelper {

  static async genFixtures(
    app: INestApplication,
    template: object,
    nums: number,
    modelName: EntitySchema,
    dataSource: string,
    fixData?: (it: object, i: number) => any
  ) {
    if (!fixData) fixData = (it: object, index: number) => it
    const model = app.get(getRepositoryToken(modelName, dataSource))
    const items = Array(nums)
      .fill(0)
      .map((it: object) => Mock.mock(template))
      .map(fixData)
    
    Logger.debug('initFixtures ', items.length + '')
    for (const item of items) {
      const res = await model.save(item)
    }
    return items
  }

  static async clearDatabase(app: INestApplication) {
    const { typeOrmConnections } = parseConfig()
    for (const c of typeOrmConnections) {
      const connect = app.get(getDataSourceToken(c.name))

      for (const repository of connect.manager.repositories) {

        const result = await repository.delete({})
        Logger.debug('result ', JSON.stringify(result))
      }
      

      // for (const key of Object.keys(connect.)) {
      //   Logger.debug('delete ', key + '')
      //   // await connect.collections[key].deleteMany({})
      // }
    }
  }
}