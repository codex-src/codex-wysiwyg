import React from "react"
import renderDOMTree from "lib/renderDOMTree"

import {
	deeplySyncDOMTrees,
	replaceDOMAttributes,
	shallowlySyncDOMNodes,
} from "./sync"

describe("replaceDOMAttributes", () => {
	test("", () => {
		const src = renderDOMTree(<div />)
		const dst = renderDOMTree(<div />)
		replaceDOMAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div />)
		const dst = renderDOMTree(<div className="a" />)
		replaceDOMAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a" />)
		const dst = renderDOMTree(<div />)
		replaceDOMAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a" />)
		const dst = renderDOMTree(<div className="a" />)
		replaceDOMAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a" />)
		const dst = renderDOMTree(<div className="a b c" />)
		replaceDOMAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a b c" />)
		const dst = renderDOMTree(<div className="a" />)
		replaceDOMAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a b c" />)
		const dst = renderDOMTree(<div className="a b c" />)
		replaceDOMAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a b c" tabIndex="0" />)
		const dst = renderDOMTree(<div id="hello-world" className="a b c" />)
		replaceDOMAttributes(src, dst)
		// NOTE: Use an ES6 map to compare output because
		// outerHTML breaks because of order and ES6 maps are
		// sorted

		// const srcMap = new Map()
		// const dstMap = new Map()
		// ;[...src.attributes].map(each => srcMap.set(each.nodeName, each.nodeValue)
		// ;[...dst.attributes].map(eahc => dstMap.set(each.nodeName, each.nodeValue)

		const srcMap = new Map()
		for (const each of [...src.attributes]) {
			srcMap.set(each.nodeName, each.nodeValue)
		}
		const dstMap = new Map()
		for (const each of [...dst.attributes]) {
			dstMap.set(each.nodeName, each.nodeValue)
		}
		// NOTE: outerHTML breaks because of order
		expect(srcMap).toStrictEqual(dstMap)
	})
	test("", () => {
		const dst = renderDOMTree(<div id="hello-world" className="a b c" />)
		const src = renderDOMTree(<div className="a b c" tabIndex="0" />)
		replaceDOMAttributes(src, dst)
		// NOTE: Use an ES6 map to compare output because
		// outerHTML breaks because of order and ES6 maps are
		// sorted
		const srcMap = new Map()
		for (const each of [...src.attributes]) {
			srcMap.set(each.nodeName, each.nodeValue)
		}
		const dstMap = new Map()
		for (const each of [...dst.attributes]) {
			dstMap.set(each.nodeName, each.nodeValue)
		}
		// NOTE: outerHTML breaks because of order
		expect(srcMap).toStrictEqual(dstMap)
	})
})

describe("shallowlySyncDOMNodes", () => {
	// Text nodes:
	test("", () => {
		const src = document.createTextNode("")
		const dst = document.createTextNode("")
		shallowlySyncDOMNodes(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = document.createTextNode("")
		const dst = document.createTextNode("hello, world!")
		shallowlySyncDOMNodes(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = document.createTextNode("hello, world!")
		const dst = document.createTextNode("")
		shallowlySyncDOMNodes(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = document.createTextNode("hello, world!")
		const dst = document.createTextNode("hello, world!")
		shallowlySyncDOMNodes(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	// Elements:
	test("", () => {
		const src = renderDOMTree(<div />)
		const dst = renderDOMTree(<div />)
		shallowlySyncDOMNodes(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = renderDOMTree(<div />)
		const dst = renderDOMTree(<div className="a b c" />)
		shallowlySyncDOMNodes(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = renderDOMTree(<div className="a b c" />)
		const dst = renderDOMTree(<div />)
		shallowlySyncDOMNodes(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = renderDOMTree(<div className="a b c" />)
		const dst = renderDOMTree(<div className="a b c" />)
		shallowlySyncDOMNodes(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	// Elements and text nodes:
	//
	// NOTE: Use childNodes[0] so we can compare the new
	// reference
	//
	// const clonedElement = src.cloneNode(true)
	// dst.replaceWith(clonedElement)
	//
	test("", () => {
		const src = renderDOMTree((
			<div>
				<div />
			</div>
		))
		const dst = renderDOMTree((
			<div>
				<p />
			</div>
		))
		shallowlySyncDOMNodes(src.childNodes[0], dst.childNodes[0])
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const dst = renderDOMTree((
			<div>
				<p />
			</div>
		))
		const src = renderDOMTree((
			<div>
				<div />
			</div>
		))
		shallowlySyncDOMNodes(src.childNodes[0], dst.childNodes[0])
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = renderDOMTree((
			<div>
				<div />
			</div>
		))
		const dst = renderDOMTree((
			<div>
				hello, world!
			</div>
		))
		shallowlySyncDOMNodes(src.childNodes[0], dst.childNodes[0])
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = renderDOMTree((
			<div>
				hello, world!
			</div>
		))
		const dst = renderDOMTree((
			<div>
				<div />
			</div>
		))
		shallowlySyncDOMNodes(src.childNodes[0], dst.childNodes[0])
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
})

describe("deeplySyncDOMTrees", () => {
	test("", () => {
		const src = renderDOMTree((
			<div>
				{/* ... */}
			</div>
		))
		const dst = renderDOMTree((
			<div>
				{/* ... */}
			</div>
		))
		deeplySyncDOMTrees(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = renderDOMTree((
			<div>
				{/* ... */}
			</div>
		))
		const dst = renderDOMTree((
			<div>
				hello, world!
			</div>
		))
		deeplySyncDOMTrees(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = renderDOMTree((
			<div>
				hello, world!
			</div>
		))
		const dst = renderDOMTree((
			<div>
				{/* ... */}
			</div>
		))
		deeplySyncDOMTrees(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = renderDOMTree((
			<div>
				hello, world!
			</div>
		))
		const dst = renderDOMTree((
			<div>
				hello, world!
			</div>
		))
		deeplySyncDOMTrees(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = renderDOMTree((
			<div>
				hello, world!
			</div>
		))
		const dst = renderDOMTree((
			<div>
				<p>
					hello, world!
				</p>
			</div>
		))
		deeplySyncDOMTrees(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = renderDOMTree((
			<div>
				<p>
					hello, world!
				</p>
			</div>
		))
		const dst = renderDOMTree((
			<div>
				hello, world!
			</div>
		))
		deeplySyncDOMTrees(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = renderDOMTree((
			<div>
				hello, world!
				hello, world!
			</div>
		))
		const dst = renderDOMTree((
			<div>
				<p>
					hello, world!
				</p>
			</div>
		))
		deeplySyncDOMTrees(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
	test("", () => {
		const src = renderDOMTree((
			<div>
				<p>
					hello, world!
				</p>
			</div>
		))
		const dst = renderDOMTree((
			<div>
				hello, world!
				hello, world!
			</div>
		))
		deeplySyncDOMTrees(src, dst)
		expect(dst.isEqualNode(src)).toBeTruthy()
	})
})
