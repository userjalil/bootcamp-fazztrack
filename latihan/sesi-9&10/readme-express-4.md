
# Latihan Sesi 9

Source code menggunakan express-fazztrack-4


## Run Locally

Clone the project
```bash
  git clone https://gitlab.com/ebyantoo/express-fazztrack-4
```

Masuk kedalam direktori project
```bash
  cd express-fazztrack-4
```

Install dependencies
```bash
  npm install
```

Rename file `.env.dev.example` jadi `.env.development` kemudian edit
```
DB_USERS="jalil"
DB_HOST="localhost"
DB_NAME="express_fazztrack-4"
DB_PASS="devops"

JWT_KEYS="jwt_secrets_key"

CLOUD_NAME="cloudinary_name"
CLOUD_KEYS="cloudinary_key"
CLOUD_SECRETS="cloudinary_sec"

REDIS_HOST="localhost"
REDIS_PASS="redis-wsl"
```

Edit file `server.js`, tambahkan kode berikut pada baris 23 setelah tanda `}`
```javasript
await database.sync()
```

Edit file `controllers/categori.js`, ubah kode pada baris 21
```javascript
name_categori: req.body.name_categori,
```

Edit file `controllers/users.js`, tambahkan kode berikut setelah baris 37
```javascript
role: req.body.role,
```

Install nodemon dalam ruang lingkup development
```bash
npm install nodemon --save-dev
```

Buat user dan database PostgreSQL sekaligus memberikan hak akses terhadap database
```bash
postgres=# create role jalil login password 'devops';
postgres=# create database express_fazztrack_4 with owner=jalil;
postgres=# GRANT ALL PRIVILEGES ON DATABASE express_fazztrack_3 TO jalil;
```

Install dan jalankan `redis-server` 
```bash
sudo apt install redis-server
sudo service redis-server start
```

Set password autentikasi redis server
```bash
redis-cli
CONFIG SET requirepass "redis_password"
AUTH "redis_password"
```

Jalankan aplikasi
```bash
  npm run dev
```
 


## Testing Postman

❗**Pengujian Run Locally dan docker compose, gunakan url `http://localhost:9000/path`** 

❗**Pengujian dengan kubernetes, gunakan url yang telah di generate oleh minikube**

