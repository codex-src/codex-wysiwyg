import hash from "lib/x/hash"
import React from "react"
import renderTree from "lib/DOM/renderTree"

import {
	computeEditorPositionFromDOMPosition,
	convertEditorPositionToDOMPosition,
} from "./Position"

const contentEditable = {
	contentEditable: true,
	suppressContentEditableWarning: true,
}

afterEach(() => {
	document.body.innerHTML = ""
})

test("[contenteditable='false']", () => {
	document.body.append((
		renderTree((
			<article contentEditable={false}>
				<div id={hash()} data-type="p">
					<br />
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = computeEditorPositionFromDOMPosition({ node: el, offset: 0 })
	expect(pos).toBe(null)
})

test("[<p><br></p>]", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={hash()} data-type="p">
					<br />
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = computeEditorPositionFromDOMPosition({
		node: el,
		offset: 0,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 0,
	})
	expect(convertEditorPositionToDOMPosition(pos)).toEqual({
		node: el.querySelector("br"),
		offset: 0,
	})
})

test("<p><br></p>[]", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={hash()} data-type="p">
					<br />
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = computeEditorPositionFromDOMPosition({
		node: el,
		offset: 1,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 0,
	})
	expect(convertEditorPositionToDOMPosition(pos)).toEqual({
		node: el.querySelector("br"),
		offset: 0,
	})
})

test("<p>[<br>]</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={hash()} data-type="p">
					<br />
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = computeEditorPositionFromDOMPosition({
		node: el.querySelector("br"),
		offset: 0,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 0,
	})
	expect(convertEditorPositionToDOMPosition(pos)).toEqual({
		node: el.querySelector("br"),
		offset: 0,
	})
})

test("<p><br>[]</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={hash()} data-type="p">
					<br />
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = computeEditorPositionFromDOMPosition({
		node: el.querySelector("br"),
		offset: 1,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 0,
	})
	expect(convertEditorPositionToDOMPosition(pos)).toEqual({
		node: el.querySelector("br"),
		offset: 0,
	})
})

test("<p>[]Hello, <code>world</code>!</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={hash()} data-type="p">
					Hello,{" "}
					<code>
						world
					</code>
					!
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = computeEditorPositionFromDOMPosition({
		node: el.childNodes[0],
		offset: 0,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 0,
	})
	expect(convertEditorPositionToDOMPosition(pos)).toEqual({
		node: el.childNodes[0],
		offset: 0,
	})
})

test("<p>Hello, []<code>world</code>!</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={hash()} data-type="p">
					{"Hello, "}
					<code>
						world
					</code>
					!
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = computeEditorPositionFromDOMPosition({
		node: el.childNodes[0],
		offset: 7,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 7,
	})
	expect(convertEditorPositionToDOMPosition(pos)).toEqual({
		node: el.childNodes[0],
		offset: 7,
	})
})

test("<p>Hello, <code>[]world</code>!</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={hash()} data-type="p">
					{"Hello, "}
					<code>
						world
					</code>
					!
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = computeEditorPositionFromDOMPosition({
		node: el.childNodes[1],
		offset: 0,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 7,
	})
	expect(convertEditorPositionToDOMPosition(pos)).toEqual({
		node: el.childNodes[0],
		offset: 7,
	})
})

test("<p>Hello, <code>world[]</code>!</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={hash()} data-type="p">
					{"Hello, "}
					<code>
						world
					</code>
					!
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = computeEditorPositionFromDOMPosition({
		node: el.querySelector("code").childNodes[0],
		offset: 5,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 12,
	})
	expect(convertEditorPositionToDOMPosition(pos)).toEqual({
		node: el.querySelector("code").childNodes[0],
		offset: 5,
	})
})

test("<p>Hello, <code>world</code>[]!</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={hash()} data-type="p">
					Hello,{" "}
					<code>
						world
					</code>
					!
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = computeEditorPositionFromDOMPosition({
		node: el.childNodes[3],
		offset: 0,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 12,
	})
	expect(convertEditorPositionToDOMPosition(pos)).toEqual({
		node: el.querySelector("code").childNodes[0],
		offset: 5,
	})
})

test("<p>Hello, <code>world</code>![]</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={hash()} data-type="p">
					Hello,{" "}
					<code>
						world
					</code>
					!
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = computeEditorPositionFromDOMPosition({
		node: el.childNodes[3],
		offset: 1,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 13,
	})
	expect(convertEditorPositionToDOMPosition(pos)).toEqual({
		node: el.childNodes[3],
		offset: 1,
	})
})
