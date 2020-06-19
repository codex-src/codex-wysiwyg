import attrs from "./attrs"
import React from "react"
import { typeEnum } from "./typeMaps"

// TODO: Remove? We can read node.nodeName
const Type = ({ type: T, children }) => (
	React.cloneElement(children, {
		"data-type": T,
		...children.props,
	})
)

export const Em = ({ children }) => (
	<Type type={typeEnum.em}>
		<em className="italic">
			{children}
		</em>
	</Type>
)

export const Strong = ({ children }) => (
	<Type type={typeEnum.strong}>
		<strong className="font-bold">
			{children}
		</strong>
	</Type>
)

export const Code = ({ children }) => (
	<Type type={typeEnum.code}>
		<code className="px-1 py-0.5 text-sm font-mono text-blue-600 border border-cool-gray-300 rounded" {...attrs.code}>
			{children}
		</code>
	</Type>
)

export const Strike = ({ children }) => (
	<Type type={typeEnum.strike}>
		<strike className="line-through text-gray-400">
			{children}
		</strike>
	</Type>
)

export const A = ({ href, children }) => (
	<Type type={typeEnum.a}>
		<a className="mx-px underline text-blue-600" href={href} {...attrs.a}>
			{children}
		</a>
	</Type>
)
