import attrs from "./attrs"
import React from "react"
import T from "./hoc"
import { typeEnum } from "./typeMaps"

export const Em = ({ children }) => (
	<T type={typeEnum.em}>
		<span className="italic">
			{children}
		</span>
	</T>
)

export const Strong = ({ children }) => (
	<T type={typeEnum.strong}>
		<span className="font-bold">
			{children}
		</span>
	</T>
)

export const Code = ({ children }) => (
	<T type={typeEnum.code}>
		<span className="px-1 py-0.5 text-sm font-mono text-blue-600 border border-cool-gray-300 rounded" {...attrs.code}>
			{children}
		</span>
	</T>
)

export const Strike = ({ children }) => (
	<T type={typeEnum.strike}>
		<span className="line-through text-gray-400">
			{children}
		</span>
	</T>
)

export const A = ({ href, children }) => (
	<T type={typeEnum.a} props={{ href }}>
		<span className="mx-px underline text-blue-600" {...attrs.a}>
			{children}
		</span>
	</T>
)
