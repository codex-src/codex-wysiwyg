import attrs from "./attrs"
import Markdown from "./Markdown"
import React from "react"
import T from "./T"

// <em>
export const Em = ({ children }) => (
	<T type="em">
		<span className="italic">
			<Markdown syntax="_">
				{children}
			</Markdown>
		</span>
	</T>
)

// <strong>
export const Strong = ({ children }) => (
	<T type="strong">
		<span className="font-semibold">
			<Markdown syntax="**">
				{children}
			</Markdown>
		</span>
	</T>
)

// <code>
export const Code = ({ children }) => (
	<T type="code">
		<span className="mx-px py-1 text-sm font-mono text-blue-600 border border-cool-gray-300" {...attrs.code}>
			<Markdown syntax="`">
				{children}
			</Markdown>
		</span>
	</T>
)

// <strike>
export const Strike = ({ children }) => (
	<T type="strike">
		<span className="line-through text-gray-400">
			<Markdown syntax="~~">
				{children}
			</Markdown>
		</span>
	</T>
)

// <a href="...">
export const A = ({ href, children }) => (
	<T type="a" props={{ href }}>
		<span className="mx-px underline text-blue-600" {...attrs.a}>
			<Markdown syntax={["[", "](" + href + ")"]}>
				{children}
			</Markdown>
		</span>
	</T>
)
