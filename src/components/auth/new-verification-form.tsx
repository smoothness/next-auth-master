'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BeatLoader } from 'react-spinners'

import CardWrapper from '@/components/auth/card-wrapper'
import FormSuccess from '@/components/form-success'
import FormError from '@/components/form-error'
import { newVerification } from '@/actions/new-verification'

function NewVerificationForm() {
	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()

	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const onSubmit = useCallback(() => {
		if (success || error) return

		if (!token) {
			setError('Token does not exist!')
			return
		}

		newVerification(token)
			.then((data) => {
				setSuccess(data.success)
				setError(data.error)
			})
			.catch(() => {
				setError('Something went wrong!')
			})
	}, [token, error, success])

	useEffect(() => {
		onSubmit()
	}, [onSubmit])

	return (
		<CardWrapper
			headerLabel="Confirming your verification"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login"
		>
			<div className="flex w-full items-center justify-center">
				{!success && !error && <BeatLoader size={20} color="#000" />}
				{!success && <FormSuccess message={success} />}
				<FormError message={error} />
			</div>
		</CardWrapper>
	)
}

export default NewVerificationForm
