export default {
    DATABASE_URL: process.env.DATABASE_URL ?? '',
    APP_NAME: process.env.APP_NAME ?? '',
    APP_DOMAIN: process.env.APP_DOMAIN ?? '',
    MAIL_TEMPLATE_FOLDER: process.env.MAIL_TEMPLATE_FOLDER ?? '',
    MAILER_FROM_NAME: process.env.MAILER_FROM_NAME ?? '',
    MAILER_FROM_EMAIL: process.env.MAILER_FROM_EMAIL ?? '',
    MAILER_PORT: parseInt(process.env.MAILER_PORT ?? '4587'),
    MAILER_HOST: process.env.MAILER_HOST ?? '',
    MAILER_PASSWORD: process.env.MAILER_PASSWORD ?? '',
    MAILER_USER: process.env.MAILER_USER ?? '',
    NODE_ENV: process.env.NODE_ENV ?? '',
    S3_ACCESS_SECRET: process.env.S3_ACCESS_SECRET ?? '',
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY ?? '',
    S3_REGION: process.env.S3_REGION ?? '',
    S3_BUCKET: process.env.S3_BUCKET ?? '',
    APP_PORT: process.env.APP_PORT ?? 3000
}