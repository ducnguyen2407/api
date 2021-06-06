/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const helloWorld = (req, res) => {
  let message = req.query.message || req.body.message || "Hello World!"
  res.status(200).send(message)

  // ket noi postgre sql

  // node.js
}

module.exports = {
  helloWorld,
}


helloWorld({}, {})