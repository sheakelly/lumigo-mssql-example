const util = require("util")
const mssql = require("mssql")

const setTimeoutP = util.promisify(setTimeout)

module.exports.handler = async (_, __) => {
  const con = await getConnection()
  await setTimeoutP(1000)
  await con.query`select 1`
  await setTimeoutP(2000)
  await con.query`select 2`
  await setTimeoutP(3000)
  await con.query`select 3`
  return "done"
}

const getConnection = async () => {
  const config = {
    user: process.env.MSSQL_USER || "",
    password: process.env.MSSQL_PASSWORD || "",
    server: process.env.MSSQL_SERVER || "",
    database: process.env.MSSQL_DATABASE || "",
    requestTimeout: 10000,
    pool: {
      min: 0,
      max: 3
    },
    options: {
      enableArithAbort: true,
      multiSubnetFailover: false
    }
  }
  return await new mssql.ConnectionPool(config).connect()
}
