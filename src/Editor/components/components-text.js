import * as Types from "../Types"
import attrs from "./attrs"
import React from "react"
import T from "./T"

export const Em = ({ children }) => (
	<T type={Types.enum.em}>
		<span className="italic">
			{children}
		</span>
	</T>
)

export const Strong = ({ children }) => (
	<T type={Types.enum.strong}>
		<span className="font-semibold">
			{children}
		</span>
	</T>
)

// mx-px px-1 py-px font-mono text-sm text-blue-600 bg-white border border-cool-gray-300 rounded
export const Code = ({ children }) => (
	<T type={Types.enum.code}>
		<span className="mx-px py-1 text-sm font-mono text-blue-600 border border-cool-gray-300" {...attrs.code}>
			{children}
		</span>
	</T>
)

export const Strike = ({ children }) => (
	<T type={Types.enum.strike}>
		<span className="line-through text-gray-400">
			{children}
		</span>
	</T>
)

export const A = ({ href, children }) => (
	<T type={Types.enum.a} props={{ href }}>
		<span className="mx-px underline text-blue-600" {...attrs.a}>
			{children}
		</span>
	</T>
)
