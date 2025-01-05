import axios from "axios";
import { stringify } from "postcss";

export default async function JobProfileData(page, limit, filterData){
    page = JSON.stringify(page);
    limit = JSON.stringify(limit);
    console.log("Filter Data: ", filterData)
    let url = `${process.env.NEXT_PUBLIC_BACKEND_API}job-profile/jobProfiles?page=${page}&limit=${limit}`
    for(let key in filterData){
        url += `&${key}=${filterData[key]}`
    }
    console.log("FilterData:",url)
    const result = await axios.get(url)
    console.log(result)
    return (result.data)
}

