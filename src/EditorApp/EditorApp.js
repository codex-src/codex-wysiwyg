import ctrlOrCmd from "lib/Client/ctrlOrCmd"
import MemoFixedPreferences from "./MemoFixedPreferences"
import React from "react"
import Transition from "lib/x/Transition"
import userAgent from "lib/Client/userAgent"

import { // Unsorted
	ReadOnlyModeSetState,
	ElementsContext,
	RangeContext,
} from "./contexts"

import { // Unsorted
	Editor,
	useEditor,
} from "Editor"

const App = () => {
	const [state, dispatch] = useEditor()

	const [readOnlyMode, setReadOnlyMode] = React.useState(false)
	const [debouncedElements, setDebouncedElements] = React.useState(() => state.elements)

	const [hoverTooltip, setHoverTooltip] = React.useState("")

	React.useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedElements(state.elements)
		}, 100)
		return () => {
			clearTimeout(id)
		}
	}, [state.elements])

	return (
		<ReadOnlyModeSetState.Provider value={[readOnlyMode, setReadOnlyMode]}>
			<ElementsContext.Provider value={debouncedElements}>
				<RangeContext.Provider value={state.range}>

					<div className="px-6 py-32 flex flex-row justify-center h-full">
						<div className="w-full max-w-2xl h-full">

							<MemoFixedPreferences />

							<div className="relative h-full">
								{(state.elements.length === 1 && !state.elements[0].props.children.length) && (
									<div className="absolute pointer-events-none">
										<p className="text-lg text-gray-800" style={{ opacity: !state.focused ? 0.25 : 0.375 }}>
											A long time ago in a galaxy far, far away…
										</p>
									</div>
								)}
								<Editor
									id="main-editor"
									className="min-h-full text-lg text-gray-800"
									state={state}
									dispatch={dispatch}
								>
									<p>
										This prototype currently supports <em>italics</em>, <strong>bold</strong>, <code>code</code>, <strike>strikethrough</strike>, and <a href="TODO">link</a> for inline elements.{" "}
										Of course, elements can be <strong><em>nested</em></strong> if that’s your thing.
									</p>
									<p>
										<br />
									</p>
									<p>
										Shortcuts are supported!{" "}
										You can use <code>{ctrlOrCmd}-i</code> for <em>italics</em>, <code>{ctrlOrCmd}-b</code> for <strong>bold</strong>, <code>shift-{ctrlOrCmd}-c</code> for <code>code</code>, <code>shift-{ctrlOrCmd}-x</code> for <strike>strikethrough</strike>, and <code>{ctrlOrCmd}-k</code> for <a href="TODO">links</a>.{" "}
										Finally, you can use <code>shift-{ctrlOrCmd}-p</code> to <em>remove</em> formatting from a selection.
									</p>
									<p>
										<br />
									</p>
									<p>
										<strong>Please note that many basic features are not yet implemented!</strong> 😎
									</p>
								</Editor>
							</div>

							<Transition
								on={!readOnlyMode}
								className="transition duration-200 ease-in-out"
								from="opacity-0 transform translate-y-4"
								to="opacity-100 transform translate-y-0"
							>
								<div className="px-3 py-8 fixed inset-x-0 bottom-0 !opacity-0 pointer-events-none">
									<div className="flex flex-row justify-center">
										<div className="pointer-events-auto">
											<div className="px-3 py-2 flex flex-row items-center bg-white rounded-lg shadow-hero">

												<button
													className="mx-0.5 p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
													style={{
														color: state.rangeTypes.strong && "var(--blue-500)",
														backgroundColor: state.rangeTypes.strong && "#ebf5ffbf",
													}}
													onFocus={e => setHoverTooltip("bold")}
													onBlur={e => setHoverTooltip("")}
													onMouseEnter={e => setHoverTooltip("bold")}
													onMouseLeave={e => setHoverTooltip("")}
													onClick={e => {
														dispatch({
															type: "ADD_OR_REMOVE_TYPES",
															types: { strong: {} },
														})
													}}
												>
													{hoverTooltip === "bold" && (
														<div className="absolute bottom-full" style={{ left: "50%" }}>
															<div className="px-2 py-1 relative bg-gray-800 rounded shadow" style={{ left: "-50%" }}>
																<div className="absolute bottom-0 inset-x-0 flex flex-row justify-center">
																	<div className="-mb-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
																</div>
																<p className="whitespace-pre text-xs text-gray-100">
																	Bold ({!userAgent.MacOSX ? "Ctrl+B" : "⌘+B"})
																</p>
															</div>
														</div>
													)}
													<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
														<path d="M4 2a1 1 0 00-1 1v10a1 1 0 001 1h5.5a3.5 3.5 0 001.852-6.47A3.5 3.5 0 008.5 2H4zm4.5 5a1.5 1.5 0 100-3H5v3h3.5zM5 9v3h4.5a1.5 1.5 0 000-3H5z" fillRule="evenodd" />
													</svg>
												</button>

												<button
													className="mx-0.5 p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
													style={{
														color: state.rangeTypes.em && "var(--blue-500)",
														backgroundColor: state.rangeTypes.em && "#ebf5ffbf",
													}}
													onFocus={e => setHoverTooltip("italics")}
													onBlur={e => setHoverTooltip("")}
													onMouseEnter={e => setHoverTooltip("italics")}
													onMouseLeave={e => setHoverTooltip("")}
													onClick={e => {
														dispatch({
															type: "ADD_OR_REMOVE_TYPES",
															types: { em: {} },
														})
													}}
												>
													{hoverTooltip === "italics" && (
														<div className="absolute bottom-full" style={{ left: "50%" }}>
															<div className="px-2 py-1 relative bg-gray-800 rounded shadow" style={{ left: "-50%" }}>
																<div className="absolute bottom-0 inset-x-0 flex flex-row justify-center">
																	<div className="-mb-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
																</div>
																<p className="whitespace-pre text-xs text-gray-100">
																	Italic ({!userAgent.MacOSX ? "Ctrl+I" : "⌘+I"})
																</p>
															</div>
														</div>
													)}
													<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
														<path d="M6 2.75A.75.75 0 016.75 2h6.5a.75.75 0 010 1.5h-2.505l-3.858 9H9.25a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h2.505l3.858-9H6.75A.75.75 0 016 2.75z" fillRule="evenodd" />
													</svg>
												</button>

												<button
													className="mx-0.5 p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
													style={{
														color: state.rangeTypes.code && "var(--blue-500)",
														backgroundColor: state.rangeTypes.code && "#ebf5ffbf",
													}}
													onFocus={e => setHoverTooltip("code")}
													onBlur={e => setHoverTooltip("")}
													onMouseEnter={e => setHoverTooltip("code")}
													onMouseLeave={e => setHoverTooltip("")}
													onClick={e => {
														dispatch({
															type: "ADD_OR_REMOVE_TYPES",
															types: { code: {} },
														})
													}}
												>
													{hoverTooltip === "code" && (
														<div className="absolute bottom-full" style={{ left: "50%" }}>
															<div className="px-2 py-1 relative bg-gray-800 rounded shadow" style={{ left: "-50%" }}>
																<div className="absolute bottom-0 inset-x-0 flex flex-row justify-center">
																	<div className="-mb-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
																</div>
																<p className="whitespace-pre text-xs text-gray-100">
																	Code ({!userAgent.MacOSX ? "Shift+Ctrl+C" : "Shift+⌘+C"})
																</p>
															</div>
														</div>
													)}
													<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
														<path d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z" fillRule="evenodd" />
													</svg>
												</button>

												<button
													className="mx-0.5 p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
													style={{
														color: state.rangeTypes.strike && "var(--blue-500)",
														backgroundColor: state.rangeTypes.strike && "#ebf5ffbf",
													}}
													onFocus={e => setHoverTooltip("strikethrough")}
													onBlur={e => setHoverTooltip("")}
													onMouseEnter={e => setHoverTooltip("strikethrough")}
													onMouseLeave={e => setHoverTooltip("")}
													onClick={e => {
														dispatch({
															type: "ADD_OR_REMOVE_TYPES",
															types: { strike: {} },
														})
													}}
												>
													{hoverTooltip === "strikethrough" && (
														<div className="absolute bottom-full" style={{ left: "50%" }}>
															<div className="px-2 py-1 relative bg-gray-800 rounded shadow" style={{ left: "-50%" }}>
																<div className="absolute bottom-0 inset-x-0 flex flex-row justify-center">
																	<div className="-mb-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
																</div>
																<p className="whitespace-pre text-xs text-gray-100">
																	Strikethrough ({!userAgent.MacOSX ? "Shift+Ctrl+X" : "Shift+⌘+X"})
																</p>
															</div>
														</div>
													)}
													<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
														<path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" fillRule="evenodd" />
													</svg>
												</button>

												<button
													className="mx-0.5 p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
													style={{
														color: state.rangeTypes.a && "var(--blue-500)",
														backgroundColor: state.rangeTypes.a && "#ebf5ffbf",
													}}
													onFocus={e => setHoverTooltip("link")}
													onBlur={e => setHoverTooltip("")}
													onMouseEnter={e => setHoverTooltip("link")}
													onMouseLeave={e => setHoverTooltip("")}
													onClick={e => {
														dispatch({
															type: "ADD_OR_REMOVE_TYPES",
															types: { a: {} /* TODO */ },
														})
													}}
												>
													{hoverTooltip === "link" && (
														<div className="absolute bottom-full" style={{ left: "50%" }}>
															<div className="px-2 py-1 relative bg-gray-800 rounded shadow" style={{ left: "-50%" }}>
																<div className="absolute bottom-0 inset-x-0 flex flex-row justify-center">
																	<div className="-mb-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
																</div>
																<p className="whitespace-pre text-xs text-gray-100">
																	Link ({!userAgent.MacOSX ? "Ctrl+K" : "⌘+K"})
																</p>
															</div>
														</div>
													)}
													<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
														<path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z" fillRule="evenodd" />
													</svg>
												</button>

											</div>
										</div>
									</div>
								</div>
							</Transition>

						</div>
					</div>

				</RangeContext.Provider>
			</ElementsContext.Provider>
		</ReadOnlyModeSetState.Provider>
	)
}

export default App
