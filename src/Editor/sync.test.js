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
		const srcMap = new Map()
		for (const each of [...src.attributes]) {
			srcMap.set(each.nodeName, each.nodeValue)
		}
		const dstMap = new Map()
		for (const each of [...dst.attributes]) {
			dstMap.set(each.nodeName, each.nodeValue)
		}
		expect(srcMap).toStrictEqual(dstMap)
	})
	test("", () => {
		const dst = renderDOMTree(<div id="hello-world" className="a b c" />)
		const src = renderDOMTree(<div className="a b c" tabIndex="0" />)
		replaceDOMAttributes(src, dst)
		const srcMap = new Map()
		for (const each of [...src.attributes]) {
			srcMap.set(each.nodeName, each.nodeValue)
		}
		const dstMap = new Map()
		for (const each of [...dst.attributes]) {
			dstMap.set(each.nodeName, each.nodeValue)
		}
		expect(srcMap).toStrictEqual(dstMap)
	})
})

describe("shallowlySyncDOMNodes", () => {
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
