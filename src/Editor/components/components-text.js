import * as Types from "../Types"
import attrs from "./attrs"
import React from "react"
import T from "./T"

export const Em = ({ children }) => (
	<T type={Types.enumerated.em}>
		<span className="italic">
			{children}
		</span>
	</T>
)

export const Strong = ({ children }) => (
	<T type={Types.enumerated.strong}>
		<span className="font-bold">
			{children}
		</span>
	</T>
)

export const Code = ({ children }) => (
	<T type={Types.enumerated.code}>
		<span className="mx-px py-1 text-sm font-mono text-blue-600 border border-cool-gray-300" {...attrs.code}>
			{children}
		</span>
	</T>
)

export const Strike = ({ children }) => (
	<T type={Types.enumerated.strike}>
		<span className="line-through text-gray-400">
			{children}
		</span>
	</T>
)

export const A = ({ href, children }) => (
	<T type={Types.enumerated.a} props={{ href }}>
		<span className="mx-px underline text-blue-600" {...attrs.a}>
			{children}
		</span>
	</T>
)
