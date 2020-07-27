import * as handlers from "lib/x/handlers"
import Highlight from "lib/PrismJS/Highlight"
import keyCodeFor from "lib/Client/keyCodeFor"
import React from "react"
import Releases from "./Releases"
import Transition from "lib/x/Transition"
import { useElements } from "./contexts"

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

	React.useLayoutEffect(() => {
		if (output.show && output.detail === "gfm") {
			const result = resolveGFM(elements)
			setResolved(current => ({
				...current,
				gfm: result,
			}))
		}
	}, [elements, output])

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

				{/* Releases */}
				{output.detail === "releases" && (
					<div className="text-gray-800">
						<Releases />
					</div>
				)}

				{/* GFM */}
				{output.detail === "gfm" && (
					<div
						className="p-6 whitespace-pre-wrap break-words text-gray-800"
						style={tabSize(2)}
					>
						<span className="inline-block min-w-full">
							<Highlight extension={output.detail}>
								{resolved[output.detail]}
							</Highlight>
						</span>
					</div>
				)}

				{/* HTML */}
				{output.detail === "html" && (
					<div
						className="p-6 whitespace-pre-wrap break-words font-mono text-gray-800"
						style={{
							...tabSize(2),
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
	const [hoverTooltip, setHoverTooltip] = React.useState("")

	const [output, setOutput] = React.useState({
		show: false,
		detail: "releases",
	})

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
		<div className="px-3 pb-4 fixed inset-0 flex flex-col items-end z-10 pointer-events-none">

			<div className="py-2 flex flex-row justify-between w-full max-w-full">

				{/* LHS */}
				<div className="flex flex-row">

					<a
						className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: output.show && output.detail === "github" && "var(--gray-800)" }}
						href="https://github.com/codex-src/codex-wysiwyg"
						target="_blank"
						rel="noopener noreferrer"
						onFocus={e => setHoverTooltip("github")}
						onBlur={e => setHoverTooltip("")}
						onMouseEnter={e => setHoverTooltip("github")}
						onMouseLeave={e => setHoverTooltip("")}
					>
						{(hoverTooltip === "github" && !output.show) && (
							<div className="absolute top-full left-0">
								<div className="px-2 py-1 bg-gray-800 rounded shadow">
									<div className="absolute top-0 left-0">
										<div className="ml-3.5 -mt-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
									</div>
									<p className="whitespace-pre text-xs text-gray-100">
										Love this? <span className="mx-px" role="img" aria-label="star">⭐</span>️ on GitHub! <span className="mx-px" aria-label="red heart" role="img">❤️</span>
									</p>
								</div>
							</div>
						)}
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
							<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fillRule="evenodd" />
						</svg>
					</a>

				</div>

				{/* RHS */}
				<div className="flex flex-row">

					<button
						className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: output.show && output.detail === "releases" && "var(--gray-800)" }}
						onFocus={e => setHoverTooltip("releases")}
						onBlur={e => setHoverTooltip("")}
						onMouseEnter={e => setHoverTooltip("releases")}
						onMouseLeave={e => setHoverTooltip("")}
						onClick={handleClickReleases}
					>
						{(hoverTooltip === "releases" && !output.show) && (
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
							<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
						</svg>
					</button>

					<button
						className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
						style={{ color: output.show && output.detail === "gfm" && "var(--gray-800)" }}
						onFocus={e => setHoverTooltip("gfm")}
						onBlur={e => setHoverTooltip("")}
						onMouseEnter={e => setHoverTooltip("gfm")}
						onMouseLeave={e => setHoverTooltip("")}
						onClick={handleClickGFM}
					>
						{(hoverTooltip === "gfm" && !output.show) && (
							<div className="absolute top-full right-0">
								<div className="px-2 py-1 bg-gray-800 rounded shadow">
									<div className="absolute top-0 right-0">
										<div className="mr-3.5 -mt-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
									</div>
									<p className="whitespace-pre text-xs text-gray-100">
										GitHub Flavored Markdown
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
						onFocus={e => setHoverTooltip("html")}
						onBlur={e => setHoverTooltip("")}
						onMouseEnter={e => setHoverTooltip("html")}
						onMouseLeave={e => setHoverTooltip("")}
						onClick={handleClickHTML}
					>
						{(hoverTooltip === "html" && !output.show) && (
							<div className="absolute top-full right-0">
								<div className="px-2 py-1 bg-gray-800 rounded shadow">
									<div className="absolute top-0 right-0">
										<div className="mr-3.5 -mt-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
									</div>
									<p className="whitespace-pre text-xs text-gray-100">
										Semantic HTML
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
