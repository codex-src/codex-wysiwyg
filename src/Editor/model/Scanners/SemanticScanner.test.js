import Element from "../Editor/Element"
import hash from "lib/hash"
import InlineElement from "../Editor/InlineElement"
import React from "react"
import renderTree from "lib/renderTree"
import SemanticScanner from "./SemanticScanner"

test("<p><br></p>", () => {
	const id = hash()
	const tree = renderTree((
		<article>
			<p id={id}>
				<br />
			</p>
		</article>
	))
	const scanner = new SemanticScanner()
	const elements = scanner.scanElements(tree)
	expect(elements).toEqual([
		new Element({
			type: "p",
			key: id,
			props: {
				children: [],
			},
		}),
	])
})

test("<p>Hello, <a href='foo'>world</a>!</p>", () => {
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
	const scanner = new SemanticScanner()
	const elements = scanner.scanElements(tree)
	expect(elements).toEqual([
		new Element({
			type: "p",
			key: id,
			props: {
				children: [
					new InlineElement({ value: "Hello," }),
					new InlineElement({ value: " " }),
					new InlineElement({ types: ["code", "a", "strike", "strong", "em"], props: { a: { href: "foo" } }, value: "world" }),
					new InlineElement({ value: "!" }),
				],
			},
		}),
	])
})
