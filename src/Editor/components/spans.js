import attrs from "./attrs"
import React from "react"
import { Span } from "./meta"
import { typeEnum } from "./typeMaps"

export const Em = ({ children }) => (
	<Span type={typeEnum.em}>
		<span className="italic">
			{children}
		</span>
	</Span>
)

export const Strong = ({ children }) => (
	<Span type={typeEnum.strong}>
		<span className="font-bold">
			{children}
		</span>
	</Span>
)

export const Code = ({ children }) => (
	<Span type={typeEnum.code}>
		<span className="px-1 py-px text-sm font-mono text-blue-600 bg-white border border-cool-gray-300 rounded" {...attrs.code}>
			{children}
		</span>
	</Span>
)

export const Strike = ({ children }) => (
	<Span type={typeEnum.strike}>
		<span className="line-through text-gray-400">
			{children}
		</span>
	</Span>
)

export const A = ({ href, children }) => (
	<Span type={typeEnum.a} props={{ href }}>
		<span className="mx-px underline text-blue-600" {...attrs.a}>
			{children}
		</span>
	</Span>
)
