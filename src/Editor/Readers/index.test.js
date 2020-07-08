import React from "react"
import renderDOMTree from "lib/renderDOMTree"
import types from "../types"

import {
	rendered,
	semantic,
} from "./index"

describe("semantic", () => {
	test("<i>", () => {
		const domTree = renderDOMTree(<i>Hello, world!</i>)
		const [T, P] = semantic.scanner(domTree)
		expect(T).toBe(types.enum.em)
		expect(P).toEqual({})
	})
	test("<em>", () => {
		const domTree = renderDOMTree(<em>Hello, world!</em>)
		const [T, P] = semantic.scanner(domTree)
		expect(T).toBe(types.enum.em)
		expect(P).toEqual({})
	})
	test("<b>", () => {
		const domTree = renderDOMTree(<b>Hello, world!</b>)
		const [T, P] = semantic.scanner(domTree)
		expect(T).toBe(types.enum.strong)
		expect(P).toEqual({})
	})
	test("<strong>", () => {
		const domTree = renderDOMTree(<strong>Hello, world!</strong>)
		const [T, P] = semantic.scanner(domTree)
		expect(T).toBe(types.enum.strong)
		expect(P).toEqual({})
	})
	test("<a>...</a><a>...</a> (1 of 1)", () => {
		const domTree = renderDOMTree((
			<div>
				Hello,{" "}
				<a href="a">
					worldx
				</a>
				<a href="a">
					worldy
				</a>
				!
			</div>
		))
		const spans = semantic.spans(domTree)
		expect(spans).toEqual([
			{ types: [], text: "Hello, " },
			{ types: ["a"], text: "worldxworldy", a: { href: "a" } },
			{ types: [], text: "!" },
		])
	})
	test("<a>...</a><a>...</a> (2 of 2)", () => {
		const domTree = renderDOMTree((
			<div>
				Hello,{" "}
				<a href="a">
					worldx
				</a>
				<a href="b">
					worldy
				</a>
				!
			</div>
		))
		const spans = semantic.spans(domTree)
		expect(spans).toEqual([
			{ types: [], text: "Hello, " },
			{ types: ["a"], text: "worldx", a: { href: "a" } },
			{ types: ["a"], text: "worldy", a: { href: "b" } },
			{ types: [], text: "!" },
		])
	})
	test("* (1 of 2)", () => {
		const domTree = renderDOMTree((
			<div>
				Hello,{" "}
				<em>
					<strong>
						<strike>
							<a href="https://google.com">
								<code>
									world
								</code>
							</a>
						</strike>
					</strong>
				</em>
				!
			</div>
		))
		const spans = semantic.spans(domTree)
		expect(spans).toEqual([
			{ types: [], text: "Hello, " },
			{ types: ["code", "a", "strike", "strong", "em"], text: "world", a: { href: "https://google.com" } },
			{ types: [], text: "!" },
		])
	})
	test("* (2 of 2)", () => {
		const domTree = renderDOMTree((
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
		const spans = semantic.spans(domTree)
		expect(spans).toEqual([
			{ types: [], text: "Hello, " },
			{ types: ["code", "a", "strike", "strong", "em"], text: "world", a: { href: "https://google.com" } },
			{ types: [], text: "!" },
		])
	})
})

describe("rendered", () => {
	test("<i>", () => {
		const domTree = renderDOMTree(<i>Hello, world!</i>)
		const [T, P] = rendered.scanner(domTree)
		expect(T).toBe(types.enum.em)
		expect(P).toEqual({})
	})
	test("<span data-type='em'>", () => {
		const domTree = renderDOMTree(<span data-type="em">Hello, world!</span>)
		const [T, P] = rendered.scanner(domTree)
		expect(T).toBe(types.enum.em)
		expect(P).toEqual({})
	})
	test("<b>", () => {
		const domTree = renderDOMTree(<b>Hello, world!</b>)
		const [T, P] = rendered.scanner(domTree)
		expect(T).toBe(types.enum.strong)
		expect(P).toEqual({})
	})
	test("<span data-type='strong'>", () => {
		const domTree = renderDOMTree(<span data-type="strong">Hello, world!</span>)
		const [T, P] = rendered.scanner(domTree)
		expect(T).toBe(types.enum.strong)
		expect(P).toEqual({})
	})
	test("<span data-type='a'>...</span><span data-type='a'>...</span> (1 of 2)", () => {
		const domTree = renderDOMTree((
			<div>
				Hello,{" "}
				<span data-type="a" data-props={JSON.stringify({ href: "a" })}>
					worldx
				</span>
				<span data-type="a" data-props={JSON.stringify({ href: "a" })}>
					worldy
				</span>
				!
			</div>
		))
		const spans = rendered.spans(domTree)
		expect(spans).toEqual([
			{ types: [], text: "Hello, " },
			{ types: ["a"], text: "worldxworldy", a: { href: "a" } },
			{ types: [], text: "!" },
		])
	})
	test("<span data-type='a'>...</span><span data-type='a'>...</span> (2 of 2)", () => {
		const domTree = renderDOMTree((
			<div>
				Hello,{" "}
				<span data-type="a" data-props={JSON.stringify({ href: "a" })}>
					worldx
				</span>
				<span data-type="a" data-props={JSON.stringify({ href: "b" })}>
					worldy
				</span>
				!
			</div>
		))
		const spans = rendered.spans(domTree)
		expect(spans).toEqual([
			{ types: [], text: "Hello, " },
			{ types: ["a"], text: "worldx", a: { href: "a" } },
			{ types: ["a"], text: "worldy", a: { href: "b" } },
			{ types: [], text: "!" },
		])
	})
	test("* (1 of 2)", () => {
		const domTree = renderDOMTree((
			<div>
				Hello,{" "}
				<span data-type="em">
					<span data-type="strong">
						<span data-type="strike">
							<span data-type="a" data-props={JSON.stringify({ href: "https://google.com" })}>
								<span data-type="code">
									world
								</span>
							</span>
						</span>
					</span>
				</span>
				!
			</div>
		))
		const spans = rendered.spans(domTree)
		expect(spans).toEqual([
			{ types: [], text: "Hello, " },
			{ types: ["code", "a", "strike", "strong", "em"], text: "world", a: { href: "https://google.com" } },
			{ types: [], text: "!" },
		])
	})
	test("* (1 of 2)", () => {
		const domTree = renderDOMTree((
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
		const spans = rendered.spans(domTree)
		expect(spans).toEqual([
			{ types: [], text: "Hello, " },
			{ types: ["code", "a", "strike", "strong", "em"], text: "world", a: { href: "https://google.com" } },
			{ types: [], text: "!" },
		])
	})
})

// [
// 	{
// 		types: [],
// 		text: "Hello, ",
// 	},
// 	{
// 		types: [
// 			"code",
// 			"a",
// 			"strike",
// 			"strong",
// 			"em",
// 		],
// 		text: "world",
// 		a: {
// 			href: "https://google.com",
// 		},
// 	},
// 	{
// 		types: [],
// 		text: "!",
// 	},
// ]
