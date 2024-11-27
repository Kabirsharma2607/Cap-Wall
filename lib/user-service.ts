import { driver } from './neo4j'
import { hash, compare } from 'bcrypt'

export interface User {
  id: string
  email: string
  name: string
  password: string
}

export class UserService {
  async createUser(email: string, password: string, name: string): Promise<User> {
    const session = driver.session()
    const hashedPassword = await hash(password, 10)

    try {
      const result = await session.executeWrite(tx =>
        tx.run(
          `
          CREATE (u:User {
            id: randomUUID(),
            email: $email,
            password: $password,
            name: $name
          })
          RETURN u
          `,
          { email, password: hashedPassword, name }
        )
      )

      const user = result.records[0].get('u').properties
      return user as User
    } finally {
      await session.close()
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const session = driver.session()

    try {
      const result = await session.executeRead(tx =>
        tx.run(
          `
          MATCH (u:User {email: $email})
          RETURN u
          `,
          { email }
        )
      )

      if (result.records.length === 0) {
        return null
      }

      return result.records[0].get('u').properties as User
    } finally {
      await session.close()
    }
  }

  async addFriend(userId: string, friendId: string, nickname?: string) {
    const session = driver.session()

    try {
      await session.executeWrite(tx =>
        tx.run(
          `
          MATCH (u:User {id: $userId})
          MATCH (f:User {id: $friendId})
          CREATE (u)-[r:FRIENDS_WITH { nickname: $nickname }]->(f)
          RETURN r
          `,
          { userId, friendId, nickname }
        )
      )
    } finally {
      await session.close()
    }
  }

  async getFriends(userId: string) {
    const session = driver.session()

    try {
      const result = await session.executeRead(tx =>
        tx.run(
          `
          MATCH (u:User {id: $userId})-[r:FRIENDS_WITH]->(f:User)
          RETURN f, r.nickname as nickname
          `,
          { userId }
        )
      )

      return result.records.map(record => ({
        ...record.get('f').properties,
        nickname: record.get('nickname')
      }))
    } finally {
      await session.close()
    }
  }
}

export const userService = new UserService()

