import React from "react"
import toReact from "./toReact"

import { // Unsorted
	Em,
	Strong,
	Code,
	Strike,
	A,
} from "../components-text"

// https://github.com/facebook/jest/issues/8475#issuecomment-656629010
const throwMsg = "serializes to the same string"

test("(empty)", () => {
	const children = []
	expect(toReact(children)).toEqual(null)
})

test("Hello, world!", () => {
	const children = [{ types: [], props: { children: "Hello, world!" } }]
	expect(toReact(children)).toEqual("Hello, world!")
})

test("Hello, <code>world</code>!", () => {
	const children = [
		{ types: [], props: { children: "Hello, " } },
		{ types: [{ type: "code", props: null }], props: { children: "world" } },
		{ types: [], props: { children: "!" } },
	]
	expect(() => {
		expect(toReact(children)).toEqual([
			"Hello, ",
			<Code>
				world
			</Code>,
			"!",
		])
	}).toThrow(throwMsg)
})

test("stress test; non-nested", () => {
	const children = [
		{
			types: [
				{ type: "em", props: null },
			],
			props: {
				children: "foo",
			},
		},
		{
			types: [
				{ type: "strong", props: null },
				{ type: "em", props: null },
			],
			props: {
				children: "bar",
			},
		},
		{
			types: [
				{ type: "strike", props: null },
				{ type: "strong", props: null },
				{ type: "em", props: null },
			],
			props: {
				children: "baz",
			},
		},
		{
			types: [
				{ type: "a", props: null },
				{ type: "strike", props: null },
				{ type: "strong", props: null },
				{ type: "em", props: null },
			],
			props: {
				children: "qux",
			},
		},
		{
			types: [
				{ type: "code", props: null },
				{ type: "a", props: null },
				{ type: "strike", props: null },
				{ type: "strong", props: null },
				{ type: "em", props: null },
			],
			props: {
				children: "quux",
			},
		},
		{
			types: [
				{ type: "a", props: null },
				{ type: "strike", props: null },
				{ type: "strong", props: null },
				{ type: "em", props: null },
			],
			props: {
				children: "quuz",
			},
		},
		{
			types: [
				{ type: "strike", props: null },
				{ type: "strong", props: null },
				{ type: "em", props: null },
			],
			props: {
				children: "corge",
			},
		},
		{
			types: [
				{ type: "strong", props: null },
				{ type: "em", props: null },
			],
			props: {
				children: "grault",
			},
		},
		{
			types: [
				{ type: "em", props: null },
			],
			props: {
				children: "garply",
			},
		},
	]

	// expect(() => {
	// 	expect(toReact(children)).toEqual([
	// 		<Em>foo</Em>,
	// 		<Strong><Em>bar</Em></Strong>,
	// 		<Strike><Strong><Em>baz</Em></Strong></Strike>,
	// 		<A><Strike><Strong><Em>qux</Em></Strong></Strike></A>,
	// 		<Code><A><Strike><Strong><Em>quux</Em></Strong></Strike></A></Code>,
	// 		<A><Strike><Strong><Em>quuz</Em></Strong></Strike></A>,
	// 		<Strike><Strong><Em>corge</Em></Strong></Strike>,
	// 		<Strong><Em>grault</Em></Strong>,
	// 		<Em>garply</Em>,
	// 	])
	// }).toThrow(throwMsg)

	expect(() => {
		expect(toReact(children)).toEqual([
			<Em>
				foo
			</Em>,
			<Strong>
				<Em>
					bar
				</Em>
			</Strong>,
			<Strike>
				<Strong>
					<Em>
						baz
					</Em>
				</Strong>
			</Strike>,
			<A>
				<Strike>
					<Strong>
						<Em>
							qux
						</Em>
					</Strong>
				</Strike>
			</A>,
			<Code>
				<A>
					<Strike>
						<Strong>
							<Em>
								quux
							</Em>
						</Strong>
					</Strike>
				</A>
			</Code>,
			<A>
				<Strike>
					<Strong>
						<Em>
							quuz
						</Em>
					</Strong>
				</Strike>
			</A>,
			<Strike>
				<Strong>
					<Em>
						corge
					</Em>
				</Strong>
			</Strike>,
			<Strong>
				<Em>
					grault
				</Em>
			</Strong>,
			<Em>
				garply
			</Em>,
		])
	}).toThrow(throwMsg)
})

test("stress test; nested", () => {
	const children = [
		{
			types: [
				{ type: "code", props: null },
			],
			props: {
				children: "foo",
			},
		},
		{
			types: [
				{ type: "code", props: null },
				{ type: "a", props: null },
			],
			props: {
				children: "bar",
			},
		},
		{
			types: [
				{ type: "code", props: null },
				{ type: "a", props: null },
				{ type: "strike", props: null },
			],
			props: {
				children: "baz",
			},
		},
		{
			types: [
				{ type: "code", props: null },
				{ type: "a", props: null },
				{ type: "strike", props: null },
				{ type: "strong", props: null },
			],
			props: {
				children: "qux",
			},
		},
		{
			types: [
				{ type: "code", props: null },
				{ type: "a", props: null },
				{ type: "strike", props: null },
				{ type: "strong", props: null },
				{ type: "em", props: null },
			],
			props: {
				children: "quux",
			},
		},
		{
			types: [
				{ type: "code", props: null },
				{ type: "a", props: null },
				{ type: "strike", props: null },
				{ type: "strong", props: null },
			],
			props: {
				children: "quuz",
			},
		},
		{
			types: [
				{ type: "code", props: null },
				{ type: "a", props: null },
				{ type: "strike", props: null },
			],
			props: {
				children: "corge",
			},
		},
		{
			types: [
				{ type: "code", props: null },
				{ type: "a", props: null },
			],
			props: {
				children: "grault",
			},
		},
		{
			types: [
				{ type: "code", props: null },
			],
			props: {
				children: "garply",
			},
		},
	]
	expect(() => {
		expect(toReact(children)).toEqual((
			<Code>
				foo
				<A>
					bar
					<Strike>
						baz
						<Strong>
							qux
							<Em>
								quux
							</Em>
							quuz
						</Strong>
						corge
					</Strike>
					grault
				</A>
				garply
			</Code>
		))
	}).toThrow(throwMsg)
})
