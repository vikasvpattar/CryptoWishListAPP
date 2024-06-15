import React, { useState } from 'react';
import { AiOutlineHeart, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Fragment } from 'react';

const blogs = [
	{
		title: "Understanding React Hooks",
		description:
			"Hooks are a new addition in React 16.8 that lets you use state and other React features without writing.",
		imageUrl:
			"https://images.unsplash.com/photo-1581089778245-3ce67677f718?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
	},
	{
		title: "Demystifying Software Patterns",
		description:
			"Software patterns represent the best practices used by experienced developers to solve common problems.",
		imageUrl:
			"https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Guide to Full-Stack Development",
		description:
			"Exploring the roadmap to becoming a full-stack developer and what technologies to learn.",
		imageUrl:
			"https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
	},
	{
		title: "Advanced CSS Techniques",
		description:
			"Learn about the latest and advanced CSS techniques for better web design.",
		imageUrl:
			"https://images.unsplash.com/photo-1505685296765-3a2736de412f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
	},
	{
		title: "Efficient Database Design",
		description:
			"Tips and tricks for designing a more efficient database that scales.",
		imageUrl:
			"https://images.unsplash.com/photo-1578496480240-32d3e0c04525?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
	},
	{
		title: "DevOps Best Practices",
		description:
			"A comprehensive guide to understanding and implementing DevOps best practices.",
		imageUrl:
			"https://images.unsplash.com/photo-1581094651181-35942459ef62?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className='flex items-center justify-between flex-wrap bg-teal-500 p-6 relative'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <span className='font-semibold text-xl tracking-tight'>Tech Blogs</span>
      </div>
      <div className='block lg:hidden'>
        <button onClick={() => setIsOpen(!isOpen)} className='flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white'>
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>        <div className='text-sm lg:flex-grow'>
          <a href='#responsive-header' className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>            Home
          </a>
          <a href='#responsive-header' className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white'>
            About
          </a>
        </div>
      </div>
    </nav>
  );
}

const BlogCard = ({ title, description, imageUrl }) => (
	<div className=" flex flex-col max-w-xl rounded overflow-hidden h-full shadow-lg bg-white transition-shadow duration-300 ease-in-out">
		<img
			className="w-full h-64 object-cover"
			src={imageUrl}
			alt="Software Development"
		/>
		<div className="px-6 py-4">
			<div className="font-bold text-xl mb-2">{title}</div>
			<p className="text-gray-700 text-base">{description}</p>
		</div>
		<div className="px-6 pt-4 pb-2 flex justify-between items-center mt-auto">
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
				Read More
			</button>{" "}
			<AiOutlineHeart className="text-red-500 text-2xl" />
		</div>{" "}
	</div>
);

const BlogGrid = () => {
  return (
  <Fragment>
			<Navbar />
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-wrap -mx-4 justify-center">
					{blogs.map((blog, index) => (
						<div
							key={index}
							className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 flex flex-col">
							<BlogCard {...blog} />
						</div>
					))}
				</div>
			</div>
		</Fragment>
  );
};

export default BlogGrid;