// 'use server'

// import { revalidatePath } from "next/cache"
// import { prisma } from "@/lib/prisma"
// import { auth } from "@/auth"
// import { generateTransactionHash } from "@/lib/crypto"
// import { userService } from "@/lib/user-service"

// export async function createTransaction(
//   amount: number,
//   toAddress: string,
//   walletType: string
// ) {
//   const session = await auth()
//   if (!session?.user?.id) throw new Error("Unauthorized")

//   // First verify user exists in Neo4j
//   const user = await userService.getUserByEmail(session.user.email!)
//   if (!user) throw new Error("User not found")

//   // Then proceed with SQL operations
//   const wallet = await prisma.wallet.findFirst({
//     where: {
//       userId: user.id,
//       type: walletType,
//     },
//   })

//   if (!wallet) throw new Error("Wallet not found")
//   if (wallet.balance < amount) throw new Error("Insufficient funds")

//   const hash = generateTransactionHash()

//   const transaction = await prisma.transaction.create({
//     data: {
//       hash,
//       amount,
//       type: "SEND",
//       status: "PENDING",
//       toAddress,
//       fromWalletId: wallet.id,
//     },
//   })

//   await prisma.wallet.update({
//     where: { id: wallet.id },
//     data: { balance: { decrement: amount } },
//   })

//   revalidatePath('/wallet')
//   return transaction
// }

// export async function getTransactions(walletType: string) {
//   const session = await auth()
//   if (!session?.user?.id) throw new Error("Unauthorized")

//   const user = await userService.getUserByEmail(session.user.email!)
//   if (!user) throw new Error("User not found")

//   const wallet = await prisma.wallet.findFirst({
//     where: {
//       userId: user.id,
//       type: walletType,
//     },
//   })

//   if (!wallet) return []

//   return prisma.transaction.findMany({
//     where: { fromWalletId: wallet.id },
//     orderBy: { createdAt: 'desc' },
//   })
// }
