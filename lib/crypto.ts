import { randomBytes, createHash } from 'crypto'

export function generateTransactionHash(): string {
  const randomString = randomBytes(32).toString('hex')
  return createHash('sha256').update(randomString).digest('hex')
}

export function generateWalletAddress(): string {
  return `0x${randomBytes(20).toString('hex')}`
}

export function generateRecoveryPhrase(): string {
  return Array(12)
    .fill(0)
    .map(() => randomBytes(4).toString('hex'))
    .join(' ')
}