\
- Tambah user
```json
{
    "name": "jalil",
    "role": "admin",
    "username": "jalil",
    "email": "jalil@example.com",
    "password": "manual"
}
```
![add user](https://github.com/userjalil/bootcamp-fazztrack/blob/main/latihan/sesi-9&10/screenshot/express-4/tambah%20user.png?raw=true)

- Login user
```json
{
    "username": "jalil",
    "password": "manual"
}
```
![login](https://github.com/userjalil/bootcamp-fazztrack/blob/main/latihan/sesi-9&10/screenshot/express-4/login.png?raw=true)


- Tambah kategori

Masukkan token yang didapat ketika login
![kategori 1](https://github.com/userjalil/bootcamp-fazztrack/blob/main/latihan/sesi-9&10/screenshot/express-4/kategori1.png?raw=true)

Tambahkan kategori
```json
{
    "name_categori": "minuman"
}
```
![kategori 1](https://github.com/userjalil/bootcamp-fazztrack/blob/main/latihan/sesi-9&10/screenshot/express-4/kategori2.png?raw=true)

- Tambah product

Masukkan token
![produk 1](https://github.com/userjalil/bootcamp-fazztrack/blob/main/latihan/sesi-9&10/screenshot/express-4/produk1.png?raw=true)

Tambahkan produk
![produk 2](https://github.com/userjalil/bootcamp-fazztrack/blob/main/latihan/sesi-9&10/screenshot/express-4/produk2.png?raw=true)

- Tampilkan data user
![get user](https://github.com/userjalil/bootcamp-fazztrack/blob/main/latihan/sesi-9&10/screenshot/express-4/tampil%20user.png?raw=true)

- Tampilkan data kategori
![get categori](https://github.com/userjalil/bootcamp-fazztrack/blob/main/latihan/sesi-9&10/screenshot/express-4/tampil%20kategori.png?raw=true)

- Tampilkan data produk
![get product](https://github.com/userjalil/bootcamp-fazztrack/blob/main/latihan/sesi-9&10/screenshot/express-4/tampil%20produk.png?raw=true)
## Build Docker Image

Buat direktori `app` lalu pindahkan source code aplikasi kedalam direktori tersebut
```bash
mkdir app
mv * app/
```

Buat file `Dockerfile`
```
FROM node:18-alpine
WORKDIR /app
COPY ./app/package*.json ./
RUN npm install && \
    npm install nodemon --save-dev
COPY ./app/. .
EXPOSE 9000
```

Build docker Image
```bash
docker build -t userjalil/fazztrack-express-4:1.0 .
```


## Running Docker Compose

Buat file `docker-compose.yml`
```yaml
version: '3.7'

services:
  redis:
    image: redis
    container_name: express4-redis
    command: bash -c "redis-server --requirepass redis-devops"
    ports:
      - "6379:6379"

  db_psql:
    image: postgres:14-alpine
    container_name: express4-postgres
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=jalil
      - POSTGRES_PASSWORD=devops
      - POSTGRES_DB=express_fazztrack_4

  app:
    image: userjalil/fazztrack-express-4:1.0
    container_name: express4-backend
    ports:
      - "9000:9000"
    environment:
      - NODE_ENV=dev
      - DB_USERS=jalil
      - DB_HOST=db_psql
      - DB_PASS=devops
      - DB_NAME=express_fazztrack_4
      - JWT_KEYS=secret
      - REDIS_HOST=redis
      - REDIS_PASS=redis-devops
    depends_on:
      - redis
      - db_psql
```

Jalankan aplikasi
```bash
docker-compose up -d
```

Lakukan pengujian [Testing Postman](#testing-postman)
## Push Image

Login ke docker hub
```bash
docker login
```

Masukkan username dan password akun docker hub
```code
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: userjalil
Password: 
Login Succeeded
```

Jalankan perintah `docker push <nama image>/<versi>`
```bash
docker push userjalil/fazztrack-express-4:1.0
```
## Running Kubernetes

Buat direktori `kubernetes` 
```bash
mkdir kubernetes
cd kubernetes
```

Buat file `secret.yaml`
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: express4-secret
type: Opaque
data:
  psql-user: amFsaWw=
  psql-pass: ZGV2b3Bz
  redis-pass: cmVkaXMtZGV2b3Bz
  jwt-key: c2VjcmV0
```

Jalankan file `secret.yaml`
```bash
kubectl create -f secret.yaml
```

Buat file `configmap.yaml`
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: express4-configmap
data:
  node_env: dev
  db_host: express4-postgres-service
  db_name: express_fazztrack_4
  redis_host: redis-service
```

Jalankan file `configmap.yaml`
```bash
kubectl create -f configmap.yaml
```

Buat file `deploy-redis.yaml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: express4-redis
  labels:
    app: redis
spec:
  selector:
    matchLabels:
      app: redis
  replicas: 1
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
        - name: redis
          image: redis
          command: ["redis-server", "--requirepass", "redis-devops"]
          ports:
            - containerPort: 6379
---
apiVersion: v1
kind: Service
metadata:
  name: redis-service
  labels:
    app: redis
spec:
  selector:
    app: redis
  ports:
    - port: 6379
      targetPort: 6379
```

Jalankan file `deploy-redis.yaml`
```bash
kubectl create -f deploy-redis.yaml
```

Buat file `statefulset-postgres.yaml`
```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: psql-stateful-volume
spec:
  accessModes:
    - ReadWriteOnce
  capacity:
    storage: 5Gi
  hostPath:
    path: /data/psql
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: psql-stateful-volume-claim
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  resources:
    requests:
      storage: 1Gi
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: express4-postgres
  labels:
    app: db-psql
spec:
  selector:
    matchLabels:
      app: db-psql
  serviceName: psql-express4-service
  replicas: 2
  template:
    metadata:
      labels:
        app: db-psql
    spec:
      containers:
        - name: db-psql
          image: postgres:14-alpine
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_USER
              valueFrom:
                secretKeyRef:
                  name: express4-secret
                  key: psql-user
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: express4-secret
                  key: psql-pass
            - name: POSTGRES_DB
              valueFrom:
                configMapKeyRef:
                  name: express4-configmap
                  key: db_name
          volumeMounts:
            - name: psql-stateful-volume-claim
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: psql-stateful-volume-claim
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
---
apiVersion: v1
kind: Service
metadata:
  name: express4-postgres-service
  labels:
    app: psql-service
spec:
  selector:
    app: db-psql
  ports:
    - port: 5432
      targetPort: 5432
```

Jalankan file `statefulset-postgres.yaml`
```bash
kubectl create -f statefulset-postgres.yaml
```

Buat file `deploy-express4.yaml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: express4-fazztrack
  labels:
    app: express-4
spec:
  replicas: 1
  selector:
    matchLabels:
      app: express-4
  template:
    metadata:
      labels:
        app: express-4
    spec:
      containers:
        - name: express-4
          image: userjalil/fazztrack-express-4:1.0
          resources:
            limits:
              memory: "128Mi"
              cpu: "500m"
          ports:
            - containerPort: 9000
          command: ["npm", "run", "dev"]
          env:
            - name: NODE_ENV
              valueFrom:
                configMapKeyRef:
                  name: express4-configmap
                  key: node_env
            - name: DB_USERS
              valueFrom:
                secretKeyRef:
                  name: express4-secret
                  key: psql-user
            - name: DB_HOST
              valueFrom:
                configMapKeyRef:
                  name: express4-configmap
                  key: db_host
            - name: DB_NAME
              valueFrom:
                configMapKeyRef:
                  name: express4-configmap
                  key: db_name
            - name: DB_PASS
              valueFrom:
                secretKeyRef:
                  name: express4-secret
                  key: psql-pass
            - name: REDIS_HOST
              valueFrom:
                configMapKeyRef:
                  name: express4-configmap
                  key: redis_host
            - name: REDIS_PASS
              valueFrom:
                secretKeyRef:
                  name: express4-secret
                  key: redis-pass
            - name: JWT_KEYS
              valueFrom:
                secretKeyRef:
                  name: express4-secret
                  key: jwt-key
---
apiVersion: v1
kind: Service
metadata:
  name: express4-service
spec:
  selector:
    app: express-4
  type: LoadBalancer
  ports:
    - port: 9000
      targetPort: 9000
      nodePort: 30005
```

Jalankan file `deploy-express.yaml`
```bash
kubectl create -f deploy-express.yaml
```

Expose service aplikasi
```bash
minikube service express4-service
```

Lakukan pengujian [Testing Postman](#testing-postman)