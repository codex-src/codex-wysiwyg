import cleanDOMTree from "./cleanDOMTree"
import domUtils from "lib/domUtils"
import hash from "lib/hash"
import JSONClone from "lib/JSONClone"
import markupToHTML from "lib/markupToHTML"
import React from "react"
import ReactDOMServer from "react-dom/server"
import types from "./types"
import useMethods from "use-methods"

const methods = state => ({
	// select(cursors) {
	// 	state.cursors = cursors
	// },
	// input(element, collapsed) {
	// 	// Force rerender on <br> to a text node:
	// 	const y = must(state.elements.findIndex(each => each.key === collapsed[0].key))
	// 	if (!state.elements[y].props.children.length) {
	// 		const forcedKey = newHashID(8)
	// 		element.key = forcedKey
	// 		collapsed[0].key = forcedKey // Updates cursor[1].key because references are shared
	// 	}
	// 	state.elements.splice(y, 1, element)
	// 	this.select(collapsed)
	// 	this.render()
	// },
	render() {
		state.shouldRerender++
	},
})

function init(elements) {
	const state = {
		elements,
		range: {
			// 0: Cursors.construct(),
			// 1: Cursors.construct(),
			// collapsed: true,
		},
		shouldRerender: 0,
	}
	return state
}

function useEditor({ markup, children }) {
	const elements = React.useMemo(() => {
		if (!(markup !== undefined ^ children !== undefined)) {
			throw new Error("useEditor: markup or children must not be undefined")
		}
		// Render markup to HTML:
		let domTree = null
		if (markup !== undefined) {
			domTree = markupToHTML(markup)
		// Render React elements to markup to HTML:
		} else if (children !== undefined) {
			const markup = ReactDOMServer.renderToStaticMarkup(children) // Shadows markup
			domTree = markupToHTML(markup)
		}

		// Reads spans from a DOM element.
		//
		// TODO: Add readNodes
		const readSpans = domElement => {
			// DOM node recurser; pushes spans.
			const spans = []
			const recurse = (domNode, types = [], props = {}) => {
				if (domUtils.isTextNodeOrBrElement(domNode)) {
					if (domUtils.isTextNode(domNode)) {
						spans.push({
							types,
							...props,
							text: domNode.nodeValue,
						})
					}
					return
				}
				for (const each of domNode.childNodes) {
					const nextTypes = [...types]
					const nextProps = JSONClone(props)
					if (domUtils.isElement(each)) {
						// Next type:
						const T = domUtils.nodeName(each)
						nextTypes.push(T)
						// Next props:
						const P = {}
						for (const attr of each.attributes) {
							Object.assign(P, {
								[attr.nodeName]: attr.nodeValue,
							})
						}
						if (Object.keys(P).length) {
							nextProps[T] = P
						}
					}
					recurse(each, nextTypes, nextProps)
				}
			}
			recurse(domElement)
			return spans
		}

		// Reads elements from a DOM tree.
		const readElements = domTree => {
			const elements = []
			for (const each of domTree.children) {
				switch (domUtils.nodeName(each)) {
				case "p":
					elements.push({
						type: types.p,
						key: each.id || hash(8),
						props: {
							spans: readSpans(each),
						},
					})
					break
				default:
					throw new Error("FIXME")
				}
			}
			return elements
		}

		return readElements(domTree)
	}, [markup, children])

	return useMethods(methods, {}, () => init(elements))
}

export default useEditor
