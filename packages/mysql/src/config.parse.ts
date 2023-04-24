import * as _ from 'lodash'
import * as config from 'config'

export type typeOrmConnection = {
  name: string
  type: string
  host: string
  port: string
  username: string
  password: string
  database: string
  entities: string[]
  synchronize: boolean
  logging: string
}

export function parseConfig(): {
  typeOrmConnections: typeOrmConnection[]
} {
  let typeOrmConnections: typeOrmConnection[] = []

  try {
    if (config.has('typeOrm.connections')) {
      typeOrmConnections = config.get('typeOrm.connections')
    }
  } catch (error) {
    throw new Error('typeOrm connections 不能为空')
  }

  if (_.isEmpty(typeOrmConnections)) throw new Error('mongodb config 不能为空')

  return { typeOrmConnections }
}
