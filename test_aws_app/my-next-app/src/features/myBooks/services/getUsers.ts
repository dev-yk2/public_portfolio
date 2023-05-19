import { prisma } from '@/lib/prisma'

const getUsers = async () => {
  const users = await prisma.user.findMany()
  return users
}

export default getUsers
