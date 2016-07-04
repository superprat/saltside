SaltSide Test
=======================

A Basic HTTP Service with JSON API built with Node.js, Express, MongoDB. The service is a bird registry and it will support the following requests:

- `GET /birds` - List all birds
- `POST /birds` - Add a new bird
- `GET /birds/{id}` - Get details on a specific bird
- `DELETE /birds/{id}` - Delete a bird by id

 The MongoDB Database is hosted on mlabs.com. The Connection string is specified in .env file

Setting Up
=======================

```bash
# Get the latest snapshot
git clone https://github.com/superprat/saltside.git prateekgupte-saltside

# Change directory
cd prateekgupte-saltside

# Install NPM dependencies
npm install

# Start the server
node app.js
```

Test Suite
=======================


```bash
# To execute the unit tests make sure the server is running and then in another shell
mocha
```



