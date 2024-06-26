import NextAuth, { Session } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import authConfig from '@/auth.config'
import { UserRole } from '@prisma/client'
import { db } from '@/lib/db'
import { JWT } from 'next-auth/jwt'
import { getUserById } from '@/data/user'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'
import { getAccountByUserId } from '@/data/account'

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			})
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			// Allow OAuth without email verification
			if (account?.provider !== 'credentials') return true

			const existingUser = user?.id ? await getUserById(user.id) : undefined

			// Prevent signin without email verification
			if (!existingUser?.emailVerified) return false

			if (existingUser?.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
					existingUser.id
				)

				if (!twoFactorConfirmation) return false

				// Delete 2fa for next signin
				await db.twoFactorConfirmation.delete({
					where: { id: twoFactorConfirmation.id },
				})
			}

			return true
		},
		async session({ session, token }: { session: Session; token?: JWT }) {
			// async session({ session, token }) { // TODO: why is this on 6:26:11 without types?
			if (token?.sub && session.user) {
				session.user.id = token?.sub
			}

			if (token?.role && session.user) {
				session.user.role = token?.role as UserRole
			}

			if (session.user) {
				session.user.isTwoFactorEnabled = token?.isTwoFactorEnabled as boolean
			}

			if (session.user) {
				session.user.name = token?.name
				session.user.email = token?.email
				session.user.isOauth = token?.isOauth as boolean
			}

			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)

			if (!existingUser) return token

			const existingAccount = await getAccountByUserId(existingUser.id)

			token.isOauth = !!existingAccount
			token.name = existingUser.name
			token.email = existingUser.email
			token.role = existingUser.role
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

			return token
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
})
