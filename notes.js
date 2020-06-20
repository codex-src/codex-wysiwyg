// We should be able to resolve to:
//
// - Plaintext (lists are preserved, are code blocks indented?)
// - Markdown
// - HTML
// - React?
// - JSON? (probably not)

// We can use spans as a keyword to denote inline elements::
//
// {
// 	props: {
// 		spans: [
// 			// ...
// 		],
// 	},
// }

const elem = {
	type: typeEnum.p,
	key: "abc-xyz-123",
	props: {
		children: {
			spans: [
				// <span>
				// <span>
				// <span>
			],
		},
	},
}

// The exceptions are:
//
// - ul (incl. checklists)
// - ol (incl. checklists)
// - pre
// - media // TODO
// - hr    // TODO

const elem = {
	type: typeEnum.pre,
	key: "abc-xyz-123",
	props: {
		// filename: "main.go",
		language: "go", // TODO: Autocompute from filename?
		children: "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, world!\")\n}\n",
	},
}

const elem = {
	type: typeEnum.ul,
	key: "abc-xyz-123",
	props: {
		children: [
			{
				type: typeEnum.li,
				key: "abc-xyz-123-ext?",
				props: {
					checked: {
						value: false,
					},
					children: {
						spans: [
							// <span>
							// <span>
							// <span>
						],
					},
				},
			},
			{
				type: typeEnum.li,
				key: "abc-xyz-123-ext?",
				props: {
					checked: {
						value: false,
					},
					children: {
						spans: [
							// <span>
							// <span>
							// <span>
						],
					},
				},
			},
		],
	},
}
