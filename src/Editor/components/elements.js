import React from "react"
import T from "./typeHOC"
import toReact from "./toReact"
import { typeEnum } from "./typeMaps"

const Block = React.forwardRef(({ children }, ref) => {
	const [paddingY, setPaddingY] = React.useState(4)

	React.useLayoutEffect(() => {
		// TODO: Use rem or em units?
		const lineHeight = Number(window.getComputedStyle(ref.current).lineHeight.slice(0, -2))
		setPaddingY((lineHeight - 16) / 2)
	}, [ref])

	return (
		<div className="group relative">
			<div className="absolute right-full h-full" contentEditable={false}>
				<div className="px-3 text-transparent group-hover:text-cool-gray-300 hover:text-blue-500 transition duration-300 ease-in-out" style={{ paddingTop: paddingY, paddingBottom: paddingY }}>
					<svg
						className="w-4 h-4 transform scale-110"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						{/* <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /> */}
						<path d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" fillRule="evenodd" />
					</svg>
				</div>
			</div>
			{children}
		</div>
	)
})

export const H1 = React.memo(({ $key, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref}>
			<T type={typeEnum.h1}>
				<div ref={ref} id={$key} className="font-semibold text-2xl leading-tight">
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

export const H2 = React.memo(({ $key, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref}>
			<T type={typeEnum.h2}>
				<div ref={ref} id={$key} className="font-semibold text-xl leading-tight">
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

export const H3 = React.memo(({ $key, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref}>
			<T type={typeEnum.h3}>
				<div ref={ref} id={$key} className="font-semibold text-lg leading-tight">
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

export const H4 = React.memo(({ $key, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref}>
			<T type={typeEnum.h4}>
				<div ref={ref} id={$key} className="font-semibold text-lg leading-tight">
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

export const H5 = React.memo(({ $key, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref}>
			<T type={typeEnum.h5}>
				<div ref={ref} id={$key} className="font-semibold text-lg leading-tight">
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

export const H6 = React.memo(({ $key, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref}>
			<T type={typeEnum.h6}>
				<div ref={ref} id={$key} className="font-semibold text-lg leading-tight">
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

export const P = React.memo(({ $key, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref}>
			<T type={typeEnum.p}>
				<div ref={ref} id={$key}>
					{toReact(children) || (
						<br />
					)}
				</div>
			</T>
		</Block>
	)
})

// FIXME
export const HR = React.memo(({ $key, children }) => {
	const ref = React.useRef(null)
	return (
		<Block ref={ref}>
			<T type={typeEnum.hr}>
				<div ref={ref} id={$key} className="my-6 border-t-4 border-cool-gray-300" />
			</T>
		</Block>
	)
})

// export const HR = ({ $key, children }) => (
// 	<div id={$key} className="my-6 text-right text-cool-gray-300" style={{ backgroundImage: "linear-gradient(transparent 0, transparent 0.625rem, currentColor 0.625rem, currentColor 0.875rem, transparent 0.875rem)" }}>
// 		<br />
// 	</div>
// ))
