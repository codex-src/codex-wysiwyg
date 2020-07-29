import * as handlers from "lib/x/handlers"
import Highlight from "lib/PrismJS/Highlight"
import keyCodeFor from "lib/Client/keyCodeFor"
import React from "react"
import Releases from "./Releases"
import Transition from "lib/x/Transition"

import { // Unsorted
	useReadOnlyModeSetState,
	useElements,
} from "./contexts"

import { // Unsorted
	resolveGFM,
	resolveHTML,
} from "./resolvers"

const tabSize = size => ({
	MozTabSize: size,
	tabSize: size,
})

const Output = ({ output, setOutput }) => {
	const elements = useElements()

	const [resolved, setResolved] = React.useState(() => {
		const gfm = resolveGFM(elements)
		const html = resolveHTML(elements)
		return { gfm, html }
	})

	// NOTE: Must use useLayoutEffect.
	React.useLayoutEffect(() => {
		if (output.show && output.detail === "gfm") {
			const result = resolveGFM(elements)
			setResolved(current => ({
				...current,
				gfm: result,
			}))
		}
	}, [elements, output])

	// NOTE: Must use useLayoutEffect.
	React.useLayoutEffect(() => {
		if (output.show && output.detail === "html") {
			const result = resolveHTML(elements)
			setResolved(current => ({
				...current,
				html: result,
			}))
		}
	}, [elements, output])

	return (
		<Transition
			on={output.show}
			from="transition duration-200 ease-in opacity-0 transform -translate-y-4 pointer-events-none"
			to="transition duration-200 ease-out opacity-100 transform translate-y-0 pointer-events-auto"
		>
			<div className="w-full max-w-lg max-h-full bg-white rounded-lg shadow-hero-lg overflow-y-scroll">

				{output.detail === "releases" && (
					<div className="text-gray-800">
						<Releases />
					</div>
				)}

				{output.detail === "gfm" && (
					<div
						className="p-6 whitespace-pre-wrap text-gray-800"
						style={{
							...tabSize(2),
							// NOTE: className="break-words" does not work
							// as expected.
							wordBreak: "break-word",
						}}
					>
						<span className="inline-block min-w-full">
							<Highlight extension={output.detail}>
								{resolved[output.detail]}
							</Highlight>
						</span>
					</div>
				)}

				{output.detail === "html" && (
					<div
						className="p-6 whitespace-pre-wrap font-mono text-gray-800"
						style={{
							...tabSize(2),
							// NOTE: className="break-words" does not work
							// as expected.
							wordBreak: "break-word",
							fontSize: "0.8125rem",

						}}
					>
						<span className="inline-block min-w-full">
							<Highlight extension={output.detail}>
								{resolved[output.detail]}
							</Highlight>
						</span>
					</div>
				)}

			</div>
		</Transition>
	)
}

const MemoFixedPreferences = React.memo(() => {
	const [readOnlyMode, setReadOnlyMode] = useReadOnlyModeSetState()
	const [tooltip, setTooltip] = React.useState("")

	const [output, setOutput] = React.useState({
		show: false,
		detail: "releases",
	})

	React.useEffect(() => {
		const article = document.getElementById("main-editor")
		article.contentEditable = !readOnlyMode
	}, [readOnlyMode])


	const handleClickReleases = e => {
		setOutput(current => ({
			show: !current.show || current.detail !== "releases",
			detail: "releases",
		}))
	}

	const handleClickGFM = e => {
		setOutput(current => ({
			...current,
			show: !current.show || current.detail !== "gfm",
			detail: "gfm",
		}))
	}

	const handleClickHTML = e => {
		setOutput(current => ({
			...current,
			show: !current.show || current.detail !== "html",
			detail: "html",
		}))
	}

	// // Binds the next pointerdown event to hide output.
	// handlers.usePointerdown(output.show && (e => {
	// 	if (!outputRef.current.contains(e.target) && !e.target.closest("button")) {
	// 		setOutput(current => ({
	// 			...current,
	// 			show: !current.show,
	// 		}))
	// 	}
	// }))

	// Binds the next keydown event to hide output.
	handlers.useKeydown(e => {
		if (e.keyCode === keyCodeFor("Escape")) {
			setOutput(current => ({
				...current,
				show: !current.show,
			}))
		}
	})

	// NOTE: Uses flex flex-col items-end because of <Output>.
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
						{(tooltip === "lock" && !output.show) && (
							<div className="absolute top-full left-0">
								<div className="px-2 py-1 bg-gray-800 rounded shadow">
									<div className="absolute top-0 left-0">
										<div className="ml-3.5 -mt-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
									</div>
									<p className="whitespace-pre text-xs text-gray-100">
										{!readOnlyMode ? "Enable Read-Only Mode" : "Disable Read-Only Mode"}
									</p>
								</div>
							</div>
						)}
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							{!readOnlyMode ? (
								<path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
							) : (
								<path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" fillRule="evenodd" />
							)}
						</svg>
					</button>

				</div>

				{/* RHS */}
				<div className="flex flex-row">


					<button
						className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: output.show && output.detail === "releases" && "var(--gray-800)" }}
						onFocus={e => setTooltip("releases")}
						onBlur={e => setTooltip("")}
						onMouseEnter={e => setTooltip("releases")}
						onMouseLeave={e => setTooltip("")}
						onClick={handleClickReleases}
					>
						{(tooltip === "releases" && !output.show) && (
							<div className="absolute top-full right-0">
								<div className="px-2 py-1 bg-gray-800 rounded shadow">
									<div className="absolute top-0 right-0">
										<div className="mr-3.5 -mt-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
									</div>
									<p className="whitespace-pre text-xs text-gray-100">
										View Releases
									</p>
								</div>
							</div>
						)}
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							{/* <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /> */}
							<path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" fillRule="evenodd" />
						</svg>
					</button>

					<button
						className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: output.show && output.detail === "gfm" && "var(--gray-800)" }}
						onFocus={e => setTooltip("gfm")}
						onBlur={e => setTooltip("")}
						onMouseEnter={e => setTooltip("gfm")}
						onMouseLeave={e => setTooltip("")}
						onClick={handleClickGFM}
					>
						{(tooltip === "gfm" && !output.show) && (
							<div className="absolute top-full right-0">
								<div className="px-2 py-1 bg-gray-800 rounded shadow">
									<div className="absolute top-0 right-0">
										<div className="mr-3.5 -mt-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
									</div>
									<p className="whitespace-pre text-xs text-gray-100">
										Show GitHub Flavored Markdown
									</p>
								</div>
							</div>
						)}
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" fillRule="evenodd" />
						</svg>
					</button>

					<button
						className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: output.show && output.detail === "html" && "var(--gray-800)" }}
						onFocus={e => setTooltip("html")}
						onBlur={e => setTooltip("")}
						onMouseEnter={e => setTooltip("html")}
						onMouseLeave={e => setTooltip("")}
						onClick={handleClickHTML}
					>
						{(tooltip === "html" && !output.show) && (
							<div className="absolute top-full right-0">
								<div className="px-2 py-1 bg-gray-800 rounded shadow">
									<div className="absolute top-0 right-0">
										<div className="mr-3.5 -mt-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
									</div>
									<p className="whitespace-pre text-xs text-gray-100">
										Show Semantic HTML
									</p>
								</div>
							</div>
						)}
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
						</svg>
					</button>

				</div>

			</div>

			<Output
				output={output}
				setOutput={setOutput}
			/>

		</div>
	)
})

export default MemoFixedPreferences
