import newHash from "lib/x/newHash"
import React from "react"
import renderTree from "lib/DOM/renderTree"
import toArray from "lib/Array/toArray"
import { parseSemanticElements } from "./parsers"

const Syntax = ({ children }) => (
	<span data-type="markdown" contentEditable={false}>
		{children}
	</span>
)

const Markdown = ({ syntax, children }) => (
	<React.Fragment>
		<Syntax>
			{toArray(syntax)[0]}
		</Syntax>
		{children}
		<Syntax>
			{toArray(syntax).slice(-1)[0]}
		</Syntax>
	</React.Fragment>
)

test("<p><br></p>", () => {
	const id = newHash()
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

test("<p>Hello, <code>world</code>!</p>", () => {
	const id = newHash()
	const tree = renderTree((
		<article>
			<p id={id}>
				Hello,{" "}
				<code>
					<Markdown syntax="`">
						world
					</Markdown>
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
			<p id={id}>
				Hello,{" "}
				<code>
					<Markdown syntax="`">
						<a href="foo">
							<Markdown syntax={["[", "](foo)"]}>
								<strike>
									<Markdown syntax="~~">
										<strong>
											<Markdown syntax="**">
												<em>
													<Markdown syntax="**">
														world
													</Markdown>
												</em>
											</Markdown>
										</strong>
									</Markdown>
								</strike>
							</Markdown>
						</a>
					</Markdown>
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
