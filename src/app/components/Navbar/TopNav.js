"use client"
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect, useContext } from "react"
import { formContext, userContext } from "@/app/page"
import { IoMdClose } from "react-icons/io";
export default function TopNav() {
    const [screenWidth, setScreenWidth] = useState(0)
    const [sideNav, setSideNav] = useState(false)
    const [isFixed, setIsFixed] = useState(false)
    const {user, setUser} = useContext(userContext)
    
    const {isModel, setIsModel} = useContext(formContext)
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 200) {
            setIsFixed(true);
          } else {
            setIsFixed(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

      useEffect(()=>{

      }, [sideNav])

    const getSideNav = () => {
        setSideNav(true)
        document.body.style.overflow = "hidden"
    }

    const closeSideNav = () => {
        setSideNav(false)
        document.body.style.overflow = "auto"
    }

    return(<>
        <div className={`inline-block relative z-100 w-full md:w-auto rounded-full py-3 shadow-lg bg-white`}>
            <div className="flex justify-between items-center h-full px-4 md:px-8 text-md font-medium text-gray-700 ">
                {screenWidth > 768 ? (
                    <div className="flex justify-between items-center">
                        <h3 className="px-4 mx-4 cursor-pointer hover:text-black whitespace-nowrap">Home</h3>
                        <h3 className="px-4 mx-4 cursor-pointer hover:text-black whitespace-nowrap">Find Jobs</h3>
                        <h3 className="px-4 mx-4 cursor-pointer hover:text-black whitespace-nowrap">Find Talents</h3>
                        <h3 className="px-4 mx-4 cursor-pointer hover:text-black whitespace-nowrap">About us</h3>
                        <h3 className="px-4 mx-4 cursor-pointer hover:text-black whitespace-nowrap">Testimonials</h3>
                    </div>
                ) : (
                    <div onClick={getSideNav} className="p-2 cursor-pointer">
                        <RxHamburgerMenu className="text-xl cursor-pointer font-bold text-gray-700 hover:text-black" />
                    </div>
                )}
                {user  &&<button onClick={()=>{setIsModel(prev => !prev); console.log(isModel)}} className="mx-2 md:mx-4 flex flex-row items-center justify-center rounded-full py-2 px-4  text-white bg-gradient-to-t from-[#730bc4] to-[#9c25f9]">Create Jobs</button>}
                {
                    !user && <button onClick={()=>{setIsModel(true); console.log(isModel)}} className="mx-2 md:mx-4 flex flex-row items-center justify-center rounded-full py-2 px-4  text-white bg-gradient-to-t from-[#730bc4] to-[#9c25f9]">Sign In</button>
                }
            </div>
            <div id="sideNav" className={`fixed top-0 left-0 w-[70%] h-screen bg-opacity-50 z-10 ${sideNav ? "block" : "hidden"} shadow-lg `}>
                    <div className="w-full flex justify-end items-center mt-4 bg-white " onClick={closeSideNav}>
                    <IoMdClose className="mx-4 text-3xl cursor-pointer text-gray-700 hover:text-black hover:rotate-90 transition-all duration-200"/>
                    </div>
                    <div className="w-auto flex flex-col justify-start items-center h-full text-center py-4 bg-white ">
                    <div className="flex felx-start cursor-pointer text-gray-700 hover:text-black w-full bg-white border-b-2 border-gray-300 hover:border-gray-700 p-4 text-lg font-medium my-2 transition-all duration-200">
                    <h3 className="px-4 mx-4 cursor-pointer hover:text-black whitespace-nowrap">Home</h3>
                    </div>
                    <div className="flex felx-start cursor-pointer text-gray-700 hover:text-black w-full bg-white border-b-2 border-gray-300 hover:border-gray-700 p-4 text-lg font-medium my-2 transition-all duration-200">
                        <h3 className="px-4 mx-4 cursor-pointer whitespace-nowrap">Find Jobs</h3>
                    </div>
                   <div className="flex felx-start cursor-pointer text-gray-700 hover:text-black w-full bg-white border-b-2 border-gray-300 hover:border-gray-700 p-4 text-lg font-medium my-2 transition-all duration-200">
                        <h3 className="px-4 mx-4 cursor-pointer whitespace-nowrap">Find Talents</h3>
                    </div>
                   <div className="flex felx-start cursor-pointer text-gray-700 hover:text-black w-full bg-white border-b-2 border-gray-300 hover:border-gray-700 p-4 text-lg font-medium my-2 transition-all duration-200">
                        <h3 className="px-4 mx-4 cursor-pointer whitespace-nowrap">About us</h3>
                    </div>
                   <div className="flex felx-start cursor-pointer text-gray-700 hover:text-black w-full bg-white border-b-2 border-gray-300 hover:border-gray-700 p-4 text-lg font-medium my-2 transition-all duration-200">
                        <h3 className="px-4 mx-4 cursor-pointer whitespace-nowrap">Testimonials</h3>
                    </div>
                    </div>
            </div>
        </div>
        {
            (<div className={`inline-block ${ !isFixed ? "top-[-100%]" : "top-4"} fixed mr-[10px]  z-100 w-[90%] md:w-auto rounded-full py-3 shadow-lg bg-white transition-all duration-300`}>
                <div className="flex justify-between items-center h-full px-4 md:px-8 text-md font-medium text-gray-700 mx-2">
                    {screenWidth > 768 ? (
                        <div className="flex justify-between items-center">
                            <h3 className="px-4 mx-4 cursor-pointer hover:text-black whitespace-nowrap">Home</h3>
                            <h3 className="px-4 mx-4 cursor-pointer hover:text-black whitespace-nowrap">Find Jobs</h3>
                            <h3 className="px-4 mx-4 cursor-pointer hover:text-black whitespace-nowrap">Find Talents</h3>
                            <h3 className="px-4 mx-4 cursor-pointer hover:text-black whitespace-nowrap">About us</h3>
                            <h3 className="px-4 mx-4 cursor-pointer hover:text-black whitespace-nowrap">Testimonials</h3>
                        </div>
                    ) : (
                        <div onClick={getSideNav} className="p-2 cursor-pointer">
                            <RxHamburgerMenu className="text-xl cursor-pointer font-bold text-gray-700 hover:text-black" />
                        </div>
                    )}
                     {user  &&<button onClick={()=>{setIsModel(prev => !prev); console.log(isModel)}} className="mx-2 md:mx-4 flex flex-row items-center justify-center rounded-full py-2 px-4  text-white bg-gradient-to-t from-[#730bc4] to-[#9c25f9]">Create Jobs</button>}
                {
                    !user && <button onClick={()=>{setIsModel(true); console.log(isModel)}} className="mx-2 md:mx-4 flex flex-row items-center justify-center rounded-full py-2 px-4  text-white bg-gradient-to-t from-[#730bc4] to-[#9c25f9]">Sign In</button>
                }
                </div>
                <div id="sideNav" className={`fixed top-0 left-0 w-[70%] h-screen bg-opacity-50 z-10 ${sideNav ? "block" : "hidden"} shadow-lg `}>
                        <div className="w-full flex justify-end items-center mt-4 bg-white " onClick={closeSideNav}>
                        <IoMdClose className="mx-4 text-3xl cursor-pointer text-gray-700 hover:text-black hover:rotate-90 transition-all duration-200"/>
                        </div>
                        <div className="w-auto flex flex-col justify-start items-center h-full text-center py-4 bg-white ">
                        <div className="flex felx-start cursor-pointer text-gray-700 hover:text-black w-full bg-white border-b-2 border-gray-300 hover:border-gray-700 p-4 text-lg font-medium my-2 transition-all duration-200">
                        <h3 className="px-4 mx-4 cursor-pointer hover:text-black whitespace-nowrap">Home</h3>
                        </div>
                        <div className="flex felx-start cursor-pointer text-gray-700 hover:text-black w-full bg-white border-b-2 border-gray-300 hover:border-gray-700 p-4 text-lg font-medium my-2 transition-all duration-200">
                            <h3 className="px-4 mx-4 cursor-pointer whitespace-nowrap">Find Jobs</h3>
                        </div>
                       <div className="flex felx-start cursor-pointer text-gray-700 hover:text-black w-full bg-white border-b-2 border-gray-300 hover:border-gray-700 p-4 text-lg font-medium my-2 transition-all duration-200">
                            <h3 className="px-4 mx-4 cursor-pointer whitespace-nowrap">Find Talents</h3>
                        </div>
                       <div className="flex felx-start cursor-pointer text-gray-700 hover:text-black w-full bg-white border-b-2 border-gray-300 hover:border-gray-700 p-4 text-lg font-medium my-2 transition-all duration-200">
                            <h3 className="px-4 mx-4 cursor-pointer whitespace-nowrap">About us</h3>
                        </div>
                       <div className="flex felx-start cursor-pointer text-gray-700 hover:text-black w-full bg-white border-b-2 border-gray-300 hover:border-gray-700 p-4 text-lg font-medium my-2 transition-all duration-200">
                            <h3 className="px-4 mx-4 cursor-pointer whitespace-nowrap">Testimonials</h3>
                        </div>
                        </div>
                </div>
            </div>)
        }
        </>
    )
}
