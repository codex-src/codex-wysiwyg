// Maps user-perceived language extensions to PrismJS
// languages.
const langMap = {}

document.addEventListener("DOMContentLoaded", e => {
	if (!window.Prism) {
		// No-op
		return
	}
	const extensions = {
		bash:       window.Prism.languages.bash,
		c:          window.Prism.languages.c,
		cpp:        window.Prism.languages.cpp,
		css:        window.Prism.languages.css,
		d:          window.Prism.languages.d,
		diff:       window.Prism.languages.diff,
		docker:     window.Prism.languages.docker,
		dockerfile: window.Prism.languages.dockerfile,
		git:        window.Prism.languages.git,
		go:         window.Prism.languages.go,
		graphql:    window.Prism.languages.graphql,
		htm:        window.Prism.languages.html,
		html:       window.Prism.languages.html,
		http:       window.Prism.languages.http,
		js:         window.Prism.languages.jsx, // Uses jsx
		json:       window.Prism.languages.json,
		jsx:        window.Prism.languages.jsx,
		kotlin:     window.Prism.languages.kotlin,
		php:        window.Prism.languages.php,
		py:         window.Prism.languages.py,
		rb:         window.Prism.languages.rb,
		ruby:       window.Prism.languages.ruby,
		rust:       window.Prism.languages.rust,
		sass:       window.Prism.languages.sass,
		sh:         window.Prism.languages["shell-session"],
		sql:        window.Prism.languages.sql,
		svg:        window.Prism.languages.svg,
		swift:      window.Prism.languages.swift,
		ts:         window.Prism.languages.tsx, // Uses tsx
		tsx:        window.Prism.languages.tsx,
		wasm:       window.Prism.languages.wasm,
		xml:        window.Prism.languages.xml,
		yaml:       window.Prism.languages.yaml,
		yml:        window.Prism.languages.yml,
	}
	Object.assign(langMap, extensions)
})

export default langMap
