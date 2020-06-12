import React from "react"
import Transition from "lib/Transition"

// https://davidwalsh.name/disable-autocorrect
const disableAutoCorrect = {
	autoCapitalize: "off",
	autoComplete: "off",
	autoCorrect: "off",
	spellCheck: false,
}

// // https://mathiasbynens.github.io/rel-noopener
// const safeAnchor = href => ({
// 	href,
// 	target: "_blank",
// 	rel: "noopener noreferrer",
// })

// TODO: Use React.memo?
export const Header = ({ uuid, children }) => (
	<div id={uuid} className="TODO">
		{children || (
			<br />
		)}
	</div>
)

// TODO: Use React.memo?
export const Paragraph = ({ uuid, children }) => (
	<div id={uuid}>
		{children || (
			<br />
		)}
	</div>
)

export const Emphasis = ({ children }) => (
	<span className="italic" data-codex-type="emphasis">
		{children}
	</span>
)

export const Strong = ({ children }) => (
	<span className="font-semibold" data-codex-type="strong">
		{children}
	</span>
)

// // TODO
// const typePosEnum = new String(
// 	"undefined",
// 	"atStart",
// 	"atCenter",
// 	"atEnd",
// )

const codeClassNames = {
	"undefined": "px-1 py-1 text-sm font-mono text-blue-500 bg-gray-100 rounded",
	"at-start":  "pl-1 py-1 text-sm font-mono text-blue-500 bg-gray-100 rounded-l",
	"at-center": "px-0 py-1 text-sm font-mono text-blue-500 bg-gray-100 rounded-none",
	"at-end":    "pr-1 py-1 text-sm font-mono text-blue-500 bg-gray-100 rounded-r",
}

export const Code = ({ typePos, children }) => (
	<span className={codeClassNames[typePos]} {...disableAutoCorrect} data-codex-type="code">
		{children}
	</span>
)

export const Strikethrough = ({ children }) => (
	<span className="line-through text-gray-400" data-codex-type="strike">
		{children}
	</span>
)

// <svg
// 	className="ml-1 w-4 h-4 text-blue-400"
// 	fill="currentColor"
// 	viewBox="0 0 20 20"
// >
// 	<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
// </svg>

// function focus(classString) {
// 	let classArr = []
// 	for (const classStr of classString.split(/\s+/)) {
// 		classArr.push(classStr)
// 		if (classStr.startsWith("hover:")) {
// 			classArr.push(classStr.replace("hover:", "focus:"))
// 		}
// 	}
// 	return classArr.join(" ")
// }

// text-blue-800 bg-blue-100
export const Anchor = ({ href, children }) => {
	const ref = React.useRef()

	const [open, setOpen] = React.useState(false)

	return (
		<span className="inline-block relative">

			<Transition
				on={open}
				transition="transition duration-150 ease-in-out"
				from="opacity-0 transform translate-y-4 pointer-events-none"
				to="opacity-100 transform translate-y-0 pointer-events-auto"
			>
				<div className="absolute bottom-full inset-x-0 flex flex-row justify-center" contentEditable={false}>
					<div className="mb-1 px-2 py-1 bg-white-100 border border-gray-300 rounded-md shadow-sm">
						<p className="flex flex-row items-center text-sm text-blue-600 w-full max-w-64" style={{ minWidth: "6rem" }}>

							<span className="truncate">
								{href}
							</span>

							{/* <div className="flex-none"> */}
							{/* 	<svg */}
							{/* 		className="ml-2 w-4 h-4 text-blue-400 transform scale-90" */}
							{/* 		fill="none" */}
							{/* 		strokeLinecap="round" */}
							{/* 		strokeLinejoin="round" */}
							{/* 		strokeWidth="2.25" */}
							{/* 		stroke="currentColor" */}
							{/* 		viewBox="0 0 24 24" */}
							{/* 	> */}
							{/* 		<path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /> */}
							{/* 	</svg> */}
							{/* </div> */}
							{/* <svg */}
							{/* 	className="ml-1 w-4 h-4 text-blue-400" */}
							{/* 	fill="none" */}
							{/* 	strokeLinecap="round" */}
							{/* 	strokeLinejoin="round" */}
							{/* 	strokeWidth="2" */}
							{/* 	stroke="currentColor" */}
							{/* 	viewBox="0 0 24 24" */}
							{/* > */}
							{/* 	<path d="M6 18L18 6M6 6l12 12" /> */}
							{/* </svg> */}

							{/* <svg */}
							{/* 	className="ml-1 w-4 h-4 text-blue-400 transform scale-90" */}
							{/* 	fill="currentColor" */}
							{/* 	viewBox="0 0 20 20" */}
							{/* > */}
							{/* 	<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /> */}
							{/* </svg> */}
							{/* <svg */}
							{/* 	className="ml-1 w-4 h-4 text-blue-400 transform scale-90" */}
							{/* 	fill="currentColor" */}
							{/* 	viewBox="0 0 20 20" */}
							{/* > */}
							{/* 	<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /> */}
							{/* </svg> */}

						</p>
					</div>
				</div>
			</Transition>

			<span
				ref={ref}
				className="underline text-blue-600 focus:outline-none cursor-pointer"
				onPointerDown={e => {
					e.preventDefault()
					e.stopPropagation()
				}}
				onClick={e => {
					e.preventDefault()
					e.stopPropagation()
					const selection = document.getSelection()
					selection.removeAllRanges()
					setOpen(!open)
				}}
				data-codex-type="anchor"
				data-codex-props={JSON.stringify({ href })}
				tabIndex={0}
			>
				{children}
			</span>
		</span>
	)
}
