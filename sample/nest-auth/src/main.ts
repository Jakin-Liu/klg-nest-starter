import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as morgan from 'morgan'
import { ApplicationModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { TransformInterceptor } from '@kalengo/web'
import { registerKeycloak } from './keycloak'

async function bootstrap () {
  const app = await NestFactory.create(ApplicationModule)

  // request log
  app.use(morgan('tiny'))

  registerKeycloak(app)

  app.setGlobalPrefix('api/v1')

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Nest Starter')
    .setDescription('The Server API description')
    .setVersion('1.0')
    .addTag('starter')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  // 错误处理和返回值format
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(process.env.PORT || 3000)
  console.log(
    `Application(${process.env.NODE_ENV}) is running on: ${await app.getUrl()}`
  )
}

bootstrap()