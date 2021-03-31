import { ConnectionPool } from "mssql"

let pool: ConnectionPool

export const getConnection = async ({
  server,
  database,
  user,
  password,
  multiSubnetFailover,
  requestTimeout
}: {
  server: string
  database: string
  user: string
  password: string
  multiSubnetFailover: boolean
  requestTimeout: number
}): Promise<ConnectionPool> => {
  if (!pool) {
    const config = {
      user,
      password,
      server,
      database,
      requestTimeout,
      pool: {
        min: 0,
        max: 3
      },
      options: {
        enableArithAbort: true,
        multiSubnetFailover
      } as any
    }
    pool = await new ConnectionPool(config).connect()
  }
  return pool
}
