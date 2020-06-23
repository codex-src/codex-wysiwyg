import React from "react"
import toReact from "./toReact"
import { Element as T } from "./type"
import { typeEnum } from "./typeMaps"

const Block = React.forwardRef(({ id, children }, ref) => {
	const [paddingY, setPaddingY] = React.useState(4)
	const [backgroundColor, setBackgroundColor] = React.useState(undefined)

	React.useLayoutEffect(() => {
		const lineHeightPx = Number(window.getComputedStyle(ref.current).lineHeight.slice(0, -1 * "px".length))
		setPaddingY((lineHeightPx - 16) / 2)
	}, [ref])

	// NOTE: window.location.hash does not work as an effect
	// dependency.
	React.useEffect(() => {
		const handler = e => {
			const current = window.location.hash.slice("#".length)
			if (current !== id) {
				setBackgroundColor(undefined)
			} else {
				setBackgroundColor("var(--blue-50)")
			}
		}
		window.addEventListener("hashchange", handler)
		return () => {
			window.removeEventListener("hashchange", handler)
		}
	}, [id])

	const handleClick = e => {
		const current = window.location.hash.slice("#".length)
		if (current === id) {
			setBackgroundColor(undefined)
			window.history.replaceState(null, "", window.location.pathname + window.location.search)
			return
		}
		window.location.hash = id
		window.scrollBy(0, -96) // TODO: Add mount effect
	}

	return (
		<div className="em-context group relative transition duration-300 ease-in-out" style={{ backgroundColor }}>
			<div className="absolute right-full h-full" contentEditable={false}>
				<div className="px-2 text-transparent group-hover:text-cool-gray-300 hover:text-blue-500 transition duration-300 ease-in-out" style={{ paddingTop: paddingY, paddingBottom: paddingY }} onClick={handleClick}>
					<svg
						className="w-4 h-4 transform scale-110"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" fillRule="evenodd" />
					</svg>
				</div>
			</div>
			{children}
		</div>
	)
})

export const H1 = React.memo(({ id, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref} id={id}>
			<T type={typeEnum.h1}>
				<div ref={ref} id={id} className="font-semibold text-2xl leading-tight">
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

export const H2 = React.memo(({ id, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref} id={id}>
			<T type={typeEnum.h2}>
				<div ref={ref} id={id} className="font-semibold text-xl leading-tight">
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

export const H3 = React.memo(({ id, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref} id={id}>
			<T type={typeEnum.h3}>
				<div ref={ref} id={id} className="font-semibold text-lg leading-tight">
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

export const H4 = React.memo(({ id, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref} id={id}>
			<T type={typeEnum.h4}>
				<div ref={ref} id={id} className="font-semibold text-lg leading-tight">
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

export const H5 = React.memo(({ id, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref} id={id}>
			<T type={typeEnum.h5}>
				<div ref={ref} id={id} className="font-semibold text-lg leading-tight">
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

export const H6 = React.memo(({ id, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref} id={id}>
			<T type={typeEnum.h6}>
				<div ref={ref} id={id} className="font-semibold text-lg leading-tight">
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

export const P = React.memo(({ id, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref} id={id}>
			<T type={typeEnum.p}>
				<div ref={ref} id={id}>
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

// FIXME
export const HR = React.memo(({ id, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref} id={id}>
			<T type={typeEnum.hr}>
				<div ref={ref} id={id} className="my-6 border-t-4 border-cool-gray-300" />
			</T>
		</Block>
	)
})

// export const HR = ({ id, children }) => (
// 	<div id={id} className="my-6 text-right text-cool-gray-300" style={{ backgroundImage: "linear-gradient(transparent 0, transparent 0.625rem, currentColor 0.625rem, currentColor 0.875rem, transparent 0.875rem)" }}>
// 		<br />
// 	</div>
// ))
