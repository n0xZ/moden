// @refresh reload
import { Suspense } from 'solid-js'
import {
	A,
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
} from 'solid-start'

import '@unocss/reset/antfu.css'
import 'virtual:uno.css'

export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>Welcome to Moden - Find a weather based on its location</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Body class='bg-pink-50 c-neutral-700'>
				<Suspense>
					<ErrorBoundary>
						<Routes>
							<FileRoutes />
						</Routes>
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	)
}
