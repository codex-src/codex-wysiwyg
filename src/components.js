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

export const Anchor = ({ href, children }) => (
	<a {...safeAnchor(href)}>
		<span className="no-underline text-blue-500" data-codex-type="anchor" data-codex-props={JSON.stringify({ href }, null)}>
			{children}
		</span>
	</a>
)
