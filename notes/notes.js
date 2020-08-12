// <blockquote>
//   <Node>
//     <Span>
//     <Span>
//   <Node>
//   <Node>
//     <Span>
//     <Span>
//   <Node>
// </blockquote>
//
// <ul>
//   <Node> <- <li> (needs props)
//     <Span>
//     <Span>
//   <Node>
//   <Node>
//     <Span>
//     <Span>
//   <Node>
// </ul>
//
// <pre>
//   <ul>
//     <Node> <- <li> (needs props)
//       <Span>
//       <Span>
//     </Node>
//   </Ul>
// </pre>

// elements[0].nodes[0].spans.insert(2, 7, text)
// elements[0].nodes[0].spans.format(2, 7, types, props)
// elements[0].nodes[0].spans.deformat(2, 7, types)

const elements = [
	{
		type: ...,
		key: ...,
		// ...props
		nodes: [
			{
				type: "",
				key: "",
				// ...props
				spans: [
					{
						types: [..., ...],
						[types.a]: {
							// ...
						},
						text: ...,
					},
					{
						types: [..., ...],
						[types.a]: {
							// ...
						},
						text: ...,
					},
				],
			},
		],
	},
]

// elements[0].spans
const elements = [
	{
		type: ...,
		key: ...,
		// ...props
		spans: [
			{
				types: [..., ...],
				[types.a]: {
					// ...
				},
				text: ...,
			},
			{
				types: [..., ...],
				[types.a]: {
					// ...
				},
				text: ...,
			},
		],
	},
]
