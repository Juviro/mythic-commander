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
