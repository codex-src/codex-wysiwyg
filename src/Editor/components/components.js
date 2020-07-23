import Node from "./Node"
import React from "react"
import T from "./T"
import toReactTree from "./toReactTree"

// <h1>
export const H1 = React.memo(({ id, children }) => (
	<T type="h1">
		<Node id={id} className="font-medium text-black" style={{ fontSize: "1.375em", lineHeight: 1.45 }}>
			{toReactTree(children) || (
				<br />
			)}
		</Node>
	</T>
))

// <h2>
export const H2 = React.memo(({ id, children }) => (
	<T type="h2">
		<Node id={id} className="text-black" style={{ fontSize: "1.25em", lineHeight: 1.45 }}>
			{toReactTree(children) || (
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

// <p>
export const P = React.memo(({ id, children }) => (
	<T type="p">
		<Node id={id} className="leading-relaxed">
			{toReactTree(children) || (
				<br />
			)}
		</Node>
	</T>
))
