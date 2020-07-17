import * as Position from "./index"
import newHash from "lib/x/newHash"
import React from "react"
import renderTree from "lib/DOM/renderTree"

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
				<div id={newHash()} data-type="p">
					<br />
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({ node: el, offset: 0 })
	expect(pos).toBe(null)
})

test("[<p><br></p>]", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={newHash()} data-type="p">
					<br />
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: el,
		offset: 0,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 0,
	})
	expect(Position.toUserLiteral(pos)()).toEqual({
		node: el.querySelector("br"),
		offset: 0,
	})
})

test("<p><br></p>[]", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={newHash()} data-type="p">
					<br />
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: el,
		offset: 1,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 0,
	})
	expect(Position.toUserLiteral(pos)()).toEqual({
		node: el.querySelector("br"),
		offset: 0,
	})
})

test("<p>[<br>]</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={newHash()} data-type="p">
					<br />
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: el.querySelector("br"),
		offset: 0,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 0,
	})
	expect(Position.toUserLiteral(pos)()).toEqual({
		node: el.querySelector("br"),
		offset: 0,
	})
})

test("<p><br>[]</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={newHash()} data-type="p">
					<br />
				</div>
			</article>
		))
	))
	const el = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: el.querySelector("br"),
		offset: 1,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 0,
	})
	expect(Position.toUserLiteral(pos)()).toEqual({
		node: el.querySelector("br"),
		offset: 0,
	})
})

test("<p>[]Hello, <code>world</code>!</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={newHash()} data-type="p">
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
	const pos = Position.fromUserLiteral({
		node: el.childNodes[0],
		offset: 0,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 0,
	})
	expect(Position.toUserLiteral(pos)()).toEqual({
		node: el.childNodes[0],
		offset: 0,
	})
})

test("<p>Hello, []<code>world</code>!</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={newHash()} data-type="p">
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
	const pos = Position.fromUserLiteral({
		node: el.childNodes[0],
		offset: 7,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 7,
	})
	expect(Position.toUserLiteral(pos)()).toEqual({
		node: el.childNodes[0],
		offset: 7,
	})
})

test("<p>Hello, <code>[]world</code>!</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={newHash()} data-type="p">
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
	const pos = Position.fromUserLiteral({
		node: el.childNodes[1],
		offset: 0,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 7,
	})
	expect(Position.toUserLiteral(pos)()).toEqual({
		node: el.childNodes[0],
		offset: 7,
	})
})

test("<p>Hello, <code>world[]</code>!</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={newHash()} data-type="p">
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
	const pos = Position.fromUserLiteral({
		node: el.querySelector("code").childNodes[0],
		offset: 5,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 12,
	})
	expect(Position.toUserLiteral(pos)()).toEqual({
		node: el.querySelector("code").childNodes[0],
		offset: 5,
	})
})

test("<p>Hello, <code>world</code>[]!</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={newHash()} data-type="p">
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
	const pos = Position.fromUserLiteral({
		node: el.childNodes[3],
		offset: 0,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 12,
	})
	expect(Position.toUserLiteral(pos)()).toEqual({
		node: el.querySelector("code").childNodes[0],
		offset: 5,
	})
})

test("<p>Hello, <code>world</code>![]</p>", () => {
	document.body.append((
		renderTree((
			<article {...contentEditable}>
				<div id={newHash()} data-type="p">
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
	const pos = Position.fromUserLiteral({
		node: el.childNodes[3],
		offset: 1,
	})
	expect(pos).toEqual({
		key: el.id,
		offset: 13,
	})
	expect(Position.toUserLiteral(pos)()).toEqual({
		node: el.childNodes[3],
		offset: 1,
	})
})
