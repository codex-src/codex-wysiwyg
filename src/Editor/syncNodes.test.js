import React from "react"
import renderDOMTree from "lib/renderDOMTree"

import {
	deeplySyncNodes,
	replaceAttributes,
	shallowlySyncNodes,
} from "./syncNodes"

describe("replaceAttributes", () => {
	test("", () => {
		const src = renderDOMTree(<div />)
		const dst = renderDOMTree(<div />)
		replaceAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div />)
		const dst = renderDOMTree(<div className="a" />)
		replaceAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a" />)
		const dst = renderDOMTree(<div />)
		replaceAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a" />)
		const dst = renderDOMTree(<div className="a" />)
		replaceAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a" />)
		const dst = renderDOMTree(<div className="a b c" />)
		replaceAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a b c" />)
		const dst = renderDOMTree(<div className="a" />)
		replaceAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a b c" />)
		const dst = renderDOMTree(<div className="a b c" />)
		replaceAttributes(src, dst)
		expect(dst.outerHTML).toBe(src.outerHTML)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a b c" tabIndex="0" />)
		const dst = renderDOMTree(<div id="hello-world" className="a b c" />)
		replaceAttributes(src, dst)
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
		replaceAttributes(src, dst)
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

describe("shallowlySyncNodes", () => {
	// Text nodes:
	test("", () => {
		const src = document.createTextNode("")
		const dst = document.createTextNode("")
		shallowlySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
	})
	test("", () => {
		const src = document.createTextNode("")
		const dst = document.createTextNode("hello, world!")
		shallowlySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
	})
	test("", () => {
		const src = document.createTextNode("hello, world!")
		const dst = document.createTextNode("")
		shallowlySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
	})
	test("", () => {
		const src = document.createTextNode("hello, world!")
		const dst = document.createTextNode("hello, world!")
		shallowlySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
	})
	// Elements:
	test("", () => {
		const src = renderDOMTree(<div />)
		const dst = renderDOMTree(<div />)
		shallowlySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
	})
	test("", () => {
		const src = renderDOMTree(<div />)
		const dst = renderDOMTree(<div className="a b c" />)
		shallowlySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a b c" />)
		const dst = renderDOMTree(<div />)
		shallowlySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
	})
	test("", () => {
		const src = renderDOMTree(<div className="a b c" />)
		const dst = renderDOMTree(<div className="a b c" />)
		shallowlySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
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
		shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
		expect(dst.isEqualNode(src)).toBe(true)
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
		shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
		expect(dst.isEqualNode(src)).toBe(true)
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
		shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
		expect(dst.isEqualNode(src)).toBe(true)
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
		shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
		expect(dst.isEqualNode(src)).toBe(true)
	})
})

describe("deeplySyncNodes", () => {
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
		deeplySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
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
		deeplySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
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
		deeplySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
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
		deeplySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
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
		deeplySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
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
		deeplySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
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
		deeplySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
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
		deeplySyncNodes(src, dst)
		expect(dst.isEqualNode(src)).toBe(true)
	})
})
