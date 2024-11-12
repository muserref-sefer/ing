// web-test-runner.config.js
import koaRouter from '@koa/router';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';
import Koa from 'koa';
import * as process from 'process';

const app = new Koa();
const router = new koaRouter();

app.use(async (ctx, next) => {
  try {
    await next();  
  } catch (err) {
    ctx.status = err.status || 500;  
    ctx.body = { message: err.message };  
    ctx.app.emit('error', err, ctx);  
  }
});

router.get('/', (ctx) => {
  ctx.status = 200; 
  ctx.body = 'Hello from Koa!';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

export default {
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'esnext',
      format: 'esm',
      define: {
        'process.env.NODE_ENV': '"test"',
        'process': JSON.stringify(process), 
      },
    }),
  ],
  nodeResolve: true,
  files: ['src/**/*.test.ts'],
  browsers: [
    playwrightLauncher({ product: 'chromium', launchOptions: { headless: true } }),
  ], 
};
