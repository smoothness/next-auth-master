'use client'

import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { BeatLoader } from 'react-spinners'

import CardWrapper from '@/components/auth/card-wrapper'

function NewVerificationForm() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const onSubmit = useCallback(() => {
		console.log(token)
	}, [token])

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
				<BeatLoader size={20} color="#000" />
			</div>
		</CardWrapper>
	)
}

export default NewVerificationForm
