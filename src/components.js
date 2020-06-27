import React from "react"
import ReactDOM from "react-dom"
import toReact from "./toReact"

const T = ({ type, props, children }) => (
	React.cloneElement(children, {
		style: {
			// https://github.com/codex-src/codex-wysiwyg/commit/f0755661d24e900804ab43b9657ec584c00bbbca
			...children.props.style, // Takes precedence
			whiteSpace: "pre-wrap",
			overflowWrap: "break-word",
		},
		// Enum type:
		"data-type": type,
		// JSON-encoded props:
		"data-props": props && JSON.stringify(props),
	})
)

export const P = React.memo(({ type, id, spans }) => {
	const ref = React.useRef(null) // TODO

	React.useLayoutEffect(() => {
		const children = (
			toReact(spans) || (
				<br />
			)
		)
		ReactDOM.render(children, ref.current, () => {
			// ...
		})
	}, [spans])

	return (
		<T type={type}>
			<div ref={ref} id={id}>
				{/* {toReact(spans) || ( */}
				{/* 	<br /> */}
				{/* )} */}
			</div>
		</T>
	)
})
