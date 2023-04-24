import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { parseConfig } from './config.parse'

@Module({})
export class KlgTypeOrmModuleBuilder {
  static forRoot(): DynamicModule {
    const { typeOrmConnections } = parseConfig()

    const connections = []
    for (const typeOrmConnection of typeOrmConnections) {
      const connection = TypeOrmModule.forRoot(typeOrmConnection as any)
      connections.push(connection)
    }
    return {
      module: KlgTypeOrmModuleBuilder,
      imports: connections
    }
  }
}
