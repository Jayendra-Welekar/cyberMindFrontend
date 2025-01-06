"use client"
import { IoSearch } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import React, { useContext, useEffect, useRef } from "react";
import { filterContext, filteringContext } from "@/app/page";
import RangeSlider from "../RangeSlider";

export default function BottomNav() {
    const [sliderMinValue, setSliderMinValue] = React.useState(0);
    const [sliderMaxValue, setSliderMaxValue] = React.useState(1000000);
    const {setFilterJobType, setFilterJobLocation, setFilterJobTitle, setFilterSalaryRange} = useContext(filterContext)
    const {filtering, setFiltering} = useContext(filteringContext)
    const rangeRef = useRef(null);
    const [salaryRange, setSalaryRange] = React.useState({
        min: 0,
        max: 1000000,
    });
    const [jobTitle, setJobTitle] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [jobType, setJobType] = React.useState("");   
    const[ival, setIval] = React.useState(0)
    const [ival2, setIval2] = React.useState(2000000)
    let inputMin = null;
    let inputMax = null;

    let titleFilterTimer = null;
    let locationFilterTimer = null;
    const handleSetJobTitle = (e)=>{
        if(titleFilterTimer != null) clearTimeout(titleFilterTimer);
        titleFilterTimer = setTimeout(() => {
            setJobTitle(e.target.value)
        }, 300);
    }


    const handleSetLocation = (e)=>{
        if(locationFilterTimer != null) clearTimeout(locationFilterTimer);
        locationFilterTimer = setTimeout(() => {
            setLocation(e.target.value)
        }, 300);
    }

    

    useEffect(() => {
        setFilterJobTitle(jobTitle)
        
        setFilterJobLocation(location)

        setFilterJobType(jobType)

        setFilterSalaryRange([salaryRange.min, salaryRange.max])

    }, [jobTitle, location, jobType, salaryRange])
    let sliderTime = null

    function changeSalaryRange({min, max}){
        if(sliderTime != null) clearTimeout(sliderTime);
        sliderTime = setTimeout(() => {
            setSalaryRange({
                min: Number(min),
                max: Number(max),
            });
        }, 300)
    }
    useEffect(()=>{
            setTimeout(()=>{
                inputMin = document.getElementById("inputMin");
                inputMax = document.getElementById("inputMax");
                rangeRef.current.addEventListener("input", (e) => {
                    setIval(inputMin.value)
                    setIval2(inputMax.value)
                    sliderTime != null && clearTimeout(sliderTime);
                    sliderTime = setTimeout(() => {
                        console.log(e.target.value);
                        changeSalaryRange({
                            min: inputMin.value,
                            max: inputMax.value,})
                      
                    }, 300)
                });
            }, 200)
           
    }, [])


    return (
        <div className="w-full mt-8">
            <div className="w-full h-full flex flex-row items-center flex-wrap flex-grow-1">
                <div className="min-h-[60px] h-full min-w-[200px] flex flex-row items-center justify-between md:px-4 mx-4 py-2  border-r-2 border-gray-300 flex-1 hover:border-gray-700 overflow-hidden">
                    <div className="w-full flex flex-row items-center">
                    <IoSearch className="text-xl mr-4 text-gray-500" />
                        <input onChange={handleSetJobTitle} className="cursor-pointer hover:text-gray-700 border-none focus:outline-none focus:ring-0" placeholder="Search By Job Title, Role"></input>
                    </div>
                    <IoCloseOutline className="text-xl mr-4 text-gray-500 cursor-pointer hover:bg-gray-200 rounded-full overflow-hidden" onClick={()=>setJobTitle("")}  />
                </div>
                <div className="min-h-[60px] h-full min-w-[200px] flex flex-row justify-between items-center md:px-4 mx-4 py-2 border-r-2 border-gray-300 flex-1  hover:border-gray-700 ">
                    <div className="w-full flex flex-row items-center overflow-hidden"> 
                    <CiLocationOn className="text-2xl mr-4 text-gray-700" />
                        <input onChange={handleSetLocation} className="  focus:ring-0 cursor-pointer hover:text-gray-700  border-none " placeholder="Preffered Location "  />
                    </div>
                    <IoCloseOutline className="text-xl mr-4 text-gray-500 cursor-pointer hover:bg-gray-200 rounded-full overflow-hidden" onClick={()=>setLocation("")}  />

                </div>
                <div className="min-h-[60px] h-full min-w-[200px]  flex flex-row items-center md:px-4 mx-4 py-2 border-r-2 border-gray-300 flex-1 hover:border-gray-700">
                <MdOutlinePersonOutline className="text-2xl mr-4 text-gray-600" />
                    <select onChange={(e)=>{
                        setJobType(e.target.value)
                    }} className="w-full  focus:ring-0 border-none text-gray-500 cursor-pointer hover:text-gray-700  focus:outline-none focus:shadow-outline"  placeholder="Job Type">
                        <option className="text-gray-500" value="">Job Type</option>
                        <option className="text-gray-500"  value="FullTime">Full Time</option>     
                        <option className="text-gray-500"  value="PartTime">Part Time</option>
                        <option className="text-gray-500"  value="Internship">Internship</option>   
                        <option className="text-gray-500"  value="Contract">Contract</option>   
                    </select>
                </div>
                <div className="relative min-h-[60px] h-full min-w-[200px]  flex flex-row items-center md:px-4 mx-4 py-2 border-r-2 border-gray-300 flex-1 hover:border-gray-700">
                <div className="w-full flex flex-col itesm-start justify-center">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-lg font-medium">Salary Per Month</h1>
                        <h1 className="text-lg font-medium mr-2 md:m-0">{ival/10000}K-{ival2/10000}K</h1>
                    </div>
                <RangeSlider rangeRef={rangeRef}  />

                </div>
                </div>
            </div>
        </div>
    )
}