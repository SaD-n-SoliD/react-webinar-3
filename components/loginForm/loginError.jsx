import { useEffect, useRef } from "react"

export function LoginError({ error, className = '' }) {

	const ref = useRef()

	useEffect(() => {
		ref.current.classList.remove('blink_red')
		setTimeout(() => {
			ref.current?.classList?.add('blink_red')
		}, 0);
	})

	return (
		<div ref={ref} className={'input-error red ' + className}>{error.message}</div>
	)
}