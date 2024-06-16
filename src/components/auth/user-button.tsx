'use client'

import { FaUser } from 'react-icons/fa'
import { ExitIcon } from '@radix-ui/react-icons'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import { useCurrentUser } from '@/hooks/use-current-user'
import LogoutButton from '@/components/auth/logout-button'

interface ButtonProps {
	children?: React.ReactNode
}

function UserButton({ children }: ButtonProps) {
	const user = useCurrentUser()

	console.log('user', user)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user?.image || ''} />
					<AvatarFallback className="bg-sky-500">
						<FaUser className="text-white" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40" align="end">
				<LogoutButton>
					<DropdownMenuItem>
						<ExitIcon className="mr-2 h-4 w-4" />
						Logout
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserButton
