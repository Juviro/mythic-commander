import winstonServer from 'winston-dashboard';
import { LOG_DIR } from './logger';

winstonServer({
  path: LOG_DIR,
  logFiles: '/**/*.log',
  port: 4001,
  orderBy: 'timestamp',
});
