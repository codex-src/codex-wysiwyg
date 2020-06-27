import attrs from "./attrs"
import React from "react"

const T = ({ type, props, children }) => (
	React.cloneElement(children, {
		// Enum type:
		"data-type": type,
		// JSON-encoded props:
		"data-props": props && JSON.stringify(props, null, " ")
			.replace(/\s*\n\s*/g, " "),
	})
)

export const Em = ({ type, children }) => (
	<T type={type}>
		<span className="italic">
			{children}
		</span>
	</T>
)

export const Strong = ({ type, children }) => (
	<T type={type}>
		<span className="font-bold">
			{children}
		</span>
	</T>
)

export const Code = ({ type, children }) => (
	<T type={type}>
		<span className="mx-px py-1 text-sm font-mono text-blue-600 border border-cool-gray-300" {...attrs.code}>
			{children}
		</span>
	</T>
)

export const Strike = ({ type, children }) => (
	<T type={type}>
		<span className="line-through text-gray-400">
			{children}
		</span>
	</T>
)

export const A = ({ type, href, children }) => (
	<T type={type} props={{ href }}>
		<span className="mx-px underline text-blue-600" {...attrs.a}>
			{children}
		</span>
	</T>
)
