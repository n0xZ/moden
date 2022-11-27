import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import Netlify from 'solid-start-netlify'
import Unocss from 'unocss/vite'
import { presetUno } from 'unocss'
export default defineConfig({
	plugins: [
		solid({ ssr: true, adapter: Netlify({ edge: true }) }),
		Unocss({ presets: [presetUno()] }),
	],
})
