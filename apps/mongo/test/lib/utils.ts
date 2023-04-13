import request, { Response } from 'supertest';

export interface Headers {
  token?: string;
}

export function expectResponseFailed(res: Response) {
  const data = res.body;

  expect(typeof data.name).toBe('string');
  expect(typeof data.message).toBe('string');
  expect(typeof data.stack).toBe('string');
  expect(typeof data.timestamp).toBe('string');
  expect(typeof data.path).toBe('string');
}

export function withHeadersBy(
  headers: Headers,
  options?: Partial<Record<keyof Headers, boolean>>,
) {
  return function withHeaders(req: request.Test) {
    return setHeaders(req, headers, options);
  };
}

export function getHeadersFrom(res: Response, headers: Headers = {}): Headers {
  const token = headers.token;
  return {
    token,
  };
}

export async function fetchHeaders(req: request.SuperTest<request.Test>) {
  // const res = await req.get('/health-check').expect(200);
  return {}; // getHeadersFrom(res);
}

export function setHeaders(
  req: request.Test,
  headers: Headers,
  options: Partial<Record<keyof Headers, boolean>> = {},
) {
  if (headers.token && !(typeof options.token !== 'undefined')) {
    req.auth(headers.token, { type: 'bearer' });
  }
  return req;
}

export function getResponseData(res: Response) {
  const body = res.body;
  return body;
}
