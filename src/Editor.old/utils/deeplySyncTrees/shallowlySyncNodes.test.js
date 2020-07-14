import React from "react"
import renderTree from "lib/renderTree"
import shallowlySyncNodes from "./shallowlySyncNodes"

test("<div>Hello, world!</div> (1 of 4)", () => {
	const src = renderTree(<div><br /></div>)
	const dst = renderTree(<div><br /></div>)
	shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("<div>Hello, world!</div> (2 of 4)", () => {
	const src = renderTree(<div>Hello, world!</div>)
	const dst = renderTree(<div><br /></div>)
	shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("<div>Hello, world!</div> (3 of 4)", () => {
	const src = renderTree(<div><br /></div>)
	const dst = renderTree(<div>Hello, world!</div>)
	shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("<div>Hello, world!</div> (4 of 4)", () => {
	const src = renderTree(<div>Hello, world!</div>)
	const dst = renderTree(<div>Hello, world!</div>)
	shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
	expect(src.isEqualNode(dst)).toBeTruthy()
})
