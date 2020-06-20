import React from "react"
import T from "./hoc"
import toReact from "./toReact"
import { typeEnum } from "./typeMaps"

export const H1 = React.memo(({ $key, children }) => (
	<T type={typeEnum.h1}>
		<div id={$key} className="font-semibold text-3xl leading-tight">
			{toReact(children) || (
				<br />
			)}
		</div>
	</T>
))

export const H2 = React.memo(({ $key, children }) => (
	<T type={typeEnum.h2}>
		<div id={$key} className="font-semibold text-2xl leading-tight">
			{toReact(children) || (
				<br />
			)}
		</div>
	</T>
))

export const H3 = React.memo(({ $key, children }) => (
	<T type={typeEnum.h3}>
		<div id={$key} className="font-semibold text-xl leading-tight">
			{toReact(children) || (
				<br />
			)}
		</div>
	</T>
))

export const H4 = React.memo(({ $key, children }) => (
	<T type={typeEnum.h4}>
		<div id={$key} className="font-semibold text-xl leading-tight">
			{toReact(children) || (
				<br />
			)}
		</div>
	</T>
))

export const H5 = React.memo(({ $key, children }) => (
	<T type={typeEnum.h5}>
		<div id={$key} className="font-semibold text-xl leading-tight">
			{toReact(children) || (
				<br />
			)}
		</div>
	</T>
))

export const H6 = React.memo(({ $key, children }) => (
	<T type={typeEnum.h6}>
		<div id={$key} className="font-semibold text-xl leading-tight">
			{toReact(children) || (
				<br />
			)}
		</div>
	</T>
))

export const P = React.memo(({ $key, children }) => (
	<T type={typeEnum.p}>
		<div id={$key}>
			{toReact(children) || (
				<br />
			)}
		</div>
	</T>
))

// FIXME
export const HR = React.memo(({ $key, children }) => (
	<T type={typeEnum.hr}>
		<div id={$key} className="my-6 border-t-4 border-cool-gray-300" />
	</T>
))

// export const HR = React.memo(({ $key, children }) => (
// 	<div id={$key} className="my-6 text-right text-cool-gray-300" style={{ backgroundImage: "linear-gradient(transparent 0, transparent 0.625rem, currentColor 0.625rem, currentColor 0.875rem, transparent 0.875rem)" }}>
// 		<br />
// 	</div>
// ))
