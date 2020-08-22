import hash from "lib/x/hash"
import React from "react"
import renderTree from "lib/DOM/renderTree"
import { parseSemanticElements } from "./parsers"

test("<p><br></p>", () => {
	const id = hash()
	const tree = renderTree((
		<article>
			<p id={id}>
				<br />
			</p>
		</article>
	))
	const elements = parseSemanticElements(tree)
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

test("<p><code></code></p>", () => {
	const id = hash()
	const tree = renderTree((
		<article>
			<p id={id}>
				<code></code>
			</p>
		</article>
	))
	const elements = parseSemanticElements(tree)
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
	const id = hash()
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
	const elements = parseSemanticElements(tree)
	expect(elements).toEqual([
		{
			type: "p",
			key: id,
			props: {
				children: [
					{ types: {}, props: { children: "Hello," } },
					{ types: {}, props: { children: " " } },
					{
						types: {
							code: {},
						},
						props: {
							children: "world",
						},
					},
					{ types: {}, props: { children: "!" } },
				],
			},
		},
	])
})

test("<p>Hello, <code><a href='foo'><strike><strong><em>world</em></strong></strike></a></code></p>", () => {
	const id = hash()
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
	const elements = parseSemanticElements(tree)
	expect(elements).toEqual([
		{
			type: "p",
			key: id,
			props: {
				children: [
					{ types: {}, props: { children: "Hello," } },
					{ types: {}, props: { children: " " } },
					{
						types: {
							code: {},
							a: { href: "foo" },
							strike: {},
							strong: {},
							em: {},
						},
						props: {
							children: "world",
						},
					},
					{ types: {}, props: { children: "!" } },
				],
			},
		},
	])
})
