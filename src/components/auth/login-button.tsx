'use client'

import { useRouter } from 'next/navigation'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import LoginForm from '@/components/auth/login-form'

type Props = {
	children: React.ReactNode
	mode?: 'modal' | 'redirect'
	asChild?: boolean
}

function LoginButton({ children, mode = 'redirect', asChild }: Props) {
	const router = useRouter()

	if (mode === 'modal') {
		return (
			<Dialog>
				<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
				<DialogContent className="w-auto border-none bg-transparent p-0">
					<LoginForm />
				</DialogContent>
			</Dialog>
		)
	}

	function onClick() {
		router.push('/auth/login')
	}

	return (
		<span className="inline-block cursor-pointer" onClick={onClick}>
			{children}
		</span>
	)
}

export default LoginButton
