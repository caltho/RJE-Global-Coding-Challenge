const csv = require('csvtojson');
const vd = require('./validation/validators');
const vdm = require('./validation/validationMaps');

// TASK 4: include path and file system modules
const fs = require('fs');
const path = require('path');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    const indexPath = path.join(__dirname, 'index.html');
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading the HTML file');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  }

  if (url === '/equipment-list') {
    csv().fromFile('./equipment_list.csv').then(async (jsonArray) => {
      let errors = [];
      await vd.validateEquipment(jsonArray, vdm.equipmentMap, errors);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(errors));
      console.log("Endpoint reached.");
    });
  }
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});