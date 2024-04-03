'use client'

import { useRouter } from 'next/navigation'

type Props = {
	children: React.ReactNode
	mode?: 'modal' | 'redirect'
	asChild?: boolean
}

function LoginButton({ children, mode = 'redirect', asChild }: Props) {
	const router = useRouter()

	if (mode === 'modal') {
		return <span>TODO: implement modal</span>
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
