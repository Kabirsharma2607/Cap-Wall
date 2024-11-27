import neo4j, { Driver } from 'neo4j-driver'

let driver: Driver

declare global {
  var neo4j: Driver | undefined
}

if (process.env.NODE_ENV === 'production') {
  driver = neo4j.driver(
    process.env.NEO4J_URI!,
    neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!)
  )
} else {
  if (!global.neo4j) {
    global.neo4j = neo4j.driver(
      process.env.NEO4J_URI!,
      neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!)
    )
  }
  driver = global.neo4j
}

export { driver }

