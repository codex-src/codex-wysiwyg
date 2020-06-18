import Editor from "Editor/Editor"
import React from "react"

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">

			<div>
				{/* ... */}
			</div>

			<Editor>
				{/* <h1> */}
				{/* 	Hello, world! */}
				{/* </h1> */}
				<p>
					Hello,{" "}
					<code>
						world
					</code>
					<a href="a">
						<code>
							world
						</code>
					</a>
					<a href="b">
						<code>
							world
						</code>
					</a>
				</p>
				{/* <hr /> */}
				{/* <p> */}
				{/* 	Hello, world! */}
				{/* </p> */}
			</Editor>

		</div>
	</div>
)

export default App
