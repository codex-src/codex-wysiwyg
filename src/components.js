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
				from="opacity-0 transform translate-y-2 pointer-events-none"
				to="opacity-100 transform translate-y-0 pointer-events-auto"
			>
				<div className="mb-2 absolute bottom-full inset-x-0 flex flex-row justify-center" contentEditable={false}>
					<div className="rounded-md shadow-md">
						<div ref={ref} className="px-3 py-2 flex-none bg-gray-800 w-64 rounded-md focus:outline-none focus:shadow-outline" tabIndex={0}>
							<p className="flex flex-row items-center font-medium text-sm leading-6 text-gray-50">
								{/* <svg */}
								{/* 	className="mr-2 flex-none w-4 h-4 text-gray-50" */}
								{/* 	fill="none" */}
								{/* 	stroke-linecap="round" */}
								{/* 	stroke-linejoin="round" */}
								{/* 	stroke-width={2.5} */}
								{/* 	stroke="currentColor" */}
								{/* 	viewBox="0 0 24 24" */}
								{/* > */}
								{/* 	<path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /> */}
								{/* 	<path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /> */}
								{/* </svg> */}
								<span className="mr-2 truncate">
									{/* Loading… */}
									Free, open source icons from the creators of Tailwind CSS.
								</span>
								<svg
									className="ml-auto flex-none w-4 h-4 text-gray-50"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width={2.5}
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M6 18L18 6M6 6l12 12" />
								</svg>
							</p>
							<p className="text-sm leading-6 text-blue-300">
								<span className="truncate">
									{href}
								</span>
							</p>
						</div>
					</div>
				</div>
			</Transition>
			<span
				className="underline text-blue-600 focus:outline-none cursor-pointer"
				onPointerDown={e => {
					e.preventDefault()
					e.stopPropagation()
					setOpen(!open)
					ref.current.focus()
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
