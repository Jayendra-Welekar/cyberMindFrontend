import { useContext, useEffect, useState } from "react";
import Cards from "./Navbar/Cards";
import JobProfileData from "./util/JobProfiesData";
import { resolveStyles } from "@mantine/core";
import { filterContext } from "../page";

export default function Bottombar() {
    const [jobProfiles, setJobProfiles] = useState([])
    const [page, setPage] = useState(1)
    const {filterJobTitle, filterJobLocation, filterJobType, filterSalaryRange} = useContext(filterContext)
    
    const limit = 8
    async function getJobProfiles(filterData) {
        const response = await JobProfileData(page, limit, filterData)
        setJobProfiles(response)
        console.log(response)
    }

    const handleNextPage = ()=>{
        setPage((prev)=>{
            if(jobProfiles.length == limit) 
                return prev+1
        })
    }

    const handlePrevPage = ()=>{
        setPage(prev => {
            if(prev > 1){
                return prev - 1
            }
        })
    }



    useEffect(()=>{
        console.log("Gettign new page with page numebr ")
        console.log(page)
        const filterData = {
            ...(filterJobTitle?.length > 0 && { jobTitle: filterJobTitle }),
            ...(filterJobLocation?.length > 0 && { jobLocation: filterJobLocation }),
            ...(filterJobType?.length > 0 && { jobType: filterJobType}),
            ...(filterSalaryRange?.length > 0 && { salaryRange: filterSalaryRange }),
        }
        console.log("change jobType")
        getJobProfiles(filterData)
    }, [page, filterJobTitle, filterJobLocation, filterJobType, filterSalaryRange])

    return (
        <div className="w-full h-full px-2 sm:px-4 md:px-16 py-8 bg-gray-100">
            <div className="px-auto h-full flex md:justify-start justify-center items-center flex-wrap p-4  gap-x-8 gap-y-8 ">
                {jobProfiles.length > 0 && jobProfiles.map((element, i) => {
                    return <Cards key={i} jobProfile={element}/>;
                })}
            </div>
            <div className="flex flex-row justify-center items-center w-full h-20">
                    {page > 1 && <div className="mx-2">
                        <button onClick={handlePrevPage} className="bg-white px-6 py-2  hover:border-blue-700 hover:border-[2px] border-blue-500 border-[2px] rounded-xl text-gray-700 hover:text-black font-medium py-2 px-4 rounded box-border">Prev</button>
                    </div>}
                    {jobProfiles.length === limit && <div className="mx-2">
                        <button onClick={handleNextPage} className="bg-white px-6 py-2  hover:border-blue-700 hover:border-[2px] border-blue-500 border-[2px] rounded-xl text-gray-700 hover:text-black font-medium py-2 px-4 rounded box-border">Next</button>
                    </div>}
            </div>
        </div>
    );
}
