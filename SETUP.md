### Setting up swagger
1. Initiate swagger module in `main.ts`.
```typescript

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as swStats from 'swagger-stats';

// Should put before listning to port

const config = new DocumentBuilder()
.setTitle('Example Service')
.setDescription('The example API description')
.setVersion('1.0')
.addTag('example')
.build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup(`/${globalPrefix}/docs`, app, document);
app.use(swStats.getMiddleware({swaggerSpec: (document), uriPath: `/${globalPrefix}/stats` }));


```
2. Enable plugin for swagger by adding cofig in `project.json`.

```json
"tsPlugins": [
    {
    "name": "@nestjs/swagger/plugin",
    "options": {
        "classValidatorShim": false,
        "introspectComments": true
    }
    }
```

3. Health and Readiness module can be enabled using following instruction
```typescript

// Readiness
ApplicationReadiness.getInstance().isReady = true;  // in main.ts


// Health
const health_config: IHealthConfig = {
  host: 'localhost',
  port: 3333,
  routePath: 'example'
}

CommonModule.register({ health: health_config }) // add config in app.module.ts

```