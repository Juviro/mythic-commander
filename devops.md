###Renew certificate:

`sudo service nginx stop`
`sudo certbot`
`sudo service nginx start`

Auto renew (not tested - seems to not have worked):
`echo "0 0,12 * * * root python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | sudo tee -a /etc/crontab > /dev/null`

###Nginx

- located at `/etc/nginx/`
- commands: `sudo service nginx start|stop|reload|restart|status`

###Yarn

- Cache may take up more than 1 GB of diskspace
- To delete, run `sudo rm -rf /usr/local/share/.cache/yarn/v6/`

###PM2

- To manually restart the backend, run `sudo ./backend/node_modules/.bin/pm2 reload backend`

###Dump db

- dump prod db: `pg_dump -h mtg.cr9n9thq5jyt.eu-central-1.rds.amazonaws.com -U hauke -f dump.sql mtg`
- create db locally: `createdb mtg`
- import locally: `psql -d mtg -f dump.sql`
