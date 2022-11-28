import { ErrorBoundary, Match, Show, Switch } from 'solid-js'
import { useRouteData } from 'solid-start'
import { createServerAction$, createServerData$ } from 'solid-start/server'
import WeatherResult from '~/components/weather-result'

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
			<main class="h-full  ">
				<section class="h-screen w-full flex flex-col justify-center container mx-auto max-w-3xl ">
					<h1 class="text-center text-xl">
						Find your weather based on your location!
					</h1>
					<Form class="flex flex-col justify-center space-y-3 max-w-3xl xl:p-0 p-2">
						<label class="font-semibold" for="location">
							Your location
						</label>
						<input
							class="px-4 py-3 rounded-lg outline-none border-2 max-w-3xl border-light-400 bg-sky-50"
							type="text"
							name="location"
							placeholder="I.E Buenos Aires"
							required
							disabled={action.pending}
						/>
						<button
							class={`px-4 py-3 rounded-lg max-w-3xl w-full ${
								action.pending ? 'bg-pink-500' : 'bg-pink-300'
							}   font-semibold hover:bg-pink-400 duration-100 ease-in-out`}
							type="submit"
							disabled={action.pending}
						>
							{action.pending
								? 'Searching...'
								: 'Search weather based on your location'}
						</button>
					</Form>
				</section>
				<Switch>
					<Match when={action.result}>
						<WeatherResult result={action.result} />
					</Match>
					<Match when={action.error}>
						<p class="c-red-500">
							An error ocurred while searching your weather. Please, try it later.
						</p>
					</Match>
				</Switch>
			</main>
		</ErrorBoundary>
	)
}
