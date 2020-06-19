import React from "react"
import toReact from "./toReact"

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
	<hr className="my-6 border-t-4 border-cool-gray-300" /* tabIndex={0} */ />
))
