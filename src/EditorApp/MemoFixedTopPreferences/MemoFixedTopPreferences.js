import ContextPrefsDispatch from "../ContextPrefsDispatch"
import MemoHighlight from "lib/PrismJS/MemoHighlight"
import React from "react"
import Releases from "./Releases"
import tabSize from "lib/x/tabSize"
import Transition from "lib/x/Transition"

import {
	BottomLHSTooltip,
	BottomRHSTooltip,
} from "../Tooltips"

const MemoFixedTopPreferences = React.memo(({ prefs }) => {
	const dispatch = React.useContext(ContextPrefsDispatch)

	const [tooltip, setTooltip] = React.useState("")

	// NOTE: Uses flex flex-col items-end because of <aside>.
	return (
		<div className="px-3 pb-8 fixed inset-0 flex flex-col items-end z-10 pointer-events-none">

			<div className="py-2 flex flex-row justify-between w-full max-w-full">

				{/* LHS */}
				<div className="flex flex-row">

					<button
						className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: prefs.readOnlyMode && "var(--gray-800)" }}
						onFocus={e => setTooltip("lock")}
						onBlur={e => setTooltip("")}
						onMouseEnter={e => setTooltip("lock")}
						onMouseLeave={e => setTooltip("")}
						onClick={e => {
							dispatch({
								type: "TOGGLE_READ_ONLY_MODE",
							})
						}}
					>
						{(!prefs.show && tooltip === "lock") && (
							<BottomLHSTooltip>
								<p className="text-xs whitespace-pre text-gray-100">
									{!prefs.readOnlyMode ? "Enable Read-Only Mode" : "Disable Read-Only Mode"}
								</p>
							</BottomLHSTooltip>
						)}
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							{!prefs.readOnlyMode
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
						style={{ color: prefs.show && prefs.desc === "releases" && "var(--gray-800)" }}
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
						{(!prefs.show && tooltip === "releases") && (
							<BottomRHSTooltip>
								<p className="text-xs whitespace-pre text-gray-100">
									View Releases
								</p>
							</BottomRHSTooltip>
						)}
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" fillRule="evenodd" />
						</svg>
					</button>

					<button
						className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: prefs.show && prefs.desc === "markdown" && "var(--gray-800)" }}
						onFocus={e => setTooltip("markdown")}
						onBlur={e => setTooltip("")}
						onMouseEnter={e => setTooltip("markdown")}
						onMouseLeave={e => setTooltip("")}
						onClick={e => {
							dispatch({
								type: "TOGGLE_MARKDOWN",
							})
						}}
					>
						{(!prefs.show && tooltip === "markdown") && (
							<BottomRHSTooltip>
								<p className="text-xs whitespace-pre text-gray-100">
									Render to GitHub Flavored Markdown
								</p>
							</BottomRHSTooltip>
						)}
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" fillRule="evenodd" />
						</svg>
					</button>

					<button
						className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: prefs.show && prefs.desc === "markup" && "var(--gray-800)" }}
						onFocus={e => setTooltip("markup")}
						onBlur={e => setTooltip("")}
						onMouseEnter={e => setTooltip("markup")}
						onMouseLeave={e => setTooltip("")}
						onClick={e => {
							dispatch({
								type: "TOGGLE_MARKUP",
							})
						}}
					>
						{(!prefs.show && tooltip === "markup") && (
							<BottomRHSTooltip>
								<p className="text-xs whitespace-pre text-gray-100">
									Render to HTML
								</p>
							</BottomRHSTooltip>
						)}
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
						</svg>
					</button>

				</div>

			</div>

			<Transition
				on={prefs.show}
				from="transition duration-200 ease-in opacity-0 transform -translate-y-4 pointer-events-none"
				to="transition duration-200 ease-out opacity-100 transform translate-y-0 pointer-events-auto"
			>
				<aside className="w-full max-w-lg max-h-full bg-white rounded-lg shadow-hero-lg overflow-y-scroll">
					{prefs.desc === "releases" ? (
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
								fontSize: prefs.desc === "markup" && "0.8125rem",
								wordBreak: "break-word",
							}}
						>
							<span className="inline-block min-w-full">
								<MemoHighlight extension={prefs.desc === "markdown" && prefs.desc !== "markup" ? "gfm" : "html"}>
									{prefs.resolved[prefs.desc]}
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
