// const origin = [0, 9]

// const query = {
//   // give the query a unique name
//   name: 'fetch-user',
//   text: 'SELECT * FROM user WHERE lat = $1',
//   values: [origin[0], origin[2]],

// !(async () => {

//   const { Client } = require('pg')
//   const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'duc',
//     password: '123456',
//     port: 5432,
//   })
//   await client.connect()

//   const text = ('SELECT * from bustest')
//   const res = await client.query("SELECT * from bustest as message", [message])

//   console.log(res.rows[0].message)

//   await client.end()

// })()
// function convert(obj, prefix, result) {
//   result = result || {};

//   // iterate over all properties
//   for (var prop in obj) {
//       if (obj.hasOwnProperty(prop)) {
//           var value = obj[prop];
//           // build the property name for the result object
//           // first level is without square brackets
//           var name = prefix ? prefix + '[' + prop + ']' : prop;
//           if (typeof value !== 'object') {
//               // not an object, add value to final result
//               result[name] = value;
//           }
//           else {
//               // object, go deeper
//               convert(value, name, result);
//           }
//       }
//   }

//   return result;
// }

const { Client } = require("pg")
 const client = new Client({
   user: "postgres",
   host: "34.126.69.133",
   database: "duc",
   password: "KhoaLuan1@3$",
   port: 5432,
 })
 async function execute() {
   await client.connect()
   const res = await client.query(`SELECT  
      d.seq, d.node, d.edge, d.cost, st_asgeojson(e.geom) AS edge_geom
  FROM  
      pgr_dijkstra(
          'SELECT gid AS id, source, target, length AS cost FROM duongbinhthanh',  
          (SELECT place_id FROM bus_stations WHERE ten_tram = 'Ngã Tư Chu Văn An' and id = 10824),                                                                                  
          (SELECT place_id FROM bus_stations WHERE ten_tram = 'Khu Du lịch Văn Thánh' AND id = 11010),
          FALSE
      ) as d                                         
      LEFT JOIN duongbinhthanh as e on d.edge = e.gid 
  ORDER BY d.seq; `)
 
   await client.end()

    const coors = res.rows.flatMap((r) => { return r.edge_geom })
 
  //  const coordinates = JSON.parse(res.rows).coordinates
  
  //  var converted_data = convert(res.rows);
   

  //  const coordinates = JSON.parse(coors)
   return coors

      }

      !(async () => {

        console.log(await execute())
      })()
