import { Context } from "aws-lambda"
import { promisify } from "util"
import { ConnectionPool } from "mssql"

const setTimeoutP = promisify(setTimeout)

export const handler = async (_: any, __: Context) => {
  const con = await getConnection()
  await setTimeoutP(1000)
  con.query`select 1`
  await setTimeoutP(2000)
  con.query`select 2`
  await setTimeoutP(3000)
  con.query`select 3`
  return "done"
}

const getConnection = async (): Promise<ConnectionPool> => {
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
  } as any
  return await new ConnectionPool(config).connect()
}
