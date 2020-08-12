import ContextDispatch from "../ContextDispatch"
import React from "react"
import userAgent from "lib/Client/userAgent"
import { TopTooltip } from "../Tooltips"

const WYSIWYGMenu = ({ readOnlyMode, focused, rangeTypes }) => {
	const dispatch = React.useContext(ContextDispatch)

	const [tooltip, setTooltip] = React.useState("")

	return (
		<div className="px-3 py-2 flex flex-row items-center bg-white rounded-lg shadow-hero">
			<div className="-ml-0.5" />

			<div
				className="px-0.5"
				onFocus={e => setTooltip("strong")}
				onBlur={e => setTooltip("")}
				onMouseEnter={e => setTooltip("strong")}
				onMouseLeave={e => setTooltip("")}
			>
				<button
					className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{
						color: rangeTypes.strong && "var(--blue-500)",
						backgroundColor: rangeTypes.strong && "var(--blue-50)",
					}}
					onClick={e => {
						dispatch({
							type: "APPLY_TYPES",
							types: {
								strong: {},
							},
						})
					}}
				>
					{tooltip === "strong" && (
						<TopTooltip>
							<p className="text-xs whitespace-pre text-gray-100">
								Bold{" ".repeat(2)}
								<span className="opacity-75">
									{!userAgent.MacOSX ? "Ctrl+B" : "⌘+B"}
								</span>
							</p>
						</TopTooltip>
					)}
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
						<path d="M4 2a1 1 0 00-1 1v10a1 1 0 001 1h5.5a3.5 3.5 0 001.852-6.47A3.5 3.5 0 008.5 2H4zm4.5 5a1.5 1.5 0 100-3H5v3h3.5zM5 9v3h4.5a1.5 1.5 0 000-3H5z" fillRule="evenodd" />
					</svg>
				</button>
			</div>

			<div
				className="px-0.5"
				onFocus={e => setTooltip("italics")}
				onBlur={e => setTooltip("")}
				onMouseEnter={e => setTooltip("italics")}
				onMouseLeave={e => setTooltip("")}
			>
				<button
					className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{
						color: rangeTypes.em && "var(--blue-500)",
						backgroundColor: rangeTypes.em && "var(--blue-50)",
					}}
					onClick={e => {
						dispatch({
							type: "APPLY_TYPES",
							types: {
								em: {},
							},
						})
					}}
				>
					{tooltip === "italics" && (
						<TopTooltip>
							<p className="text-xs whitespace-pre text-gray-100">
								Italic{" ".repeat(2)}
								<span className="opacity-75">
									{!userAgent.MacOSX ? "Ctrl+I" : "⌘+I"}
								</span>
							</p>
						</TopTooltip>
					)}
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
						<path d="M6 2.75A.75.75 0 016.75 2h6.5a.75.75 0 010 1.5h-2.505l-3.858 9H9.25a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h2.505l3.858-9H6.75A.75.75 0 016 2.75z" fillRule="evenodd" />
					</svg>
				</button>
			</div>

			<div
				className="px-0.5"
				onFocus={e => setTooltip("code")}
				onBlur={e => setTooltip("")}
				onMouseEnter={e => setTooltip("code")}
				onMouseLeave={e => setTooltip("")}
			>
				<button
					className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{
						color: rangeTypes.code && "var(--blue-500)",
						backgroundColor: rangeTypes.code && "var(--blue-50)",
					}}
					onClick={e => {
						dispatch({
							type: "APPLY_TYPES",
							types: {
								code: {},
							},
						})
					}}
				>
					{tooltip === "code" && (
						<TopTooltip>
							<p className="text-xs whitespace-pre text-gray-100">
								Code{" ".repeat(2)}
								<span className="opacity-75">
									{!userAgent.MacOSX ? "Shift+Ctrl+C" : "Shift+⌘+C"}
								</span>
							</p>
						</TopTooltip>
					)}
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
						<path d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z" fillRule="evenodd" />
					</svg>
				</button>
			</div>

			<div
				className="px-0.5"
				onFocus={e => setTooltip("strikethrough")}
				onBlur={e => setTooltip("")}
				onMouseEnter={e => setTooltip("strikethrough")}
				onMouseLeave={e => setTooltip("")}
			>
				<button
					className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{
						color: rangeTypes.strike && "var(--blue-500)",
						backgroundColor: rangeTypes.strike && "var(--blue-50)",
					}}
					onClick={e => {
						dispatch({
							type: "APPLY_TYPES",
							types: {
								strike: {},
							},
						})
					}}
				>
					{tooltip === "strikethrough" && (
						<TopTooltip>
							<p className="text-xs whitespace-pre text-gray-100">
								Strikethrough{" ".repeat(2)}
								<span className="opacity-75">
									{!userAgent.MacOSX ? "Shift+Ctrl+X" : "Shift+⌘+X"}
								</span>
							</p>
						</TopTooltip>
					)}
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
						<path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" fillRule="evenodd" />
					</svg>
				</button>
			</div>

			<div
				className="px-0.5"
				onFocus={e => setTooltip("a")}
				onBlur={e => setTooltip("")}
				onMouseEnter={e => setTooltip("a")}
				onMouseLeave={e => setTooltip("")}
			>
				<button
					className="p-2 relative text-gray-400 hover:text-gray-800 focus:text-gray-800 hover:bg-gray-100 focus:bg-gray-100 rounded-lg focus:outline-none transition duration-200 ease-in-out pointer-events-auto"
					style={{
						color: rangeTypes.a && "var(--blue-500)",
						backgroundColor: rangeTypes.a && "var(--blue-50)",
					}}
					onClick={e => {
						dispatch({
							type: "APPLY_TYPES",
							types: {
								a: {
 									href: "TODO",
								},
							},
						})
					}}
				>
					{tooltip === "a" && (
						<TopTooltip>
							<p className="text-xs whitespace-pre text-gray-100">
								Link{" ".repeat(2)}
								<span className="opacity-75">
									{!userAgent.MacOSX ? "Ctrl+K" : "⌘+K"}
								</span>
							</p>
						</TopTooltip>
					)}
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
						<path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z" fillRule="evenodd" />
					</svg>
				</button>
			</div>

			<div className="-mr-0.5" />
		</div>
	)
}

export default WYSIWYGMenu
