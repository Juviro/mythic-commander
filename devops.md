### Renew certificate:

`sudo service nginx stop`
`sudo certbot`
`sudo service nginx start`

## Auto renew certificate:

`echo "0 0,12 * * * root python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | sudo tee -a /etc/crontab > /dev/null`

### Nginx

- located at `/etc/nginx/`
- commands: `sudo service nginx start|stop|reload|restart|status`

### Disk Space

- Show disk space: `df -h`
- List directories by size: `sudo du -x / | sort -n | tail -40`
- Cache may take up more than 1 GB of diskspace. to delete, run `sudo rm -rf /usr/local/share/.cache/yarn/v6/`

### PM2

- To manually restart the backend, run `sudo ./backend/node_modules/.bin/pm2 reload backend`

### Database local

- install postgres `brew install postgresql@15`
- start postgres `brew services start postgresql@15`

### Dump db

- dump prod db: `pg_dump -h localhost -d mtg -f /home/juviro/dump.sql`
- copy dump file from server: `scp -i /Users/haukewitte/.ssh/sshhs juviro@juviro.ddns.net:/home/juviro/dump.sql .`
- delete db locally: `dropdb mtg`
- create db locally: `createdb mtg`
- import locally: `psql -d mtg -f dump.sql`

### Backup db

- download latest db file `scp -i /Users/haukewitte/.ssh/sshhs juviro@juviro.ddns.net:/opt/db-backup/BACKUP_FILE_NAME .`
