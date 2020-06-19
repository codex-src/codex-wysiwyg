import attrs from "./attrs"
import React from "react"

export const Em = ({ children }) => (
	<em className="italic">
		{children}
	</em>
)

export const Strong = ({ children }) => (
	<strong className="font-bold">
		{children}
	</strong>
)

export const Code = ({ children }) => (
	<code className="px-0.5 py-0.5 text-sm font-mono text-blue-500 border border-gray-300 rounded" {...attrs.code}>
		{children}
	</code>
)

export const Strike = ({ children }) => (
	<strike className="line-through text-gray-400">
		{children}
	</strike>
)

export const A = ({ href, children }) => (
	<a className="mx-px underline text-blue-600" href={href} {...attrs.a}>
		{children}
	</a>
)
