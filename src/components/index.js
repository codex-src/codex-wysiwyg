import React from "react"

// TODO: Use React.memo?
export const Header = ({ children }) => (
	<h1 className="">
		{children || (
			<br />
		)}
	</h1>
)

// TODO: Use React.memo?
export const Paragraph = ({ children }) => (
	<p className="">
		{children || (
			<br />
		)}
	</p>
)

export const Unstyled = ({ children }) => (
	children
)

export const Emphasis = ({ children }) => (
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
	<code className="px-1 py-1 text-sm font-mono text-blue-500 bg-gray-100 rounded">
		{children}
	</code>
)

export const Strikethrough = ({ children }) => (
	<strike className="line-through text-gray-300">
		{children}
	</strike>
)
