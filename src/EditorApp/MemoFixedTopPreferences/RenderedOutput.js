// import { // Unsorted
// 	toGFM,
// 	toHTML,
// } from "./cmap"
//
// const RenderedOutput = ({ output, setOutput }) => {
// 	const debouncedElements = React.useContext(DebouncedElementsContext)
//
// 	const [resolved, setResolved] = React.useState(() => {
// 		const gfm = toGFM(debouncedElements)
// 		const html = toHTML(debouncedElements)
// 		return { gfm, html }
// 	})
//
// 	// NOTE: Must use useLayoutEffect.
// 	React.useLayoutEffect(() => {
// 		if (output.show && output.detail === "gfm") {
// 			const result = toGFM(debouncedElements)
// 			setResolved(current => ({
// 				...current,
// 				gfm: result,
// 			}))
// 		}
// 	}, [debouncedElements, output])
//
// 	// NOTE: Must use useLayoutEffect.
// 	React.useLayoutEffect(() => {
// 		if (output.show && output.detail === "html") {
// 			const result = toHTML(debouncedElements)
// 			setResolved(current => ({
// 				...current,
// 				html: result,
// 			}))
// 		}
// 	}, [debouncedElements, output])
//
// 	return (
// 		<Transition
// 			on={output.show}
// 			from="transition duration-200 ease-in opacity-0 transform -translate-y-4 pointer-events-none"
// 			to="transition duration-200 ease-out opacity-100 transform translate-y-0 pointer-events-auto"
// 		>
// 			<div className="w-full max-w-lg max-h-full bg-white rounded-lg shadow-hero-lg overflow-y-scroll">
//
// 				{output.detail === "releases" && (
// 					<div className="text-gray-800">
// 						<Releases />
// 					</div>
// 				)}
//
// 				{output.detail === "gfm" && (
// 					<div
// 						className="p-6 whitespace-pre-wrap text-gray-800"
// 						style={{
// 							...tabSize(2),
// 							// NOTE: className="break-words" does not work
// 							// as expected.
// 							wordBreak: "break-word",
// 						}}
// 					>
// 						<span className="inline-block min-w-full">
// 							<Highlight extension={output.detail}>
// 								{resolved[output.detail]}
// 							</Highlight>
// 						</span>
// 					</div>
// 				)}
//
// 				{output.detail === "html" && (
// 					<div
// 						className="p-6 whitespace-pre-wrap font-mono text-gray-800"
// 						style={{
// 							...tabSize(2),
// 							// NOTE: className="break-words" does not work
// 							// as expected.
// 							wordBreak: "break-word",
// 							fontSize: "0.8125rem",
//
// 						}}
// 					>
// 						<span className="inline-block min-w-full">
// 							<Highlight extension={output.detail}>
// 								{resolved[output.detail]}
// 							</Highlight>
// 						</span>
// 					</div>
// 				)}
//
// 			</div>
// 		</Transition>
// 	)
// }
