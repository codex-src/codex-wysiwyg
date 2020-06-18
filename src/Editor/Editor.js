import toArray from "lib/toArray"
import React from "react"

// Omits a key from a destructured object.
function omitKey(object, key) {
	const { [key]: _, ...destructured } = object
	return destructured
}

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

// Compares whether two intermediary element children are
// equal in types and props.
function areEqualTypesAndProps(e1, e2) {
	const ok = (
		JSON.stringify(e1.types) === JSON.stringify(e2.types) &&
		JSON.stringify(omitKey(e1.props, "children")) === JSON.stringify(omitKey(e2.props, "children"))
	)
	return ok
}

// Merges an intermediary element’s children.
function merge(children) {
	const merged = []
	for (let x = 0; x < children.length; x++) {
		if (x - 1 >= 0 && areEqualTypesAndProps(children[x - 1], children[x])) {
			merged.splice(merged.length - 1, 1, {
				...children[x - 1],
				props: {
					...children[x - 1].props,
					children: children[x - 1].props.children + children[x].props.children,
				},
			})
			continue
		}
		merged.push(children[x])
	}
	return merged
}

// function sortChildrenTypes(intermediary) {
// 	// const sorted = []
// 	return intermediary
// }

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
				each.props.children = /* sort( */ merge(each.props.children) /* ) */
				break
			case "p":
				each.props.children = /* sort( */ merge(each.props.children) /* ) */
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
