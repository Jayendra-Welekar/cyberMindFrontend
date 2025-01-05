import { formContext } from "@/app/page";
import axios from "axios";

export default async function HandleSubmitForm(setValidForm, setIsModel,  data) {
    console.log("Got Data on handleSubmitForm", data);
    let validForm = true
    if( data.jobTitle === ""){
        const titleInput = document.getElementById("jobTitle");
        titleInput.classList.add("isinvalid");
        titleInput.addEventListener("focus", () => {
            titleInput.classList.remove("isinvalid");
            titleInput.removeEventListener("focus", () => {
                titleInput.classList.remove("isinvalid");
                titleInput.removeEventListener("focus")
            })
        })
        validForm = false
    }


    if(!data.applicationDeadline){
        const titleInput = document.getElementById("deadline");
        titleInput.classList.add("isinvalid");
        titleInput.addEventListener("focus", () => {
            titleInput.classList.remove("isinvalid");
            titleInput.removeEventListener("focus", () => {
                titleInput.classList.remove("isinvalid");
                titleInput.removeEventListener("focus")
            })
        })
        validForm = false
    }

    if( data.companyName === ""){
        const titleInput = document.getElementById("companyName");
        titleInput.classList.add("isinvalid");
        titleInput.addEventListener("focus", () => {
            titleInput.classList.remove("isinvalid");
            titleInput.removeEventListener("focus", () => {
                titleInput.classList.remove("isinvalid");
                titleInput.removeEventListener("focus")
            })

        })
        validForm = false
    }

    if(data.jobType === ""){
        const titleInput = document.getElementById("jobType");
        titleInput.classList.add("isinvalid");
        titleInput.addEventListener("focus", () => {
            titleInput.classList.remove("isinvalid");
            titleInput.removeEventListener("focus", () => {
                titleInput.classList.remove("isinvalid");
                titleInput.removeEventListener("focus")
            })

        })
        validForm = false
    }


    if( data.location === ""){
        const titleInput = document.getElementById("jobLocation");
        titleInput.classList.add("isinvalid");
        titleInput.addEventListener("focus", () => {
            titleInput.classList.remove("isinvalid");
            titleInput.removeEventListener("focus", () => {
                titleInput.classList.remove("isinvalid");
                titleInput.removeEventListener("focus")
            })

        })
        validForm = false
    }

    if(!data.salaryRange || data.salaryRange[0] === "" || data.salaryRange[1] === "" || isNaN(data.salaryRange[0]) || isNaN(data.salaryRange[1])){
        const titleInput = document.getElementById("minSalary");
        titleInput.classList.add("isinvalid");
        titleInput.addEventListener("focus", () => {
            titleInput.classList.remove("isinvalid");
            titleInput.removeEventListener("focus", () => {
                titleInput.classList.remove("isinvalid");
                titleInput.removeEventListener("focus")
            })

        })

        const titleInput1 = document.getElementById("maxSalary");
        titleInput1.classList.add("isinvalid");
        titleInput1.addEventListener("focus", () => {
            titleInput1.classList.remove("isinvalid");
            titleInput1.removeEventListener("focus", () => {
                titleInput1.classList.remove("isinvalid");
                titleInput1.removeEventListener("focus")
            })

        })
        validForm = false
    }
    if(data.jobDescription === ""){
        const titleInput = document.getElementById("jobDesc");
        titleInput.classList.add("isinvalid");
        titleInput.addEventListener("focus", () => {
            titleInput.classList.remove("isinvalid");
            titleInput.removeEventListener("focus", () => {
                titleInput.classList.remove("isinvalid");
                titleInput.removeEventListener("focus")
            })

        })
        validForm = false
    }
    if(data.jobRequirements === ""){
        const titleInput = document.getElementById("jobReq");
        titleInput.classList.add("isinvalid");
        titleInput.addEventListener("focus", () => {
            titleInput.classList.remove("isinvalid");
            titleInput.removeEventListener("focus", () => {
                titleInput.classList.remove("isinvalid");
                titleInput.removeEventListener("focus")
            })

        })
        validForm = false
    }
    if(data.jobResponsibilities === ""){
        const titleInput = document.getElementById("jobRes");
        titleInput.classList.add("isinvalid");
        titleInput.addEventListener("focus", () => {
            titleInput.classList.remove("isinvalid");
            titleInput.removeEventListener("focus", () => {
                titleInput.classList.remove("isinvalid");
                titleInput.removeEventListener("focus")
            })

        })
        validForm = false
    }

    if (!validForm){
        setValidForm(false)
        return 
    }


    // Do something with the data here
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}job-profile/newJob`
    setValidForm(true)
    try {
        data.salaryRange = data.salaryRange.map(Number)
        const retData = await axios.post(url, data)
        if(retData.status >= 200){
            alert("Job Posted Successfully")
            setIsModel(false)
        }
        console.log(retData)
    } catch (error) {
        console.log(error)
        alert("Error while posting job")
    }
}
