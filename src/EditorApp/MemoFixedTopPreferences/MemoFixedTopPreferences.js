import DebouncedElementsContext from "../DebouncedElementsContext"
import keyCodeFor from "lib/Client/keyCodeFor"
import MemoHighlight from "lib/PrismJS/MemoHighlight"
import React from "react"
import Releases from "./Releases"
import tabSize from "lib/x/tabSize"
import Transition from "lib/x/Transition"
import useKeydown from "lib/x/handlers/useKeydown"
import usePreferences from "./usePreferences"

import {
	AbsoluteBottomLeftToolTip as TooltipL,
	AbsoluteBottomRightToolTip as TooltipR,
} from "../Tooltips"

const MemoFixedTopPreferences = React.memo(({ readOnlyMode, setReadOnlyMode }) => {
	const debouncedElements = React.useContext(DebouncedElementsContext)

	const [state, dispatch] = usePreferences(debouncedElements)
	const [tooltip, setTooltip] = React.useState("")

	React.useEffect(() => {
		const article = document.getElementById("main-editor")
		article.contentEditable = !readOnlyMode
	}, [readOnlyMode])

	React.useLayoutEffect(() => {
		if (state.show && state.desc === "gfm") {
			dispatch({
				type: "UPDATE_GFM",
				elements: debouncedElements,
			})
		}
	}, [
		debouncedElements,
		state.show,
		state.desc,
		dispatch,
	])

	React.useLayoutEffect(() => {
		if (state.show && state.desc === "html") {
			dispatch({
				type: "UPDATE_HTML",
				elements: debouncedElements,
			})
		}
	}, [
		debouncedElements,
		state.show,
		state.desc,
		dispatch,
	])

	// Binds the next keydown event to hide output.
	useKeydown(e => {
		if (e.keyCode === keyCodeFor("Escape")) {
			dispatch({
				type: "CLOSE_ALL",
			})
		}
	})

	// NOTE: Uses flex flex-col items-end because of <aside>.
	return (
		<div className="px-3 pb-8 fixed inset-0 flex flex-col items-end z-10 pointer-events-none">

			<div className="py-2 flex flex-row justify-between w-full max-w-full">

				{/* LHS */}
				<div className="flex flex-row">

					<button
						className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: readOnlyMode && "var(--gray-800)" }}
						onFocus={e => setTooltip("lock")}
						onBlur={e => setTooltip("")}
						onMouseEnter={e => setTooltip("lock")}
						onMouseLeave={e => setTooltip("")}
						onClick={e => setReadOnlyMode(!readOnlyMode)}
					>
						{(!state.show && tooltip === "lock") && (
							<TooltipL>
								<p className="text-xs whitespace-pre text-gray-100">
									{!readOnlyMode ? "Enable Read-Only Mode" : "Disable Read-Only Mode"}
								</p>
							</TooltipL>
						)}
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							{!readOnlyMode
								? <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
								: <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" fillRule="evenodd" />
							}
						</svg>
					</button>

				</div>

				{/* RHS */}
				<div className="flex flex-row">

					<button
						className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: state.show && state.desc === "releases" && "var(--gray-800)" }}
						onFocus={e => setTooltip("releases")}
						onBlur={e => setTooltip("")}
						onMouseEnter={e => setTooltip("releases")}
						onMouseLeave={e => setTooltip("")}
						onClick={e => {
							dispatch({
								type: "TOGGLE_RELEASES",
							})
						}}
					>
						{(!state.show && tooltip === "releases") && (
							<TooltipR>
								<p className="text-xs whitespace-pre text-gray-100">
									View Releases
								</p>
							</TooltipR>
						)}
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							{/* <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /> */}
							<path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" fillRule="evenodd" />
						</svg>
					</button>

					<button
						className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: state.show && state.desc === "gfm" && "var(--gray-800)" }}
						onFocus={e => setTooltip("gfm")}
						onBlur={e => setTooltip("")}
						onMouseEnter={e => setTooltip("gfm")}
						onMouseLeave={e => setTooltip("")}
						onClick={e => {
							dispatch({
								type: "TOGGLE_GFM",
							})
						}}
					>
						{(!state.show && tooltip === "gfm") && (
							<TooltipR>
								<p className="text-xs whitespace-pre text-gray-100">
									Show GitHub Flavored Markdown
								</p>
							</TooltipR>
						)}
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" fillRule="evenodd" />
						</svg>
					</button>

					<button
						className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: state.show && state.desc === "html" && "var(--gray-800)" }}
						onFocus={e => setTooltip("html")}
						onBlur={e => setTooltip("")}
						onMouseEnter={e => setTooltip("html")}
						onMouseLeave={e => setTooltip("")}
						onClick={e => {
							dispatch({
								type: "TOGGLE_HTML",
							})
						}}
					>
						{(!state.show && tooltip === "html") && (
							<TooltipR>
								<p className="text-xs whitespace-pre text-gray-100">
									Show HyperText Markup Language
								</p>
							</TooltipR>
						)}
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
						</svg>
					</button>

				</div>

			</div>

			<Transition
				on={state.show}
				from="transition duration-200 ease-in opacity-0 transform -translate-y-4 pointer-events-none"
				to="transition duration-200 ease-out opacity-100 transform translate-y-0 pointer-events-auto"
			>
				<aside className="w-full max-w-lg max-h-full bg-white rounded-lg shadow-hero-lg overflow-y-scroll">
					{state.desc === "releases" ? (
						<div className="text-gray-800">
							<Releases />
						</div>
					) : (
						<div
							className="p-6 text-sm font-mono whitespace-pre-wrap text-gray-800"
							style={{
								...tabSize(2),
								// NOTE: className="break-words" does not
								// work as expected.
								fontSize: state.desc === "html" && "0.8125rem",
								wordBreak: "break-word",
							}}
						>
							<span className="inline-block min-w-full">
								<MemoHighlight extension={state.desc}>
									{state.rendered[state.desc]}
								</MemoHighlight>
							</span>
						</div>
					)}
				</aside>
			</Transition>

		</div>
	)
})

export default MemoFixedTopPreferences
