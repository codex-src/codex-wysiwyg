// import Markdown from "./Markdown"
import attrs from "./attrs"
import React from "react"
import T from "./T"

// Renders <em>.
export const Em = ({ children }) => (
	<T type="em" markdown="_">
		<span className="italic">
			{children}
		</span>
	</T>
)

// Renders <strong>.
export const Strong = ({ children }) => (
	<T type="strong" markdown="**">
		<span className="font-semibold">
			{children}
		</span>
	</T>
)

// Renders <code>.
export const Code = ({ children }) => (
	<T type="code" markdown="`">
		<span className="mx-px py-1 text-sm font-mono text-blue-600 border border-cool-gray-300" {...attrs.code}>
			{children}
		</span>
	</T>
)

// Renders <strike>.
export const Strike = ({ children }) => (
	<T type="strike" markdown="~~">
		<span className="line-through text-gray-400">
			{children}
		</span>
	</T>
)

// Renders <a href="...">.
export const A = ({ href, children }) => (
	<T type="a" props={{ href }} markdown={["[", "](" + href + ")"]}>
		<span className="mx-px underline text-blue-600" {...attrs.a}>
			{children}
		</span>
	</T>
)
