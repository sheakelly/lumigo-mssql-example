import { Context } from "aws-lambda"
import { getConnection } from "./pool"
import { promisify } from "util"

const setTimeoutP = promisify(setTimeout)

export const handler = async (_: any, __: Context) => {
  const config = {
    server: process.env.MSSQL_SERVER || "",
    database: process.env.MSSQL_DATABASE,
    user: process.env.MSSQL_USER || "",
    password: process.env.MSSQL_PASSWORD || "",
    multiSubnetFailover: false,
    requestTimeout: 10000
  }
  const con = await getConnection(config)
  await setTimeoutP(1000)
  con.query`select 1`
  await setTimeoutP(2000)
  con.query`select 2`
  await setTimeoutP(3000)
  con.query`select 3`
  return "done"
}
