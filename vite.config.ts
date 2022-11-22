import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import { presetUno } from 'unocss'
export default defineConfig({
	plugins: [solid({ ssr: false }), Unocss({ presets: [presetUno()] })],
})
