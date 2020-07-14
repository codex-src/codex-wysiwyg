import concat from "./concat"
import InlineElement from "../../../model/Editor/InlineElement"

test("(empty)", () => {
	const children = []
	concat(children)
	expect(children).toEqual([])
})

test("Hello, world! (1 of 2)", () => {
	const children = [
		new InlineElement({ value: "Hello, world!" }),
	]
	concat(children)
	expect(children).toEqual([
		new InlineElement({ value: "Hello, world!" }),
	])
})

test("Hello, world! (2 of 2)", () => {
	const children = [
		new InlineElement({ value: "Hello, " }),
		new InlineElement({ value: "world" }),
		new InlineElement({ value: "!" }),
	]
	concat(children)
	expect(children).toEqual([new InlineElement({ value: "Hello, world!" })])
})

test("Hello, <a href='foo'>worldx</a><a href='bar'>worldy</a>!", () => {
	const children = [
		new InlineElement({ value: "Hello, " }),
		new InlineElement({ types: ["a"], props: { a: { href: "foo" } }, value: "worldx" }),
		new InlineElement({ types: ["a"], props: { a: { href: "foo" } }, value: "worldy" }),
		new InlineElement({ value: "!" }),
	]
	concat(children)
	expect(children).toEqual([
		new InlineElement({ value: "Hello, " }),
		new InlineElement({ types: ["a"], props: { a: { href: "foo" } }, value: "worldxworldy" }),
		new InlineElement({ value: "!" }),
	])
})

test("Hello, <a href='foo'>worldx</a><a href='bar'>worldy</a>!", () => {
	const children = [
		new InlineElement({ value: "Hello, " }),
		new InlineElement({ types: ["a"], props: { a: { href: "foo" } }, value: "worldx" }),
		new InlineElement({ types: ["a"], props: { a: { href: "bar" } }, value: "worldy" }),
		new InlineElement({ value: "!" }),
	]
	concat(children)
	expect(children).toEqual([
		new InlineElement({ value: "Hello, " }),
		new InlineElement({ types: ["a"], props: { a: { href: "foo" } }, value: "worldx" }),
		new InlineElement({ types: ["a"], props: { a: { href: "bar" } }, value: "worldy" }),
		new InlineElement({ value: "!" }),
	])
})
