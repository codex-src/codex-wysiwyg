import newHash from "lib/x/newHash"
import React from "react"
import renderTree from "lib/DOM/renderTree"
import { parseSemanticTree } from "./parsers"

test("<p><br></p>", () => {
	const id = newHash()
	const tree = renderTree((
		<article>
			<p id={id}>
				<br />
			</p>
		</article>
	))
	const elements = parseSemanticTree(tree)
	expect(elements).toEqual([
		{
			type: "p",
			key: id,
			props: {
				children: [],
			},
		},
	])
})

test("<p>Hello, <code>world</code>!</p>", () => {
	const id = newHash()
	const tree = renderTree((
		<article>
			<p id={id}>
				Hello,{" "}
				<code>
					world
				</code>
				!
			</p>
		</article>
	))
	const elements = parseSemanticTree(tree)
	expect(elements).toEqual([
		{
			type: "p",
			key: id,
			props: {
				children: [
					{ types: [], props: { children: "Hello," } },
					{ types: [], props: { children: " " } },
					{
						types: [
							{
								type: "code",
								props: null,
							},
						],
						props: {
							children: "world",
						},
					},
					{ types: [], props: { children: "!" } },
				],
			},
		},
	])
})

test("<p>Hello, <code><a href='foo'><strike><strong><em>world</em></strong></strike></a></code></p>", () => {
	const id = newHash()
	const tree = renderTree((
		<article>
			<p id={id}>
				Hello,{" "}
				<code>
					<a href="foo">
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
			</p>
		</article>
	))
	const elements = parseSemanticTree(tree)
	expect(elements).toEqual([
		{
			type: "p",
			key: id,
			props: {
				children: [
					{ types: [], props: { children: "Hello," } },
					{ types: [], props: { children: " " } },
					{
						types: [
							{ type: "code", props: null },
							{ type: "a", props: { href: "foo" } },
							{ type: "strike", props: null },
							{ type: "strong", props: null },
							{ type: "em", props: null },
						],
						props: {
							children: "world",
						},
					},
					{ types: [], props: { children: "!" } },
				],
			},
		},
	])
})
