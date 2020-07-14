import newHash from "lib/x/newHash"
import React from "react"
import renderTree from "lib/DOM/renderTree"
import { parseRenderedTree } from "./parsers"

test("<p><br></p>", () => {
	const id = newHash()
	const tree = renderTree((
		<article>
			<div id={id} data-type="p">
				<br />
			</div>
		</article>
	))
	const elements = parseRenderedTree(tree)
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
			<div id={id} data-type="p">
				Hello,{" "}
				<span data-type="code">
					world
				</span>
				!
			</div>
		</article>
	))
	const elements = parseRenderedTree(tree)
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
			<div id={id} data-type="p">
				Hello,{" "}
				<span data-type="code">
					<span data-type="a" data-props={JSON.stringify({ href: "foo" })}>
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
		</article>
	))
	const elements = parseRenderedTree(tree)
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
