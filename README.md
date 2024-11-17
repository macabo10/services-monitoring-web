# services-monitoring-web
Services monitoring website for INT3105 55

## Package installation
```sh
cd server
npm ci
cd ..
cd client
npm ci
```
## Database
```sh
cd database
docker-compose up --build
```
## Client
```sh
cd client
npm run dev
```
## Server (PORT: 5000)
```sh
cd server
npm run dev
```
### Store Data Service
```sh
cd server
node .\services\store.js
```




