import Node from "./Node"
import React from "react"
import T from "./T"
import toReact from "./toReact"

// h1: dedupeSpaces("font-semibold text-3xl leading-tight antialiased"),
// h2: dedupeSpaces("font-semibold text-2xl leading-tight antialiased"),
// h3: dedupeSpaces("font-semibold text-xl  leading-tight antialiased"),
// h4: dedupeSpaces("font-semibold text-xl  leading-tight antialiased"),
// h5: dedupeSpaces("font-semibold text-xl  leading-tight antialiased"),
// h6: dedupeSpaces("font-semibold text-xl  leading-tight antialiased"),

// <h1>
export const H1 = React.memo(({ id, children }) => (
	<T type="h1">
		<Node
			id={id}
			className="font-medium antialiased text-black"
			style={{
				fontSize: "1.625em",
				lineHeight: 1.45,
			}}
		>
			{toReact(children) || (
				<br />
			)}
		</Node>
	</T>
))

// <h2>
export const H2 = React.memo(({ id, children }) => (
	<T type="h2">
		<Node
			id={id}
			className="text-cool-gray-800 antialiased"
			style={{
				fontSize: "1.4375em",
				lineHeight: 1.45,
			}}
		>
			{toReact(children) || (
				<br />
			)}
		</Node>
	</T>
))

// export const H2 = H1 // TODO
export const H3 = H1 // TODO
export const H4 = H1 // TODO
export const H5 = H1 // TODO
export const H6 = H1 // TODO

// // <p class="lead">
// export const P = React.memo(({ id, children }) => (
// 	<T type="lead">
// 		<Node id={id}>
// 			{toReact(children) || (
// 				<br />
// 			)}
// 		</Node>
// 	</T>
// ))

// <p>
export const P = React.memo(({ id, children }) => (
	<T type="p">
		<Node
			id={id}
			className="leading-relaxed text-cool-gray-800"
			style={{
				fontSize: "1.125em",
			}}
		>
			{toReact(children) || (
				<br />
			)}
		</Node>
	</T>
))
