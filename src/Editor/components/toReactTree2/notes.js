// find the longest common element
// if there are multiple candidates, select the based on render precedence
// recurse?

// render the outside layer until we removed all the common types (based on order)
// recurse on inner elements, that’s it

// <strong>Hello, <code>world</code>!</strong>

// for (let x = 0; x < children.length; x++) {
// 	//
// }

// for (let x = 0; x < children.length; x++) {
// 	let x2 = x
// 	for (; x2 < children.length; x2++) {
// 		if (children[x].typeschildren[x2].types)
// 	}
// }

function doSomething(children) {
	for (let x = 0; x < children.length; x++) {
		let x2 = x + 1
		for (; x2 < children.length; x2++) {
			if (!typesInCommon(children[x], children[x2])) {
				// No-op
				break
			}
		}

		// recurse(children.slice(x, x2))
	}
}

// // Returns a map of the types in common. Returns null if
// // there are no types in common.
// function typesInCommon(types1, types2) {
// 	const common = {}
// 	for (const each of Object.keys(types2)) {
// 		if (types1[each] && types2[each] && JSONEqual(types1[each], types2[each])) {
// 			common[each] = types1[each]
// 		}
// 	}
// 	if (!Object.keys(common).length) {
// 		return null
// 	}
// 	return common
// }

// Returns a map of the types in common.
function typesInCommon(types1, types2) {
	const common = {}
	for (const each of Object.keys(types2)) {
		if (types1[each] && types2[each] && JSONEqual(types1[each], types2[each])) {
			common[each] = types1[each]
		}
	}
	return common
}


// // Returns an array of keys of the uncommon types.
// function uncommonTypeKeys(types1, types2) {
// 	const common = {}
// 	for (const each of Object.keys(types2)) {
// 		if (types1[each] && types2[each] && JSONEqual(types1[each], types2[each])) {
// 			common[each] = types1[each]
// 		}
// 	}
// 	return common
// }

// Returns an array of uncommon type keys.
function uncommonKeys(types1, types2) {
	const uncommon = []
	for (const each of Object.keys(types1)) {
		if (!types2[each] || !JSONEqual(types1[each], types2[each])) {
			uncommon.push(each)
		}
	}
	return uncommon
}

function fn(children) {
	if (!children.length) {
		// ....
	}

	const common = JSONClone(children[0].types)
	for (const each of children.slice(1)) {
		const keys = uncommonKeys(common, each)
		for (const key of keys) {
			common[key] = undefined
		}
	}

	sortedCommonArray = convTypesToArray(common)
	for (const each of sortedCommonArray) {
		// render
	}

	// ...
}

// function doSomething(children) {
// 	const cloned = JSONClone(children)
// 	for (let x1 = 0; x1 < children.length; x1++) {
// 		for (let x2 = x1; x2 < children.length; x2++) {
// 			// ...
// 		}
// 		// recurse?
// 	}
// 	// iterate?
// }

const children = [
	{
		types: {
			code: {},
		},
		props: {
			children: "aaa"
		},
	},
	{
		types: {
			code: {},
			strong: {},
		},
		props: {
			children: "bbb",
		},
	},
	{
		types: {
			code: {},
			strong: {},
			strong: {},
		},
		props: {
			children: "ccc",
		},
	},
	{
		types: {
			code: {},
			strong: {},
		},
		props: {
			children: "ddd",
		},
	},
	{
		types: {
			code: {},
		},
		props: {
			children: "eee"
		},
	},
]

function JSONEqual(v1 , v2) {
	const ok = (
		JSON.stringify(v1) === JSON.stringify(v2)
	)
	return ok
}

// Returns whether types have one or more types in common.
function hasOneOrMoreTypesInCommon(types1, types2) {
	return Object.keys(types1).some(each => JSONEqual(types1[each], types2[each]))

	// for (const each of Object.keys(types1)) {
	// 	if (types2[each] && JSONEqual(types1[each], types2[each])) {
	// 		return true
	// 	}
	// }
	// return false
}

// aaa
// -> bbb
// -> -> ccc
// -> ddd
// eee

