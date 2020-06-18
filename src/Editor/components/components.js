import attrs from "./attrs"
import React from "react"
import toReact from "./toReact"

/*
 * Components
 */
export const H1 = React.memo(({ reactKey, children }) => (
	<h1 id={reactKey} className="font-semibold text-3xl leading-tight">
		{toReact(children) || (
			<br />
		)}
	</h1>
))

export const H2 = React.memo(({ reactKey, children }) => (
	<h2 id={reactKey} className="font-semibold text-2xl leading-tight">
		{toReact(children) || (
			<br />
		)}
	</h2>
))

export const H3 = React.memo(({ reactKey, children }) => (
	<h3 id={reactKey} className="font-semibold text-xl leading-tight">
		{toReact(children) || (
			<br />
		)}
	</h3>
))

export const H4 = React.memo(({ reactKey, children }) => (
	<h4 id={reactKey} className="font-semibold text-xl leading-tight">
		{toReact(children) || (
			<br />
		)}
	</h4>
))

export const H5 = React.memo(({ reactKey, children }) => (
	<h5 id={reactKey} className="font-semibold text-xl leading-tight">
		{toReact(children) || (
			<br />
		)}
	</h5>
))

export const H6 = React.memo(({ reactKey, children }) => (
	<h6 id={reactKey} className="font-semibold text-xl leading-tight">
		{toReact(children) || (
			<br />
		)}
	</h6>
))

export const P = React.memo(({ reactKey, children }) => (
	<p id={reactKey} className="TODO">
		{toReact(children) || (
			<br />
		)}
	</p>
))

export const HR = React.memo(({ children }) => (
	<hr className="TODO" />
))

/*
 * Inline components
 */
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
