import { db } from '@/lib/db'

export async function getVerificationTokenByToken(token: string) {
	try {
		const verificationToken = await db.verficationToken.findUnique({
			where: { token },
		})

		return verificationToken
	} catch {
		return null
	}
}

export async function getVerificationTokenByEmail(email: string) {
	try {
		const verificationToken = await db.verficationToken.findFirst({
			where: { email },
		})

		return verificationToken
	} catch {
		return null
	}
}
