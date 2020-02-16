## Installation

### Add file

#### Download

- Google Drive: chichi-dev/cc-publis-docker/cc-publis-docker-secret.tar.gz

#### Extract

```
$ cd cc-publis-docker
$ tar zxvf cc-publis-docker-secret.tar.gz
```

- cc-oracle-api/app/src/config/
- cc-oracle-api/cmd/constants.js
- cc-oracle-api/oracle/
- cc-publis/src/config/

### Docker Build

#### Create the cc-publis:

```
$ cd cc-oracle-api
$ docker-compose up -d --build
```

#### Create the cc-oracle-api:

```
$ cd cc-publis
$ docker-compose up -d --build
```

### Form Component Code Generator

- Google Drive: chichi-dev/cc-publis-docker/cc-publis/
