import React from "react"

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
	<h1 id={uuid} className="TODO">
		{children || (
			<br />
		)}
	</h1>
)

// TODO: Use React.memo?
export const Paragraph = ({ uuid, children }) => (
	<p id={uuid}>
		{children || (
			<br />
		)}
	</p>
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

export const Anchor = ({ href, children }) => (
	// text-blue-800 bg-blue-100
	<span className="px-2 !inline-flex !flex-row !items-center text-blue-600 bg-blue-50 rounded-full" onClick={() => window.open(href)} data-codex-type="anchor" data-codex-props={JSON.stringify({ href })}>
		{children}
		{/* <svg */}
		{/* 	className="ml-1 w-4 h-4 text-blue-500" */}
		{/* 	fill="none" */}
		{/* 	stroke="currentColor" */}
		{/* 	strokeLinecap="round" */}
		{/* 	strokeLinejoin="round" */}
		{/* 	strokeWidth="2" */}
		{/* 	viewBox="0 0 24 24" */}
		{/* > */}
		{/* 	<path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /> */}
		{/* </svg> */}
	</span>
)
