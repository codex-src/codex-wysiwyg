import merge from "./children/merge"
import omitKey from "lib/omitKey"
import React from "react"
import sort from "./children/sort"
import toArray from "lib/toArray"

// Parses inline elements to intermediary React elements.
function parseInlineElements(children) {
	const intermediary = []
	const recurse = (reactElement, types = [], props = {}) => {
		for (const each of toArray(reactElement)) {
			if (typeof each === "string") {
				intermediary.push({
					types,
					props: {
						...props,
						children: each,
					},
				})
				continue
			}
			recurse(
				each.props.children,
				// Next types:
				[...types, each.type],
				// Next props:
				{ ...props, ...(each.type === "a" && { [each.type]: omitKey(each.props, "children") }) },
				// { ...props, [each.type]: omitKey(each.props, "children") },
			)
		}
	}
	recurse(children)
	return intermediary
}

// Parses elements to a intermediary React elements.
function parseElements(children) {
	const intermediary = []
	for (const each of toArray(children)) {
		switch (each.type) {
		// <h1>-<h6>
		case "h1":
		case "h2":
		case "h3":
		case "h4":
		case "h5":
		case "h6":
			intermediary.push({
				type: each.type,
				props: {
					children: parseInlineElements(each.props.children),
				},
			})
			break
		// <p>
		case "p":
			intermediary.push({
				type: each.type,
				props: {
					children: parseInlineElements(each.props.children),
				},
			})
			break
		// <hr>
		case "hr":
			intermediary.push({
				type: each.type,
				props: {
					children: null,
				},
			})
			break
		default:
			throw new Error("unknown type")
		}
	}
	return intermediary
}

const Editor = ({ children }) => {
	const intermediary = React.useMemo(() => {
		return parseElements(children).map(each => {
			switch (each.type) {
			case "h1":
			case "h2":
			case "h3":
			case "h4":
			case "h5":
			case "h6":
				merge(each.props.children).map(each => sort(each))
				break
			case "p":
				merge(each.props.children).map(each => sort(each))
				break
			case "hr":
				// No-op
				break
			default:
				throw new Error("unknown type")
			}
			return each
		})
	}, [children])

	return (
		<div>
			{children}
			<div className="whitespace-pre text-xs font-mono" style={{ tabSize: 2 }}>
				{JSON.stringify(intermediary, (key, value) => {
					if (key.startsWith("_")) {
						return undefined
					}
					return value
				}, "\t")}
			</div>
		</div>
	)
}

export default Editor
