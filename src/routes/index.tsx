import { ErrorBoundary, Show } from 'solid-js'
import { useRouteData } from 'solid-start'
import { createServerAction$, createServerData$ } from 'solid-start/server'

import { Weather } from '~/types'

export const routeData = () => {
	return createServerData$(async () => {
		const API_URL = import.meta.env.VITE_API_URL
		const RAPIDAPI_HOST = import.meta.env.VITE_RAPID_API_HOST
		const RAPIDAPI_KEY = import.meta.env.VITE_RAPID_API_KEY
		console.log(RAPIDAPI_HOST)
		const res = await fetch(`${API_URL}?q=buenos%20aires`, {
			headers: {
				'X-RapidAPI-Key': RAPIDAPI_KEY,
				'X-RapidAPI-Host': RAPIDAPI_HOST,
			},
		})

		return (await res.json()) as Weather
	})
}

export default function Home() {
	const [action, { Form }] = createServerAction$(async (formData: FormData) => {
		const location = formData.get('location')
		const API_URL = import.meta.env.VITE_API_URL
		const RAPIDAPI_HOST = import.meta.env.VITE_RAPID_API_HOST
		const RAPIDAPI_KEY = import.meta.env.VITE_RAPID_API_KEY
		console.log(RAPIDAPI_HOST)
		const res = await fetch(`${API_URL}?q=${location}`, {
			headers: {
				'X-RapidAPI-Key': RAPIDAPI_KEY,
				'X-RapidAPI-Host': RAPIDAPI_HOST,
			},
		})

		return (await res.json()) as Weather
	})
	return (
		<ErrorBoundary
			fallback={<div>An error has ocurred while displaying the content.</div>}
		>
			<main class="h-screen w-full flex flex-col justify-center container mx-auto max-w-3xl">
				<Form class="flex flex-col justify-center space-y-3 max-w-3xl xl:p-0 p-2">
					<label class="font-semibold" for="location">
						Your location
					</label>
					<input
						class="px-4 py-3 rounded-lg outline-none border-2 max-w-3xl border-light-500 "
						type="text"
						name="location"
						placeholder="I.E Buenos Aires"
						disabled={action.pending}
					/>
					<button
						class="px-4 py-3 rounded-lg max-w-3xl w-full bg-amber-300 c-neutral-800  font-semibold"
						type="submit"
						disabled={action.pending}
					>
						Search weather based on your location
					</button>
				</Form>
				<Show when={action.result}>
					<p>
						Actual condition : {action.result.current.cloud} on{' '}
						{action.result.location.name}
					</p>
					<p>{action.result.location.country}</p>
				</Show>
			</main>
		</ErrorBoundary>
	)
}
