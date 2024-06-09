import { db } from '@/lib/db'

export async function getPasswordResetTokenByToken(token: string) {
	try {
		const passwordResetToken = await db.resetPasswordToken.findUnique({
			where: { token },
		})
		return passwordResetToken
	} catch {
		return null
	}
}

export async function getPasswordResetTokenByEmail(email: string) {
	try {
		const passwordResetToken = await db.resetPasswordToken.findFirst({
			where: { email },
		})
		return passwordResetToken
	} catch {
		return null
	}
}
