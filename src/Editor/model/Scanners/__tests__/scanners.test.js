import * as scanners from "../scanners"
import InlineElement from "../../Editor/InlineElement"
import React from "react"
import RenderedScanner from "../RenderedScanner"
import renderTree from "lib/renderTree"
import SemanticScanner from "../SemanticScanner"

describe("semantic", () => {
	test("<i>", () => {
		const tree = renderTree(<i>Hello, world!</i>)
		const [T, P] = scanners.semantic(tree)
		expect(T).toBe("em")
		expect(P).toEqual({})
	})
	test("<u>", () => {
		const tree = renderTree(<u>Hello, world!</u>)
		const [T, P] = scanners.semantic(tree)
		expect(T).toBe("em")
		expect(P).toEqual({})
	})
	test("<em>", () => {
		const tree = renderTree(<em>Hello, world!</em>)
		const [T, P] = scanners.semantic(tree)
		expect(T).toBe("em")
		expect(P).toEqual({})
	})
	test("<b>", () => {
		const tree = renderTree(<b>Hello, world!</b>)
		const [T, P] = scanners.semantic(tree)
		expect(T).toBe("strong")
		expect(P).toEqual({})
	})
	test("<strong>", () => {
		const tree = renderTree(<strong>Hello, world!</strong>)
		const [T, P] = scanners.semantic(tree)
		expect(T).toBe("strong")
		expect(P).toEqual({})
	})
	test("*", () => {
		const tree = renderTree((
			<div>
				Hello,{" "}
				<code>
					<a href="https://google.com">
						<strike>
							<strong>
								<em>
									world
								</em>
							</strong>
						</strike>
					</a>
				</code>
				!
			</div>
		))
		const scanner = new SemanticScanner()
		const children = scanner.scanChildren(tree)
		expect(children).toEqual([
			new InlineElement({ value: "Hello," }),
			new InlineElement({ value: " " }),
			new InlineElement({ types: ["code", "a", "strike", "strong", "em"], props: { a: { href: "https://google.com" } }, value: "world" }),
			new InlineElement({ value: "!" }),
		])
	})
})

describe("rendered", () => {
	test("<i>", () => {
		const tree = renderTree(<i>Hello, world!</i>)
		const [T, P] = scanners.rendered(tree)
		expect(T).toBe("em")
		expect(P).toEqual({})
	})
	test("<u>", () => {
		const tree = renderTree(<u>Hello, world!</u>)
		const [T, P] = scanners.rendered(tree)
		expect(T).toBe("em")
		expect(P).toEqual({})
	})
	test("<span data-type='em'>", () => {
		const tree = renderTree(<span data-type="em">Hello, world!</span>)
		const [T, P] = scanners.rendered(tree)
		expect(T).toBe("em")
		expect(P).toEqual({})
	})
	test("<b>", () => {
		const tree = renderTree(<b>Hello, world!</b>)
		const [T, P] = scanners.rendered(tree)
		expect(T).toBe("strong")
		expect(P).toEqual({})
	})
	test("<span data-type='strong'>", () => {
		const tree = renderTree(<span data-type="strong">Hello, world!</span>)
		const [T, P] = scanners.rendered(tree)
		expect(T).toBe("strong")
		expect(P).toEqual({})
	})
	test("*", () => {
		const tree = renderTree((
			<div>
				Hello,{" "}
				<span data-type="code">
					<span data-type="a" data-props={JSON.stringify({ href: "https://google.com" })}>
						<span data-type="strike">
							<span data-type="strong">
								<span data-type="em">
									world
								</span>
							</span>
						</span>
					</span>
				</span>
				!
			</div>
		))
		const scanner = new RenderedScanner(tree)
		const children = scanner.scanChildren(tree)
		expect(children).toEqual([
			new InlineElement({ value: "Hello," }),
			new InlineElement({ value: " " }),
			new InlineElement({ types: ["code", "a", "strike", "strong", "em"], props: { a: { href: "https://google.com" } }, value: "world" }),
			new InlineElement({ value: "!" }),
		])
	})
})
