###Renew certificate:

`sudo service nginx stop`
`sudo certbot`
`service nginx start`

###Nginx

- located at `/etc/nginx/`
- commands: `sudo service nginx start|stop|restart|status`

###Yarn

- Cache may take up more than 1 GB of diskspace
- To delete, run `sudo rm -rf /usr/local/share/.cache/yarn/v6/`

###PM2

- To manually restart the backend, run `sudo ./backend/node_modules/.bin/pm2 reload backend`

###Dump db

- dump prod db: `pg_dump -h mtg.cr9n9thq5jyt.eu-central-1.rds.amazonaws.com -U hauke -f dump.sql mtg`
- create db locally: `createdb mtg`
- import locally: `psql -d mtg -f dump.sql`
