import newHash from "lib/x/newHash"
import React from "react"
import renderTree from "lib/DOM/renderTree"
import toArray from "lib/Array/toArray"
import { parseRenderedElements } from "./parsers"

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
			<div id={id} data-type="p">
				<br />
			</div>
		</article>
	))
	const elements = parseRenderedElements(tree)
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
					<Markdown syntax="`">
						world
					</Markdown>
				</span>
				!
			</div>
		</article>
	))
	const elements = parseRenderedElements(tree)
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
					<Markdown syntax="`">
						<span data-type="a" data-props={JSON.stringify({ href: "foo" })}>
							<Markdown syntax={["[", "](foo)"]}>
								<span data-type="strike">
									<Markdown syntax="~~">
										<span data-type="strong">
											<Markdown syntax="**">
												<span data-type="em">
													<Markdown syntax="**">
														world
													</Markdown>
												</span>
											</Markdown>
										</span>
									</Markdown>
								</span>
							</Markdown>
						</span>
					</Markdown>
				</span>
				!
			</div>
		</article>
	))
	const elements = parseRenderedElements(tree)
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
