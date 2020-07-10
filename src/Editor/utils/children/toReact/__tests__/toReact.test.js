import InlineElement from "../../../../model/Editor/InlineElement"
import JSONEqual from "lib/json/JSONEqual"
import React from "react"
import toReact from "../toReact"

import { // Unsorted
	Em,
	Strong,
	Code,
	Strike,
	A,
} from "../../../../components/components-text"

// https://github.com/facebook/jest/issues/8475#issuecomment-656629010
const throwMsg = "serializes to the same string"

test("(empty)", () => {
	const children = []
	expect(toReact(children)).toEqual(null)
})

test("Hello, world!", () => {
	const children = [
		new InlineElement({ value: "Hello, world!" }),
	]
	expect(toReact(children)).toEqual("Hello, world!")
})

test("Hello, <a href='https://google.com'>world</a>!", () => {
	const children = [
		new InlineElement({ value: "Hello, " }),
		new InlineElement({ types: ["a"], props: { a: { href: "https://google.com" } }, value: "world" }),
		new InlineElement({ value: "!" }),
	]
	expect(() => {
		expect(toReact(children)).toEqual([
			"Hello, ",
			<A href="https://google.com">
				world
			</A>,
			"!",
		])
	}).toThrow(throwMsg)
})

test("non-nested", () => {
	const children = [
		new InlineElement({ types: ["em"], value: "foo" }),
		new InlineElement({ types: ["strong", "em"], value: "bar" }),
		new InlineElement({ types: ["strike", "strong", "em"], value: "baz" }),
		new InlineElement({ types: ["a", "strike", "strong", "em"], value: "qux" }),
		new InlineElement({ types: ["code", "a", "strike", "strong", "em"], value: "quux" }),
		new InlineElement({ types: ["a", "strike", "strong", "em"], value: "quuz" }),
		new InlineElement({ types: ["strike", "strong", "em"], value: "corge" }),
		new InlineElement({ types: ["strong", "em"], value: "grault" }),
		new InlineElement({ types: ["em"], value: "garply" }),
	]
	expect(() => {
		expect(toReact(children)).toEqual([
			<Em>foo</Em>,
			<Strong><Em>bar</Em></Strong>,
			<Strike><Strong><Em>baz</Em></Strong></Strike>,
			<A><Strike><Strong><Em>qux</Em></Strong></Strike></A>,
			<Code><A><Strike><Strong><Em>quux</Em></Strong></Strike></A></Code>,
			<A><Strike><Strong><Em>quuz</Em></Strong></Strike></A>,
			<Strike><Strong><Em>corge</Em></Strong></Strike>,
			<Strong><Em>grault</Em></Strong>,
			<Em>garply</Em>,
		])
	}).toThrow(throwMsg)
})

test("nested", () => {
	const children = [
		new InlineElement({ types: ["code"], value: "foo" }),
		new InlineElement({ types: ["code", "a"], value: "bar" }),
		new InlineElement({ types: ["code", "a", "strike"], value: "baz" }),
		new InlineElement({ types: ["code", "a", "strike", "strong"], value: "qux" }),
		new InlineElement({ types: ["code", "a", "strike", "strong", "em"], value: "quux" }),
		new InlineElement({ types: ["code", "a", "strike", "strong"], value: "quuz" }),
		new InlineElement({ types: ["code", "a", "strike"], value: "corge" }),
		new InlineElement({ types: ["code", "a"], value: "grault" }),
		new InlineElement({ types: ["code"], value: "garply" }),
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