// // Emits an <AnyList> element.
// function emitAnyList(range) {
// 	const { parent } = parseMetadata(range[0])
// 	const element = {
// 		...parent,
// 		children: [],
// 	}
// 	for (const each of range) {
// 		const { matches, parent, ...etc } = parseMetadata(each)
// 		const [, tabs, syntax] = matches
// 		let ref = element.children
// 		for (let x = 0; x < tabs.length; x++) {
// 			if (!ref.length || ref[ref.length - 1].type !== typeEnum.AnyList) {
// 				ref.push({
// 					...parent,
// 					children: [],
// 				})
// 			}
// 			ref = ref[ref.length - 1].children
// 		}
// 		ref.push({
// 			...etc,
// 			syntax: [tabs + syntax],
// 			children: parseInlineElements(each.data.slice((tabs + syntax).length)),
// 		})
// 	}
// 	return element
// }

// find the longest chain
// recurse on the contents of the chain, **excluding the
// types the longest has in common**?

function render(children, types) {
	const tree = {}
	for (const each of types) {
		Object.assign(tree, {
			...children, // ??
			type: each,
			props: {
				....children.props,
			},
		})
	}
	return tree
}

function (children, ctx) {
	let tree = []
	for () {
		for () {
			const common = getCommonTypes(children, ctx)
			if (!common) {
				tree.push(render())
			} else {
				tree.push(recurse(common))
			}
		}
	}
	return tree
}

function fn(children) {
	let x1 = 0
	for (; x1 < children.length; x1++) {
		let x2 = x1 + 1
		for (; x2 < children.length; x2++) {
			if (!hasOneOrMoreTypesInCommon(children[x1].types, children[x2].types)) {
				// No-op
				break
			}
		}
		x1 = x2
		console.log({ x1 })
	}
}

fn(children)

	// let x = 1
	// for (; x < children.length; x++) {
	// 	if (!hasOneOrMoreTypesInCommon(children[0].types, children[x].types)) {
	// 		// No-op
	// 		break
	// 	}
	// }
	// if (children.slice(1, x).length) {
	// 	fn(children.slice(1, x))
	// }
	// console.log(children.slice(0, x))
}

fn(children)

// function doSomething(children, typesCtx = {}) {
// 	for (let x = 0; x < children.length - 1; x++) {
// 		if (x + 1 < children.length - 1) {
// 			if (!JSONEqual(children[x], children[x + 1])) {
// 				render(children[x])
// 				// recurse(children.slice(x + 1))
// 			}
// 		}
// 	}
// }

// function typesAreStrictlyCommon(types1, types2) {
// 	return JSONEqual(types1, types2)
// }


// Stress test

//   -   code
//  ---  code + strong
// ----- code + strong + em
//  ---  code + strong
//   -   code

<code>
	aaa
	<strong>
		bbb
		<em>
			ccc
		</em>
		ddd
	</strong>
	eee
</code>

// render in common
// render remaining (could be a string)

// ----- code + strong + em
//  ---  code + strong
//   -   code
//  ---  code + strong
// ----- code + strong + em

function render() {

}

<code>
	<strong>
		<em>
			aaa
		</em>
		bbb
	</strong>
	ccc
	<strong>
		ddd
		<em>
			eee
		</em>
	</strong>
</code>

[
	{
		types: {
			code: {},
		},
		props: {
			children: "aaa"
		},
	},
	{
		types: {
			code: {},
			strong: {},
		},
		props: {
			children: "bbb",
		},
	},
	{
		types: {
			code: {},
			strong: {},
			strong: {},
		},
		props: {
			children: "ccc",
		},
	},
	{
		types: {
			code: {},
			strong: {},
		},
		props: {
			children: "ddd",
		},
	},
	{
		types: {
			code: {},
		},
		props: {
			children: "eee"
		},
	},
]

[
	{
		type: "code",
		props: {
			children: [
				"aaa",
				{
					type: "strong",
					props: {
						children: [
							"bbb",
							{
								type: "em",
								props: {
									children: "ccc",
								},
							},
							"ddd",
						],
					},
				},
				"ddd",
			],
		},
	},
]

aaa code
	bbb code + strong
		ccc code + strong + em
	ddd code + strong
eee code

// [
// 	{
// 		types: {
// 			strong: {},
// 		},
// 		props: {
// 			children: "Hello, "
// 		},
// 	},
// 	{
// 		types: {
// 			code: {},
// 			strong: {},
// 		},
// 		props: {
// 			children: "world",
// 		},
// 	},
// 	{
// 		types: {
// 			strong: {},
// 		},
// 		props: {
// 			children: "!",
// 		},
// 	},
// ]
//
// [
// 	{
// 		type: "strong",
// 		props: {
// 			children: [
// 				"Hello, ",
// 				{
// 					type: "code",
// 					props: {
// 						children: "world",
// 					},
// 				},
// 				"!",
// 			],
// 		},
// 	},
// ]
