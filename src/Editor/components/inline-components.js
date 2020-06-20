import attrs from "./attrs"
import React from "react"

export const Em = ({ children }) => (
	// data-type={typeEnum.em}
	<em className="italic">
		{children}
	</em>
)

export const Strong = ({ children }) => (
	// data-type={typeEnum.strong}
	<strong className="font-bold">
		{children}
	</strong>
)

export const Code = ({ children }) => (
	// data-type={typeEnum.code}
	<code className="px-1 py-0.5 text-sm font-mono text-blue-600 border border-cool-gray-300 rounded" {...attrs.code}>
		{children}
	</code>
)

export const Strike = ({ children }) => (
	// data-type={typeEnum.strike}
	<strike className="line-through text-gray-400">
		{children}
	</strike>
)

export const A = ({ href, children }) => (
	// data-type={typeEnum.a}
	<a className="mx-px underline text-blue-600" href={href} {...attrs.a} data-props={JSON.stringify({ href })}>
		{children}
	</a>
)
