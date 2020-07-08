import * as types from "../types"
import attrs from "./attrs"
import React from "react"
import T from "./T"

export const Em = ({ children }) => (
	<T type={types.enum.em}>
		<span className="italic">
			{children}
		</span>
	</T>
)

export const Strong = ({ children }) => (
	<T type={types.enum.strong}>
		<span className="font-semibold">
			{children}
		</span>
	</T>
)

// mx-px px-1 py-px font-mono text-sm text-blue-600 bg-white border border-cool-gray-300 rounded
export const Code = ({ children }) => (
	<T type={types.enum.code}>
		<span className="mx-px py-1 text-sm font-mono text-blue-600 border border-cool-gray-300" {...attrs.code}>
			{children}
		</span>
	</T>
)

export const Strike = ({ children }) => (
	<T type={types.enum.strike}>
		<span className="line-through text-gray-400">
			{children}
		</span>
	</T>
)

export const A = ({ href, children }) => (
	<T type={types.enum.a} props={{ href }}>
		<span className="mx-px underline text-blue-600" {...attrs.a}>
			{children}
		</span>
	</T>
)
