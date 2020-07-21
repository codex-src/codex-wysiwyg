import toTree from "./index"

test("(empty)", () => {
	const children = []
	expect(toTree(children)).toEqual([])
})

test("Hello, world!", () => {
	const children = [
		{ types: [], props: { children: "Hello, world!" } },
	]
	expect(toTree(children)).toEqual([
		"Hello, world!",
	])
})

test("Hello, <code>world</code>!", () => {
	const children = [
		{ types: [], props: { children: "Hello, " } },
		{ types: [{ type: "code", props: null }], props: { children: "world" } },
		{ types: [], props: { children: "!" } },
	]
	expect(toTree(children)).toEqual([
		"Hello, ",
		{ type: "code", props: { children: "world" } },
		"!",
	])
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
	// <em>foo</em>,
	// <strong><em>bar</em></strong>,
	// <strike><strong><em>baz</em></strong></strike>,
	// <a><strike><strong><em>qux</em></strong></strike></a>,
	// <code><a><strike><strong><em>quux</em></strong></strike></a></code>,
	// <a><strike><strong><em>quuz</em></strong></strike></a>,
	// <strike><strong><em>corge</em></strong></strike>,
	// <strong><em>grault</em></strong>,
	// <em>garply</em>,
	//
	expect(toTree(children)).toEqual([
		{
			type: "em",
			props: {
				children: "foo",
			},
		},
		{
			type: "strong",
			props: {
				children: {
					type: "em",
					props: {
						children: "bar",
					},
				},
			},
		},
		{
			type: "strike",
			props: {
				children: {
					type: "strong",
					props: {
						children: {
							type: "em",
							props: {
								children: "baz",
							},
						},
					},
				},
			},
		},
		{
			type: "a",
			props: {
				children: {
					type: "strike",
					props: {
						children: {
							type: "strong",
							props: {
								children: {
									type: "em",
									props: {
										children: "qux",
									},
								},
							},
						},
					},
				},
			},
		},
		{
			type: "code",
			props: {
				children: {
					type: "a",
					props: {
						children: {
							type: "strike",
							props: {
								children: {
									type: "strong",
									props: {
										children: {
											type: "em",
											props: {
												children: "quux",
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
		{
			type: "a",
			props: {
				children: {
					type: "strike",
					props: {
						children: {
							type: "strong",
							props: {
								children: {
									type: "em",
									props: {
										children: "quuz",
									},
								},
							},
						},
					},
				},
			},
		},
		{
			type: "strike",
			props: {
				children: {
					type: "strong",
					props: {
						children: {
							type: "em",
							props: {
								children: "corge",
							},
						},
					},
				},
			},
		},
		{
			type: "strong",
			props: {
				children: {
					type: "em",
					props: {
						children: "grault",
					},
				},
			},
		},
		{
			type: "em",
			props: {
				children: "garply",
			},
		},
	])
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
	// <code>
	// 	foo
	// 	<a>
	// 		bar
	// 		<strike>
	// 			baz
	// 			<strong>
	// 				qux
	// 				<em>
	// 					quux
	// 				</em>
	// 				quuz
	// 			</strong>
	// 			corge
	// 		</strike>
	// 		grault
	// 	</a>
	// 	garply
	// </code>
	//
	expect(toTree(children)).toEqual([
		{
			type: "code",
			props: {
				children: [
					"foo",
					{
						type: "a",
						props: {
							children: [
								"bar",
								{
									type: "strike",
									props: {
										children: [
											"baz",
											{
												type: "strong",
												props: {
													children: [
														"qux",
														{
															type: "em",
															props: {
																children: "quux",
															},
														},
														"quuz",
													],
												},
											},
											"corge",
										],
									},
								},
								"grault",
							],
						},
					},
					"garply",
				],
			},
		},
	])
})
