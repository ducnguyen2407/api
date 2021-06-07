/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const { Client } = require("pg")
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "duc",
  password: "123456",
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

  const coordinates = JSON.parse(res.rows[1].edge_geom).coordinates

  return coordinates
}

exports.helloWorld = async (req, res) => {
  const coordinates = await execute()

  res.status(200).json(coordinates);
}
