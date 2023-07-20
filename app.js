const csv = require('csvtojson');
const vd = require('./validation/validators');
const vdm = require('./validation/validationMaps');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  csv().fromFile('./equipment_list.csv').then(
    async (jsonArray) => {

        let errors = [];

        await vd.validateEquipment(jsonArray, vdm.equipmentMap, errors);

        res.end(JSON.stringify(errors))
        console.log("Endpoint reached.");
    } 
  )

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});