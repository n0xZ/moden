import { Weather } from '~/types'

type WeatherResultProps = {
	result?: Weather
}

export default function WeatherResult(props: WeatherResultProps) {
	const localDate = new Date(props.result.location.localtime)
	const actualHour = localDate.toLocaleString()
	const isEveningOrMidnight =
		localDate.getHours() > 19 ||
		localDate.getHours() === 23 ||
		localDate.getHours() < 6
      
	return (
		<section
			class={`" grid place-items-center ${
				isEveningOrMidnight ? 'bg-stone-900 c-neutral-50' : 'bg-transparent'
			} min-h-screen   "`}
		>
			<article class=" flex flex-col justify-center items-center space-y-4 container mx-auto max-w-3xl h-full ">
				<img
					class="h-14 w-14 rounded-full "
					src={props.result.current.condition.icon}
					alt={`${props.result.location.name} 's condition is ${props.result.current.condition.text}`}
				/>
				<h2 class="text-center text-xl  font-bold">
					{props.result?.location.name}, {props.result.location.country}
				</h2>
				<p class="text-xs">{actualHour}</p>
				<h3>{props.result.current.condition.text}</h3>
				<aside class="flex flex-row items-center justify-between w-full space-x-3 ">
					<p class="font-normal">Temperature: {props.result?.current.temp_c}° C </p>
					<p>Humidity: {props.result.current.humidity}%</p>
				</aside>
			</article>
		</section>
	)
}
