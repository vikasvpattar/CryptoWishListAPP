import React from "react";
import { MdEmail, MdLockOutline } from "react-icons/md";

function SignInForm() {
	const placeholderImage = "https://via.placeholder.com/400x300";

	return (
		<div className="flex flex-wrap items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-6 space-y-3 bg-white rounded-md shadow-md lg:max-w-xl">
				<div className="hidden md:block lg:w-1/2">
					<img
						src={placeholderImage}
						alt="Sign In"
						className="object-cover w-full h-full rounded"
					/>
				</div>
				<div className="w-full lg:w-1/2">
					<h2 className="text-xl font-bold text-center">Sign In</h2>
					<form className="space-y-4">
						<div className="flex items-center border-b-2 border-gray-300 py-2">
							<MdEmail className="text-gray-400 mr-2" />
							<input
								type="email"
								className="w-full border-none bg-transparent outline-none placeholder-gray-400"
								placeholder="Email"
							/>
						</div>
						<div className="flex items-center border-b-2 border-gray-300 py-2">
							<MdLockOutline className="text-gray-400 mr-2" />
							<input
								type="password"
								className="w-full border-none bg-transparent outline-none placeholder-gray-400"
								placeholder="Password"
							/>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input type="checkbox" id="remember-me" className="w-4 h-4" />
								<label
									htmlFor="remember-me"
									className="ml-2 text-sm text-gray-600">
									Remember Me
								</label>
							</div>
							<a href="#" className="text-sm text-blue-500 hover:underline">
								Forgot Password?
							</a>
						</div>
						<button
							type="submit"
							className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
							Sign In
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignInForm;
