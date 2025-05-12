import neo4j, { Driver } from "neo4j-driver";

let driver: Driver;

declare global {
  interface Global {
    _neo4jDriver?: Driver;
  }

  // This is necessary in TypeScript to extend globalThis properly
  namespace NodeJS {
    interface Global {
      _neo4jDriver?: Driver;
    }
  }
}

// Use globalThis to store the singleton
const globalRef = globalThis as typeof globalThis & { _neo4jDriver?: Driver };

if (process.env.NODE_ENV === "production") {
  driver = neo4j.driver(
    process.env.NEO4J_URI!,
    neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!)
  );
} else {
  if (!globalRef._neo4jDriver) {
    globalRef._neo4jDriver = neo4j.driver(
      process.env.NEO4J_URI!,
      neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!)
    );
  }
  driver = globalRef._neo4jDriver;
}

export { driver };
