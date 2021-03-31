import { Context } from "aws-lambda"
import { getConnection } from "./pool"

export const handler = async (_: any, __: Context) => {
  const config = {
    server: process.env.MSSQL_SERVER || "",
    database: process.env.MSSQL_SERVER || "",
    user: process.env.MSSQL_USER || "",
    password: process.env.MSSQL_PASSWORD || "",
    multiSubnetFailover: false,
    requestTimeout: 10000
  }
  const con = await getConnection(config)
  const result = await con.query`select 1`
  return result.output
}
