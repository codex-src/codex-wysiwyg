import hash from "lib/hash"
import Position from "./Position"
import React from "react"
import renderTree from "lib/renderTree"

// https://github.com/facebook/jest/issues/8475#issuecomment-656629010
const throwMsg = "serializes to the same string"

const contenteditable = {
	contentEditable: true,
	suppressContentEditableWarning: true,
}

test("contenteditable=false", () => {
	const tree = renderTree((
		<div contentEditable={false}>
			{/* ... */}
		</div>
	))
	const literal = [tree, 0]
	expect(Position.fromUserLiteral(literal)).toBe(null)
})

test("node=[<p><br></p>] offset=0", () => {
	const tree = renderTree((
		<div {...contenteditable}>
			<div id={hash(6)} data-type="p">
				<br />
			</div>
		</div>
	))
	expect(() => {
		const literal = [tree.children[0], 0]
		expect(Position.fromUserLiteral(literal)).toBe(new Position({ key: tree.children[0].id, offset: 0 }))
	}).toThrow(throwMsg)
})

test("node=<p>[<br>]</p> offset=0", () => {
	const tree = renderTree((
		<div {...contenteditable}>
			<div id={hash(6)} data-type="p">
				<br />
			</div>
		</div>
	))
	expect(() => {
		const literal = [tree.children[0].childNodes[0], 0]
		expect(Position.fromUserLiteral(literal)).toBe(new Position({ key: tree.children[0].id, offset: 0 }))
	}).toThrow(throwMsg)
})

// NOTE: Does not use Hello{" "}; creates an extra text node.
test("node=<p>[Hello, ]<code>world</code>!</p> offset=0", () => {
	const tree = renderTree((
		<div {...contenteditable}>
			<div id={hash(6)} data-type="p">
				{"Hello, "}
				<code>
					world
				</code>
				!
			</div>
		</div>
	))
	expect(() => {
		const literal = [tree.children[0].childNodes[0], 0]
		expect(Position.fromUserLiteral(literal)).toBe(new Position({ key: tree.children[0].id, offset: 0 }))
	}).toThrow(throwMsg)
})

test("node=<p>[Hello, ]<code>world</code>!</p> offset=7", () => {
	const tree = renderTree((
		<div {...contenteditable}>
			<div id={hash(6)} data-type="p">
				{"Hello, "}
				<code>
					world
				</code>
				!
			</div>
		</div>
	))
	expect(() => {
		const literal = [tree.children[0].childNodes[0], 7]
		expect(Position.fromUserLiteral(literal)).toBe(new Position({ key: tree.children[0].id, offset: 7 }))
	}).toThrow(throwMsg)
})

test("node=<p>Hello, <code>[world]</code>!</p> offset=0", () => {
	const tree = renderTree((
		<div {...contenteditable}>
			<div id={hash(6)} data-type="p">
				{"Hello, "}
				<code>
					world
				</code>
				!
			</div>
		</div>
	))
	expect(() => {
		const literal = [tree.children[0].childNodes[1].childNodes[0], 0]
		expect(Position.fromUserLiteral(literal)).toBe(new Position({ key: tree.children[0].id, offset: 7 }))
	}).toThrow(throwMsg)
})

test("node=<p>Hello, <code>[world]</code>!</p> offset=5", () => {
	const tree = renderTree((
		<div {...contenteditable}>
			<div id={hash(6)} data-type="p">
				{"Hello, "}
				<code>
					world
				</code>
				!
			</div>
		</div>
	))
	expect(() => {
		const literal = [tree.children[0].childNodes[1].childNodes[0], 5]
		expect(Position.fromUserLiteral(literal)).toBe(new Position({ key: tree.children[0].id, offset: 12 }))
	}).toThrow(throwMsg)
})

test("node=<p>Hello, <code>world</code>[!]</p> offset=0", () => {
	const tree = renderTree((
		<div {...contenteditable}>
			<div id={hash(6)} data-type="p">
				{"Hello, "}
				<code>
					world
				</code>
				!
			</div>
		</div>
	))
	expect(() => {
		const literal = [tree.children[0].childNodes[2], 0]
		expect(Position.fromUserLiteral(literal)).toBe(new Position({ key: tree.children[0].id, offset: 12 }))
	}).toThrow(throwMsg)
})

test("node=<p>Hello, <code>world</code>[!]</p> offset=1", () => {
	const tree = renderTree((
		<div {...contenteditable}>
			<div id={hash(6)} data-type="p">
				{"Hello, "}
				<code>
					world
				</code>
				!
			</div>
		</div>
	))
	expect(() => {
		const literal = [tree.children[0].childNodes[2], 1]
		expect(Position.fromUserLiteral(literal)).toBe(new Position({ key: tree.children[0].id, offset: 13 }))
	}).toThrow(throwMsg)
})
