import app from './config/app';
import config from './config/config';


app.listen(config.APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server started on port ${config.APP_PORT} (${config.NODE_ENV})`);
});

