"use client"
import Image from "next/image";
import Topbar from "./components/Topbar";
import Bottombar from "./components/Bottombar";
import Form from "./components/Form/Form";
import { createContext, useContext, useEffect, useState } from "react";

const formContext = createContext()
const filterContext = createContext()
const userContext = createContext()
export default function Home() {

  const [isModel, setIsModel] = useState(false)
  const [filterJobType, setFilterJobType] = useState()
  const [filterJobTitle, setFilterJobTitle] = useState()
  const [filterJobLocation, setFilterJobLocation] = useState()
  const [filterSalaryRange, setFilterSalaryRange] = useState([])
  const [user, setUser] = useState(null)

  useEffect(()=>{
      localStorage.getItem("user") && setUser(JSON.parse(localStorage.getItem("user")))
      console.log("Filter Salary Range: ", filterSalaryRange)
  }, [isModel, filterJobTitle, filterJobLocation, filterSalaryRange])
  return (
    <div className="flex-col justify-center items-center relative">
      <userContext.Provider value={{user, setUser}}>
      <filterContext.Provider value={{filterJobTitle, filterJobType, filterJobLocation, filterSalaryRange ,setFilterJobType, setFilterJobTitle, setFilterJobLocation, setFilterSalaryRange}}>
      <formContext.Provider value={{isModel, setIsModel}}>
        <Topbar />
        <Bottombar/>
        {isModel && <Form />}
        </formContext.Provider>
        </filterContext.Provider>
        </userContext.Provider>
    </div>
  );
}

export {formContext, filterContext, userContext}