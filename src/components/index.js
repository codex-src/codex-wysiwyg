import React from "react"

// https://davidwalsh.name/disable-autocorrect
const disableAutoCorrect = {
	autoCapitalize: "off",
	autoComplete: "off",
	autoCorrect: "off",
	spellCheck: false,
}

// https://mathiasbynens.github.io/rel-noopener
const safeAnchor = href => ({
	href,
	target: "_blank",
	rel: "noopener noreferrer",
})

// TODO: Use React.memo?
export const Header = ({ children }) => (
	<h1 className="TODO">
		{children || (
			<br />
		)}
	</h1>
)

// TODO: Use React.memo?
export const Paragraph = ({ children }) => (
	<p>
		{children || (
			<br />
		)}
	</p>
)

export const Emphasis = ({ children }) => (
	<em className="italic">
		{children}
	</em>
)

export const Strong = ({ children }) => (
	// NOTE: Uses font-semibold not font-bold
	<strong className="font-semibold">
		{children}
	</strong>
)

export const Code = ({ children }) => (
	<code className="px-1 py-1 text-sm font-mono text-blue-500 bg-gray-100 rounded" {...disableAutoCorrect}>
		{children}
	</code>
)

export const Strikethrough = ({ children }) => (
	// NOTE: Uses text-gray-400 not text-gray-500
	<strike className="line-through text-gray-400">
		{children}
	</strike>
)

export const Anchor = ({ href, children }) => (
	<a className="underline text-gray-500" {...safeAnchor(href)}>
		{children}
	</a>
)
