import React from "react"
import toReact from "./toReact"
import { ElementHOC as HOC } from "./HOC"

/* eslint-disable no-multi-spaces */
const headerStyleMap = {
	h1: { className: "font-semibold leading-tight antialiased", style: { fontSize: "225%" } },
	h2: { className: "font-semibold leading-tight antialiased", style: { fontSize: "175%" } },
	h3: { className: "font-bold leading-tight antialiased",     style: { fontSize: "125%" } },
	h4: { className: "font-bold leading-tight antialiased",     style: { fontSize: "125%" } },
	h5: { className: "font-bold leading-tight antialiased",     style: { fontSize: "125%" } },
	h6: { className: "font-bold leading-tight antialiased",     style: { fontSize: "125%" } },
}
/* eslint-disable no-multi-spaces */

export const H = React.memo(({ type, id, children }) => {
	const ref = React.useRef(null)
	const labelRef = React.useRef(null)

	const [paddingY, setPaddingY] = React.useState(4)

	React.useLayoutEffect(() => {
		const computeLineHeight = domElement => {
			const lineHeightPx = window.getComputedStyle(domElement).lineHeight
			return Number(lineHeightPx.slice(0, -2)) // Removes "px" and converts to a number
		}
		const refLineHeight = computeLineHeight(ref.current)
		const labelRefLineHeight = computeLineHeight(labelRef.current)
		setPaddingY(refLineHeight - labelRefLineHeight)
	}, [ref, labelRef])

	const styles = headerStyleMap[type]
	return (
		// <Block ref={ref} id={id}>
		<div className="group relative">

			<HOC type={type}>
				<div ref={ref} id={id} { ...styles }>
					{toReact(children) || (
						<br />
					)}
				</div>
			</HOC>

			{/* H1-H6 */}
			<div className="absolute top-0 right-full cursor-default" contentEditable={false}>
				<div className="mr-3" style={{ marginTop: -paddingY / 6, paddingTop: paddingY }}>
					<p ref={labelRef} className="font-bold text-xs tracking-wider text-cool-gray-300 selection-bg-transparent">
						{type.toUpperCase()}
					</p>
				</div>
			</div>

		</div>
		// </Block>
	)
})

export const P = React.memo(({ type, id, children }) => {
	const ref = React.useRef(null)
	return (
		// <Block ref={ref} id={id}>
		<HOC type={type}>
			<div ref={ref} id={id}>
				{toReact(children) || (
					<br />
				)}
			</div>
		</HOC>
		// </Block>
	)
})

export const HR = React.memo(({ type, id, children }) => {
	const ref = React.useRef(null)
	return (
		// <Block ref={ref} id={id}>
		<HOC type={type}>
			<div ref={ref} id={id} className="my-6 border-t-4 border-cool-gray-300" />
		</HOC>
		// </Block>
	)
})

// export const HR = ({ id, children }) => (
// 	<div id={id} className="my-6 text-right text-cool-gray-300" style={{ backgroundImage: "linear-gradient(transparent 0, transparent 0.625rem, currentColor 0.625rem, currentColor 0.875rem, transparent 0.875rem)" }}>
// 		<br />
// 	</div>
// ))
