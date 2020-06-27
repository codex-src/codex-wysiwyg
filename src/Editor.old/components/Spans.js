import attrs from "./attrs"
import React from "react"
import { SpanHOC as HOC } from "./HOC"

// TODO: Add bg-blue-100 or equivalent?
export const Em = ({ type, children }) => (
	<HOC type={type}>
		<span className="italic">
			{children}
		</span>
	</HOC>
)

export const Strong = ({ type, children }) => (
	<HOC type={type}>
		<span className="font-bold">
			{children}
		</span>
	</HOC>
)

// NOTE: py-* and border-* classes interfere with
// toolbarClientRect; was py-1 border border-cool-gray-300
export const Code = ({ type, children }) => (
	<HOC type={type}>
		<span className="mx-1 text-sm font-mono text-blue-600" style={{ boxShadow: "0 0 0 3px var(--white), 0 0 0 4px var(--cool-gray-300)" }} {...attrs.code}>
			{children}
		</span>
	</HOC>
)

export const Strike = ({ type, children }) => (
	<HOC type={type}>
		<span className="line-through text-gray-400">
			{children}
		</span>
	</HOC>
)

export const A = ({ type, href, children }) => (
	<HOC type={type} props={{ href }}>
		<span className="mx-px underline text-blue-600" {...attrs.a}>
			{children}
		</span>
	</HOC>
)
