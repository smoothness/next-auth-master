'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { Button } from '@/components/ui/button'

function Social() {
	const searchParams = useSearchParams()
	const callBackUrl = searchParams.get('callbackUrl')
	// This is how you handle signin with social providers from a client component
	// we can also do this in server components with an action like login or register which we already did
	// or in the auth.ts file with the signIn function from NextAuth which will be client side
	function onClickHandler(provider: 'google' | 'facebook') {
		//:TODO: facebook provider is not yet implemented
		signIn(provider, {
			callbackUrl: callBackUrl || DEFAULT_LOGIN_REDIRECT,
		})
	}

	return (
		<div className="flex w-full items-center gap-x-2">
			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => onClickHandler('google')}
			>
				<FcGoogle className="h-5 w-5" />
			</Button>
			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => onClickHandler('facebook')}
			>
				<FaFacebookF className="h-5 w-5" />
			</Button>
		</div>
	)
}

export default Social
