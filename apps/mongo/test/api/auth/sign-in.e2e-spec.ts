import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { expectTokenResponseSucceed } from '../../expectation/auth';
import { fetchHeaders, getResponseData, withHeadersBy } from '../../lib/utils';

describe('Auth Login API (e2e)', () => {
  let app: INestApplication;
  let req: request.SuperTest<request.Test>;

  const rootApiPath = '/auth';

  let headers: any;
  let withHeaders: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    req = request(app.getHttpServer());

    headers = await fetchHeaders(req);
    withHeaders = await withHeadersBy(headers);
  });

  describe('POST /auth/login', () => {
    const apiPath = `${rootApiPath}/login`;

    it('success - login (200)', async () => {
      // given
      const params = {
        email: 'admin@example.com',
        password: 'password',
      };

      // when
      const res = await withHeaders(req.post(apiPath).send(params)).expect(201);

      // then
      const result = getResponseData(res);
      expectTokenResponseSucceed(result);
    });
  });
});
