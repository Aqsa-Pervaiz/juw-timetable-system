# Deployment Guide
## JUW Timetable Management System

---

## 📦 Deployment Options

### Option 1: Local Deployment (Development/Testing)

**Requirements:**
- Node.js 16+
- MySQL 8.0+
- Web Browser

**Steps:**

1. **Setup Database**
   ```bash
   # Login to MySQL
   mysql -u root -p
   
   # Create database
   CREATE DATABASE juw_timetable;
   USE juw_timetable;
   
   # Import schema
   source database/schema.sql;
   
   # Verify tables
   SHOW TABLES;
   ```

2. **Configure Environment**
   ```bash
   # Copy example environment file
   cp .env.example .env
   
   # Edit .env with your settings
   nano .env
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Server**
   ```bash
   # Production mode
   npm start
   
   # Development mode (with auto-reload)
   npm run dev
   ```

5. **Access Application**
   ```
   http://localhost:3000
   ```

---

### Option 2: Cloud Deployment (Heroku)

**Prerequisites:**
- Heroku account
- Heroku CLI installed

**Steps:**

1. **Prepare Application**
   ```bash
   # Create Procfile
   echo "web: node backend/server.js" > Procfile
   
   # Update package.json
   # Add: "start": "node backend/server.js"
   ```

2. **Setup Heroku**
   ```bash
   # Login to Heroku
   heroku login
   
   # Create app
   heroku create juw-timetable
   
   # Add MySQL addon
   heroku addons:create cleardb:ignite
   ```

3. **Configure Environment**
   ```bash
   # Get database URL
   heroku config:get CLEARDB_DATABASE_URL
   
   # Set environment variables
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   
   # Import database schema
   heroku run mysql -h hostname -u username -p database_name < database/schema.sql
   ```

5. **Open Application**
   ```bash
   heroku open
   ```

---

### Option 3: VPS Deployment (Ubuntu Server)

**Requirements:**
- Ubuntu 20.04+ VPS
- Root/sudo access
- Domain name (optional)

**Steps:**

1. **Setup Server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install MySQL
   sudo apt install mysql-server -y
   sudo mysql_secure_installation
   
   # Install PM2
   sudo npm install -g pm2
   ```

2. **Upload Application**
   ```bash
   # Using SCP
   scp -r juw-timetable-system user@server_ip:/var/www/
   
   # Or using Git
   cd /var/www/
   git clone <your-repo-url>
   ```

3. **Setup Database**
   ```bash
   sudo mysql
   CREATE DATABASE juw_timetable;
   CREATE USER 'juw_user'@'localhost' IDENTIFIED BY 'strong_password';
   GRANT ALL PRIVILEGES ON juw_timetable.* TO 'juw_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   
   # Import schema
   mysql -u juw_user -p juw_timetable < /var/www/juw-timetable-system/database/schema.sql
   ```

4. **Configure Application**
   ```bash
   cd /var/www/juw-timetable-system
   npm install --production
   
   # Create .env file
   nano .env
   # (Add your configuration)
   ```

5. **Start with PM2**
   ```bash
   pm2 start backend/server.js --name juw-timetable
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx (Optional)**
   ```bash
   sudo apt install nginx -y
   
   # Create Nginx config
   sudo nano /etc/nginx/sites-available/juw-timetable
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   ```bash
   sudo ln -s /etc/nginx/sites-available/juw-timetable /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Setup SSL (Optional)**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d yourdomain.com
   ```

---

### Option 4: Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "backend/server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - DB_USER=root
      - DB_PASSWORD=password
      - DB_NAME=juw_timetable
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: juw_timetable
    volumes:
      - mysql_data:/var/lib/mysql
      - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    ports:
      - "3306:3306"

volumes:
  mysql_data:
```

**Deploy:**
```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Update JWT_SECRET in .env
- [ ] Enable HTTPS/SSL
- [ ] Setup firewall rules
- [ ] Enable database backups
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Add monitoring/logging
- [ ] Setup automatic updates
- [ ] Review user permissions

---

## 📊 Monitoring

**PM2 Monitoring:**
```bash
pm2 monit
pm2 logs juw-timetable
```

**MySQL Monitoring:**
```bash
mysql -u root -p
SHOW PROCESSLIST;
SHOW STATUS;
```

**Nginx Logs:**
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## 🔄 Backup & Restore

**Database Backup:**
```bash
# Backup
mysqldump -u root -p juw_timetable > backup_$(date +%Y%m%d).sql

# Restore
mysql -u root -p juw_timetable < backup_20240103.sql
```

**Automated Backups:**
```bash
# Create backup script
nano /usr/local/bin/backup-juw.sh
```

Add:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u root -pYOUR_PASSWORD juw_timetable > /backups/juw_$DATE.sql
find /backups -name "juw_*.sql" -mtime +7 -delete
```

```bash
chmod +x /usr/local/bin/backup-juw.sh

# Add to crontab (daily at 2 AM)
crontab -e
0 2 * * * /usr/local/bin/backup-juw.sh
```

---

## 🚀 Performance Optimization

1. **Database Indexing**
   - Verify all indexes are created
   - Monitor slow queries

2. **Caching**
   - Implement Redis for sessions
   - Cache frequently accessed data

3. **Compression**
   - Enable Gzip in Nginx
   - Minify CSS/JS

4. **CDN**
   - Use CDN for static assets
   - Optimize images

---

## 📞 Support

For deployment issues:
- Check logs first
- Verify all environment variables
- Test database connection
- Review firewall settings

---

**Deployment Completed! 🎉**
