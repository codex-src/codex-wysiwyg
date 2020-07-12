import hash from "lib/hash"
import Position from "./Position"
import React from "react"
import renderTree from "lib/renderTree"

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
	const p = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({ node: p, offset: 0 })
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
	const p = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: p,
		offset: 0,
	})
	expect(pos).toEqual(new Position({
		key: p.id,
		offset: 0,
	}))
	expect(pos.toUserLiteral()).toEqual({
		node: p.querySelector("br"),
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
	const p = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: p,
		offset: 1,
	})
	expect(pos).toEqual(new Position({
		key: p.id,
		offset: 0,
	}))
	expect(pos.toUserLiteral()).toEqual({
		node: p.querySelector("br"),
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
	const p = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: p.querySelector("br"),
		offset: 0,
	})
	expect(pos).toEqual(new Position({
		key: p.id,
		offset: 0,
	}))
	expect(pos.toUserLiteral()).toEqual({
		node: p.querySelector("br"),
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
	const p = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: p.querySelector("br"),
		offset: 1,
	})
	expect(pos).toEqual(new Position({
		key: p.id,
		offset: 0,
	}))
	expect(pos.toUserLiteral()).toEqual({
		node: p.querySelector("br"),
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
	const p = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: p.childNodes[0],
		offset: 0,
	})
	expect(pos).toEqual(new Position({
		key: p.id,
		offset: 0,
	}))
	expect(pos.toUserLiteral()).toEqual({
		node: p.childNodes[0],
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
	const p = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: p.childNodes[0],
		offset: 7,
	})
	expect(pos).toEqual(new Position({
		key: p.id,
		offset: 7,
	}))
	expect(pos.toUserLiteral()).toEqual({
		node: p.childNodes[0],
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
	const p = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: p.childNodes[1],
		offset: 0,
	})
	expect(pos).toEqual(new Position({
		key: p.id,
		offset: 7,
	}))
	expect(pos.toUserLiteral()).toEqual({
		node: p.childNodes[0],
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
	const p = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: p.querySelector("code").childNodes[0],
		offset: 5,
	})
	expect(pos).toEqual(new Position({
		key: p.id,
		offset: 12,
	}))
	expect(pos.toUserLiteral()).toEqual({
		node: p.querySelector("code").childNodes[0],
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
	const p = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: p.childNodes[3],
		offset: 0,
	})
	expect(pos).toEqual(new Position({
		key: p.id,
		offset: 12,
	}))
	expect(pos.toUserLiteral()).toEqual({
		node: p.querySelector("code").childNodes[0],
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
	const p = document.querySelector("[data-type='p']")
	const pos = Position.fromUserLiteral({
		node: p.childNodes[3],
		offset: 1,
	})
	expect(pos).toEqual(new Position({
		key: p.id,
		offset: 13,
	}))
	expect(pos.toUserLiteral()).toEqual({
		node: p.childNodes[3],
		offset: 1,
	})
})
