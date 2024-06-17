import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

import { db } from '@/lib/db'
import { getVerificationTokenByEmail } from '@/data/verification-token'
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'

export async function generateVerificationToken(email: string) {
	const token = uuidv4()
	// 1hr: calculates the # of miliseconds in 1 hour
	const expires = new Date(new Date().getTime() + 3600 * 1000)

	const existingToken = await getVerificationTokenByEmail(email)

	if (existingToken) {
		await db.verficationToken.delete({
			where: {
				id: existingToken.id,
			},
		})
	}

	const verficationToken = await db.verficationToken.create({
		data: {
			email,
			token,
			expires,
		},
	})

	return verficationToken
}

export async function generatePasswordResetToken(email: string) {
	const token = uuidv4()
	// 1hr: calculates the # of miliseconds in 1 hour
	const expires = new Date(new Date().getTime() + 3600 * 1000)

	const existingToken = await getPasswordResetTokenByEmail(email)

	if (existingToken) {
		await db.resetPasswordToken.delete({
			where: {
				id: existingToken.id,
			},
		})
	}

	const passwordResetToken = await db.resetPasswordToken.create({
		data: {
			email,
			token,
			expires,
		},
	})

	return passwordResetToken
}

export async function generateTwoFactorToken(email: string) {
	const token = crypto.randomInt(100_000, 1_000_000).toString()
	const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

	const existingToken = await getTwoFactorTokenByEmail(email)

	if (existingToken) {
		await db.twoFactorToken.delete({
			where: {
				id: existingToken.id,
			},
		})
	}

	const twoFactorToken = await db.twoFactorToken.create({
		data: {
			email,
			token,
			expires,
		},
	})

	return twoFactorToken
}
