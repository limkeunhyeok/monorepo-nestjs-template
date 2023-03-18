// name: 실행 모드 이름
// script: 실행되는 파일
// instances: 프로세스 수
// autorestart: 재시작 on/off
// watch: watch on/off
// env: Node.js 환경변수

// command: pm2 start ecosystem.config.js typeorm
module.exports = {
  apps: [
    {
      name: 'typeorm',
      script: 'npm',
      args: 'run start:typeorm',
      env: {
        // server info
        NODE_ENV: 'dev',
        PORT: 3000,

        // swagger
        SERVER_NAME: 'typeorm-template',
        SERVER_VERSION: '1.0.0',
        SERVER_DESC: 'This server is a template using typeorm.',

        // typeorm
        TYPEORM_DB: 'typeorm-template',
        TYPEORM_PORT: 5432,
        TYPEORM_HOST: '127.0.0.1',
        TYPEORM_USER: 'root',
        TYPEORM_PASS: 'password',

        // token
        JWT_SECRET: 'keyboardCat',
      },
    },
  ],
};
