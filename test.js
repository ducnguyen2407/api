const { Client } = require("pg")
const client = new Client({
  user: "postgres",
  host: "34.126.69.133",
  database: "duc",
  password: "KhoaLuan1@3$",
  port: 5432,
})
async function execute(id1, id2) {
  await client.connect()
  const values = [id1, id2]
  const res = await client.query(
    `SELECT  
      d.seq, d.node, d.edge, d.cost, st_asgeojson(e.geom) AS edge_geom
  FROM  
      pgr_dijkstra(
          'SELECT gid AS id, source, target, length AS cost FROM duongbinhthanh',  
          (SELECT place_id FROM bus_stations WHERE id = $1),                                                                                  
          (SELECT place_id FROM bus_stations WHERE id = $2),
          FALSE
      ) as d                                         
      LEFT JOIN duongbinhthanh as e on d.edge = e.gid 
      where edge <> -1
  ORDER BY d.seq; `,
    values
  )

  await client.end()
  const coors = res.rows.flatMap((r) => {
    return JSON.parse(r.edge_geom).coordinates.flatMap((d) => d)
  })

  return coors
}

!(async () => {
  console.log(await execute(13132, 11010))
})()
