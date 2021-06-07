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

