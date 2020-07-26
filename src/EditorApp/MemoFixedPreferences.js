import * as handlers from "lib/x/handlers"
import ClassName from "lib/x/ClassName"
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
				{output.detail === "changelog" ? (
					<Releases />
				) : (
					<div
						className="p-6 whitespace-pre-wrap break-words font-mono text-gray-800"
						style={{
							fontSize: "0.8125rem",
							...tabSize(2),
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
		detail: "changelog",
	})

	const handleClickChangelog = e => {
		setOutput(current => ({
			show: !current.show || current.detail !== "changelog",
			detail: "changelog",
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

	// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M6 4.75c0-.69.56-1.25 1.25-1.25h5a4.75 4.75 0 013.888 7.479A5 5 0 0114 20.5H7.25c-.69 0-1.25-.56-1.25-1.25V4.75zM8.5 13v5H14a2.5 2.5 0 000-5H8.5zm0-2.5h3.751A2.25 2.25 0 0012.25 6H8.5v4.5z"></path></svg>

	// NOTE: Uses flex flex-col items-end because of <Output>.
	return (
		<div className="px-3 pt-2 pb-4 fixed inset-0 flex flex-col items-end z-10 pointer-events-none">

			<div className="flex flex-row">

				{/* Button */}
				<button
					className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-full focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{ color: output.show && output.detail === "changelog" && "var(--gray-800)" }}
					onFocus={e => setHoverTooltip("changelog")}
					onBlur={e => setHoverTooltip("")}
					onMouseEnter={e => setHoverTooltip("changelog")}
					onMouseLeave={e => setHoverTooltip("")}
					onClick={handleClickChangelog}
				>
					{(hoverTooltip === "changelog" && !output.show) && (
						<div className="absolute top-full right-0 z-10">
							<div className="px-2 py-1 bg-gray-800 rounded shadow">
								<div className="mr-3.5 -mt-0.5 absolute top-0 right-0 transform rotate-45" style={{ zIndex: -10 }}>
									<div className="w-2 h-2 bg-gray-800 rounded-sm shadow" />
								</div>
								<p className="whitespace-pre text-xs text-gray-100" style={{ fontFeatureSettings: "'tnum'" }}>
									Open Changelog
								</p>
							</div>
						</div>
					)}
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
					</svg>
				</button>

				{/* Button */}
				<button
					className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-full focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{ color: output.show && output.detail === "gfm" && "var(--gray-800)" }}
					onFocus={e => setHoverTooltip("gfm")}
					onBlur={e => setHoverTooltip("")}
					onMouseEnter={e => setHoverTooltip("gfm")}
					onMouseLeave={e => setHoverTooltip("")}
					onClick={handleClickGFM}
				>
					{(hoverTooltip === "gfm" && !output.show) && (
						<div className="absolute top-full right-0 z-10">
							<div className="px-2 py-1 bg-gray-800 rounded shadow">
								<div className="mr-3.5 -mt-0.5 absolute top-0 right-0 transform rotate-45" style={{ zIndex: -10 }}>
									<div className="w-2 h-2 bg-gray-800 rounded-sm shadow" />
								</div>
								<p className="whitespace-pre text-xs text-gray-100" style={{ fontFeatureSettings: "'tnum'" }}>
									GitHub Flavored Markdown
								</p>
							</div>
						</div>
					)}
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" fillRule="evenodd" />
					</svg>
				</button>

				{/* Button */}
				<button
					className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-full focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{ color: output.show && output.detail === "html" && "var(--gray-800)" }}
					onFocus={e => setHoverTooltip("html")}
					onBlur={e => setHoverTooltip("")}
					onMouseEnter={e => setHoverTooltip("html")}
					onMouseLeave={e => setHoverTooltip("")}
					onClick={handleClickHTML}
				>
					{(hoverTooltip === "html" && !output.show) && (
						<div className="absolute top-full right-0 z-10">
							<div className="px-2 py-1 bg-gray-800 rounded shadow">
								<div className="mr-3.5 -mt-0.5 absolute top-0 right-0 transform rotate-45" style={{ zIndex: -10 }}>
									<div className="w-2 h-2 bg-gray-800 rounded-sm shadow" />
								</div>
								<p className="whitespace-pre text-xs text-gray-100" style={{ fontFeatureSettings: "'tnum'" }}>
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

			<Output
				output={output}
				setOutput={setOutput}
			/>

		</div>
	)
})

export default MemoFixedPreferences
