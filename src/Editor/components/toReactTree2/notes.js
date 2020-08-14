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
		recurse(children.slice(x, x2))
	}
}

// Returns a map of the types in common. Returns null if
// there are no types in common.
function typesInCommon(types1, types2) {
	const common = {}
	for (const each of Object.keys(types2)) {
		if (types1[each] && types2[each] && JSONEqual(types1[each], types2[each])) {
			common[each] = types1[each]
		}
	}
	if (!Object.keys(common).length) {
		return null
	}
	return common
}


// // Converts children to tree-shaped children.
// function toTree(children) {
// 	const tree = []
// 	for (const each of children) {
// 		const [parentElement, types] = queryNext(tree, each)
// 		parentElement.push(createElement(each, types))
// 	}
// 	return tree
// }

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
