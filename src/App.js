import Editor from "Editor/Editor"
import React from "react"

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">

			<div>
				{/* ... */}
			</div>

			<Editor>
				<h1>
					Hello, world!
				</h1>
				<p>
					Hello,{" "}
					<a href="#">
						<em>
							world
						</em>
					</a>
					<a href="hello">
						<strong>
							<em>
								world
							</em>
						</strong>
					</a>
				</p>
				<hr />
				<p>
					Hello, world!
				</p>
			</Editor>

		</div>
	</div>
)

export default App
