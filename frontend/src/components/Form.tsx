import { useState } from 'react'
import toast from 'react-hot-toast'
import { extractGitHubRepoPath, handleError } from '../utils'

export type Inputs = {

	email: string
	repoLink: string
}

type FormProps = {
	proveIt: (input: Inputs) => Promise<void>
}

const Form = ({ proveIt }: FormProps) => {
	const [input, setInput] = useState<Inputs>({
		
		
		email: '',
		repoLink: '',
		
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}
	let name="none"
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const repoFullName = extractGitHubRepoPath(input.repoLink)
		if (!repoFullName) return toast.error('Invalid repository link')
		proveIt(input).catch((e) => console.log(handleError(e)))
	}
	return (
		<form
			onSubmit={onSubmit}
			className="flex flex-col items-center w-full gap-5 lg:items-start text-offBlack"
		>

			
			<input
				type="email"
				name="email"
				required
				style={{ borderBottom: '2px solid' }}
				defaultValue={name}
				onChange={handleChange}
				value={input.email}
				placeholder="Your github email id"
				className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
			/>
			<input
				name="repoLink"
				required
				onChange={handleChange}
				value={input.repoLink}
				style={{ borderBottom: '2px solid' }}
				defaultValue={name}
				placeholder="GitHub repo link"
				className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
			/>
		
			<button
				type="submit"
				className="py-5 lg:py-4 mt-5 transition-colors ease-in bg-yellow px-9 rounded-xl hover:shadow-lg"
			>
				Claim your Identity!
			</button>
		</form>
	)
}

export default Form
