import Editor from "./Editor/Editor"
import React from "react"

const markup = `
<p>
	<code>Go</code> is <strong>expressive, concise, clean, and efficient</strong>.\u0020
	Its <a href="https://google.com">concurrency mechanisms</a> make it easy to write programs that get the most out of <code>multicore and networked machines</code>, while its novel type system enables <em>flexible and modular</em> program construction.\u0020
	Go compiles quickly to machine code yet has the convenience of <strike>garbage</strike> collection and the power of run-time reflection.\u0020
	It's a fast, statically typed, <em>compiled language</em> that feels like a <em>dynamically typed, interpreted language</em>.
</p>
<p>
	<br>
</p>
<p>
	<code>Go</code> is <strong>expressive, concise, clean, and efficient</strong>.\u0020
	Its <a href="https://google.com">concurrency mechanisms</a> make it easy to write programs that get the most out of <code>multicore and networked machines</code>, while its novel type system enables <em>flexible and modular</em> program construction.\u0020
	Go compiles quickly to machine code yet has the convenience of <strike>garbage</strike> collection and the power of run-time reflection.\u0020
	It's a fast, statically typed, <em>compiled language</em> that feels like a <em>dynamically typed, interpreted language</em>.
</p>
`

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">
			<Editor markup={markup}>
				{/* <p> */}
				{/* 	<code>Go</code> is <strong>expressive, concise, clean, and efficient</strong>. */}
				{/* 	Its <a href="https://google.com">concurrency mechanisms</a> make it easy to write programs that get the most out of <code>multicore and networked machines</code>, while its novel type system enables <em>flexible and modular</em> program construction. */}
				{/* 	Go compiles quickly to machine code yet has the convenience of <strike>garbage</strike> collection and the power of run-time reflection. */}
				{/* 	It's a fast, statically typed, <em>compiled language</em> that feels like a <em>dynamically typed, interpreted language</em>. */}
				{/* </p> */}
				{/* <p> */}
				{/* 	<br /> */}
				{/* </p> */}
				{/* <p> */}
				{/* 	<code>Go</code> is <strong>expressive, concise, clean, and efficient</strong>. */}
				{/* 	Its <a href="https://google.com">concurrency mechanisms</a> make it easy to write programs that get the most out of <code>multicore and networked machines</code>, while its novel type system enables <em>flexible and modular</em> program construction. */}
				{/* 	Go compiles quickly to machine code yet has the convenience of <strike>garbage</strike> collection and the power of run-time reflection. */}
				{/* 	It's a fast, statically typed, <em>compiled language</em> that feels like a <em>dynamically typed, interpreted language</em>. */}
				{/* </p> */}
			</Editor>
		</div>
	</div>
)

export default App
