"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const main_config_1 = require("./configs/main.config");
const fastify = require("fastify");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const path_1 = require("path");
const static_1 = require("@fastify/static");
const multipart_1 = require("@fastify/multipart");
const global_http_exceptions_filter_1 = require("./common/filters/global-http-exceptions.filter");
const not_found_filter_1 = require("./common/filters/not-found.filter");
const common_1 = require("@nestjs/common");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const errors_interceptor_1 = require("./common/interceptors/errors.interceptor");
async function bootstrap() {
    const serverOptions = {
        logger: false,
        bodyLimit: 10588576
    };
    const instance = fastify.default(serverOptions);
    await instance.register(multipart_1.default, {
        limits: {
            fileSize: 200 * 1024,
        },
    });
    const nestApp = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter(instance));
    nestApp.setGlobalPrefix('api');
    nestApp.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204
    });
    await nestApp.register(static_1.default, {
        root: (0, path_1.join)(__dirname, '..', 'media'),
        prefix: '/media/'
    });
    nestApp.useGlobalFilters(...[new global_http_exceptions_filter_1.GlobalHttpExceptionFilter(), new not_found_filter_1.NotFoundFilter()]);
    const logger = new common_1.Logger();
    const globalInterceptors = [new transform_interceptor_1.TransformInterceptor(), new errors_interceptor_1.ErrorsInterceptor(logger)];
    nestApp.useGlobalInterceptors(...globalInterceptors);
    const port = process.env.PORT || main_config_1.default.api_port || 3000;
    console.log(`✅ Starting server on port ${port}`);
    await nestApp.listen(port, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map