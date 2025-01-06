"use client";

import { formContext, userContext } from "@/app/page";
import { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import HandleSubmitForm from "./HandleSubmitForm";

import { IoMdClose } from "react-icons/io";

export default function Form() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState([]);
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [jobResponsibilities, setJobResponsibilities] = useState("");

  const { isModel, setIsModel } = useContext(formContext);
  const [dropDown, setDropDown] = useState(false);
  const [validForm, setValidForm] = useState(true);
  const { user, setUser } = useContext(userContext);

  const { register, handleSubmit, setValue, errors } = useForm();
  const { register: logInRegister, handleSubmit: handleLogInSubmit } = useForm()

  const onSubmit = (data) => {
    data.jobType = jobType
    console.log(data)
    HandleSubmitForm(setValidForm, setIsModel, data);
  };

  useEffect(() => {
    console.log("ON DAY")
  }, [])

  useEffect(() => {
    if (!validForm) {
      alert("Please fill all required fields")
    } 
  }, [validForm])

  const saveDraft = (e) => {
    e.preventDefault();
    const formData = {
      jobTitle,
      companyName,
      location,
      jobType,
      salaryRange,
      applicationDeadline,
      jobDescription,
      jobRequirements,
      jobResponsibilities
    };
    // console.log(JSON.stringify(formData))
    localStorage.setItem("formData", JSON.stringify(formData));
    alert("Form saved as draft");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.addEventListener("click", (e) => {
      if (e.target.id == "form") {
        setIsModel(false);
      }
    });

    if (localStorage.getItem("formData") != null) {
      const formData = JSON.parse(localStorage.getItem("formData"));
      setJobTitle(formData.jobTitle);
      setCompanyName(formData.companyName);
      setLocation(formData.location);
      setJobType(formData.jobType);
      setSalaryRange(formData.salaryRange);
      setApplicationDeadline(formData.applicationDeadline);
      setJobDescription(formData.jobDescription);
      setJobRequirements(formData.jobRequirements);
      setJobResponsibilities(formData.jobResponsibilities);

      setValue("jobTitle", formData.jobTitle);
      setValue("companyName", formData.companyName);
      setValue("location", formData.location);
      setValue("jobType", formData.jobType);
      setValue("salaryRange", formData.salaryRange);
      setValue("applicationDeadline", formData.applicationDeadline);
      setValue("jobDescription", formData.jobDescription);
      setValue("jobRequirements", formData.jobRequirements)
      setValue("jobResponsibilities", formData.jobResponsibilities)

      console.log("Got data from local storage");
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSignIn = (data) => {
    if (data.username === "admin" && data.password === "admin123") {
      localStorage.setItem("user", JSON.stringify({ username: "admin", role: "admin" }))
      alert("Logged In as Admin")
      setUser({
        "username": "admin",
        "role": "admin"
      })
      setIsModel(false)
    } else {
      localStorage.setItem("user", JSON.stringify({ username: data.username, role: "user" }))
      alert("Logged In as User")
      setUser({
        "username": "user",
        "role": "user"
      })
      setIsModel(false)
    }
  }



  return (
    <>
      <div
        id="form"
        className="absolute overflow-y-auto  w-full h-screen top-0 left-0 z-10 flex justify-center items-center bg-gray-400/40 pointer-events-auto py-8 px-2 md:px-8"
      >
        {user && <div className="md:min-w-[800px]  md:max-w-[600px] bg-white rounded-md p-8 shadow-lg mt-[300px] md:mt-0 relative">
          {user && user.role === "admin" && <>
         <IoMdClose className="md:top-8 md:right-4 top-4 right-2 absolute mx-4 text-3xl cursor-pointer text-gray-700 hover:text-black hover:rotate-90 transition-all duration-200" onClick={()=>setIsModel(false)}/>
          <div className="w-full flex justify-center items-center my-4">
            <h1 className="text-2xl font-medium">Create Job Opening</h1>
          </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-row flex-wrap  justify-center items-center gap-y-4 relative "
            >
              <div className="w-full md:w-[50%]  flex flex-col justify-center items-start pr-2">
                <label
                  className=" text-md font-medium text-gray-500"
                  htmlFor="jobTitle"
                >
                  Job Title
                </label>
                <input
                  {...register("jobTitle")}
                  id="jobTitle"
                  className="font-medium w-full border-[0.5px] border-gray-300 rounded-lg  px-4 py-2 mt-2 focus:outline-none focus:border-gray-700 focus:ring-gray-700"
                  onChange={(event) => {
                    setJobTitle(event.target.value);
                  }}
                  placeholder="Enter Job Title"
                  value={jobTitle}
                />
              </div>
              <div className="w-full md:w-[50%]  flex flex-col justify-center items-start pr-2">
                <label
                  className=" text-md font-medium text-gray-500"
                  htmlFor="companyName"
                >
                  Company Name
                </label>
                <input
                  {...register("companyName")}
                  id="companyName"
                  onChange={(event) => {
                    setCompanyName(event.target.value);
                  }}
                  className="font-medium  w-full border-[0.5px] border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none   focus:border-gray-700  focus:ring-gray-700 focus:text-gray-700"
                  placeholder="Enter Company Name"
                  value={companyName}
                />
              </div>
              <div className="w-full md:w-[50%]  flex flex-col justify-center items-start pr-2">
                <label
                  className=" text-md font-medium text-gray-500"
                  htmlFor="companyName"
                >
                  Location
                </label>
                <input
                  {...register("location")}
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                  id="jobLocation"
                  className="font-medium text-gray-500 w-full border-[0.5px] border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none   focus:border-gray-700  focus:ring-gray-700 focus:text-gray-700"
                  placeholder="Enter Company Name"
                  value={location}
                />
              </div>
              <div className="w-full md:w-[50%]  flex flex-col justify-center items-start relative">
                <label
                  className="font-medium  text-md font-medium text-gray-500"
                  htmlFor="jobType"
                >
                  Job Type
                </label>
                <input
                  {...register("jobType")}
                  onChange={(event) => {
                    setJobType(event.target.value);
                  }}
                  onClick={() => {
                    setDropDown(true)
                  }}
                  id="jobType"
                  className="font-medium text-gray-500 w-full border-[0.5px] border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none   focus:border-gray-700  focus:ring-gray-700 focus:text-gray-700 "
                  placeholder="Select a job type"
                  value={jobType}
                  readOnly
                >
                  {/* <option className="py-2 font-medium text-sm pointer-cursor hover:bg-gray-400 text-gray-700" value="">Choose Preffered Job Type</option> 
                                <option className="py-2 font-medium text-sm pointer-cursor hover:bg-gray-400 text-gray-700" value="Full Time">Full Time</option>    
                                <option className="py-2 font-medium text-sm pointer-cursor hover:bg-gray-400 text-gray-700" value="Internship">Internship</option>    
                                <option className="py-2 font-medium text-sm pointer-cursor hover:bg-gray-400 text-gray-700" value="Part Time">Part Time</option>    
                                <option className="py-2 font-medium text-sm pointer-cursor hover:bg-gray-400 text-gray-700" value="Contract">Contract</option>       */}
                </input>
                {dropDown && <ul className="absolute top-[110%] h-auto w-full bg-white rounded-lg overflow-hidden shadow-lg">
                  <li
                    key={"FullTime"}
                    className=" hover:bg-gray-300 py-2 px-6 cursor-pointer text-sm font-medium"
                    value="FullTime"
                    onClick={(e) => {
                      setJobType(e.target.innerText);
                      setDropDown(false);
                    }
                    }
                  >
                    FullTime
                  </li>
                  <li
                    key={"PartTime"}
                    className=" hover:bg-gray-300 py-2 px-6 cursor-pointer text-sm font-medium"
                    value="PartTime"
                    onClick={(e) => {
                      setJobType(e.target.innerText);
                      setDropDown(false);
                    }}
                  >
                    PartTime
                  </li>
                  <li
                    key={"Internship"}
                    className=" hover:bg-gray-300 py-2 px-6 cursor-pointer text-sm font-medium"
                    value="Internship"
                    onClick={(e) => {
                      setJobType(e.target.innerText);
                      setDropDown(false);
                    }}
                  >
                    Internship
                  </li>
                  <li
                    key={"Contract"}
                    className=" hover:bg-gray-300 py-2 px-6 cursor-pointer text-sm font-medium"
                    value="Contract"
                    onClick={(e) => {
                      setJobType(e.target.innerText);
                      setDropDown(false);
                    }}
                  >
                    Contract
                  </li>
                </ul>}
              </div>
              <div className="w-full md:w-[50%]  flex flex-col justify-center items-start ">
                <label
                  className=" text-md font-medium text-gray-500"
                  htmlFor="companyName"
                >
                  Salary Range
                  <div className="flex w-full flex-row justify-between items-center pr-2">
                    <input
                      type="text"
                      {...register("salaryRange[0]")}
                      onChange={(event) => {
                        setSalaryRange([
                          event.target.value,
                          salaryRange[1] ? salaryRange[1] : "",
                        ]);
                      }}
                      id="minSalary"
                      className=" w-[45%] border-[0.5px] border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none   focus:border-gray-700 font-normal  focus:ring-gray-700 focus:text-gray-700"
                      placeholder="Min Salary"
                      value={salaryRange[0] ? salaryRange[0] : ""}
                    />
                    <input
                      type="text"
                      {...register("salaryRange[1]")}
                      onChange={(event) => {
                        setSalaryRange([
                          salaryRange[0] ? salaryRange[0] : "",
                          event.target.value,
                        ]);
                      }}
                      id="maxSalary"
                      className=" w-[45%] border-[0.5px] border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none   focus:border-gray-700 font-normal  focus:ring-gray-700 focus:text-gray-700"
                      placeholder="Max Salary"
                      value={salaryRange[1] ? salaryRange[1] : ""}
                    />
                  </div>
                </label>
              </div>

              <div className="w-full md:w-[50%]  flex flex-col justify-center items-start ">
                <label
                  className="peer-focus:text-gray-700 text-md font-medium text-gray-500"
                  htmlFor="companyName"
                >
                  Application Deadline
                </label>
                <input
                  type="date"
                  {...register("applicationDeadline")}
                  onChange={(event) => {
                    setApplicationDeadline(event.target.value);
                  }}
                  id="deadline"
                  className="peer w-full border-[0.5px] border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none  text-gray-500 focus:border-gray-700  focus:ring-gray-700 focus:text-gray-700"
                  placeholder="Enter Company Name"
                  value={applicationDeadline}
                />
              </div>

              <div className="w-full md:w-[50%]  flex flex-col justify-center items-start pr-2 flex-grow">
                <label
                  className=" text-md font-medium text-gray-500"
                  htmlFor="jobTitle"
                >
                  Job Requirements
                </label>
                <textarea
                  {...register("jobRequirements")}
                  onChange={(event) => {
                    setJobRequirements(event.target.value);
                  }}
                  id="jobReq"
                  className="text-gray-500 w-full border-[0.5px] border-gray-300 rounded-lg  px-4 py-2 mt-2 focus:outline-none focus:border-gray-700 focus:ring-gray-700 focus:text-gray-700"
                  placeholder="Enter Job Title"
                  value={jobRequirements}
                />
              </div>
              <div className="w-full md:w-[50%]  flex flex-col justify-center items-start pr-2 flex-grow">
                <label
                  className=" text-md font-medium text-gray-500"
                  htmlFor="jobTitle"
                >
                  Job Responsibilities
                </label>
                <textarea
                  {...register("jobResponsibilities")}
                  onChange={(event) => {
                    setJobResponsibilities(event.target.value);
                  }}
                  id="jobRes"
                  className="text-gray-500 w-full border-[0.5px] border-gray-300 rounded-lg  px-4 py-2 mt-2 focus:outline-none focus:border-gray-700 focus:ring-gray-700 focus:text-gray-700"
                  placeholder="Enter Job Title"
                  value={jobResponsibilities}
                />
              </div>

              <div className="w-full md:w-[50%]  flex flex-col justify-center items-start pr-2 flex-grow">
                <label
                  className=" text-md font-medium text-gray-500"
                  htmlFor="jobTitle"
                >
                  Job Description
                </label>
                <textarea
                  {...register("jobDescription")}
                  onChange={(event) => {
                    setJobDescription(event.target.value);
                  }}
                  id="jobDesc"
                  className="text-gray-500 w-full border-[0.5px] border-gray-300 rounded-lg  px-4 py-2 mt-2 focus:outline-none focus:border-gray-700 focus:ring-gray-700 focus:text-gray-700"
                  placeholder="Enter Job Title"
                  value={jobDescription}
                />
              </div>
              <div className="w-full flex flex-row  justify-between items-center mt-4">
                <button
                  onClick={saveDraft}
                  className="flex flex-row gap-x-1 justify-center items-center p-2 sm:px-8 px-4 rounded-lg border-[1px] font-medium border-gray-800 text-gray-800  hover:text-gray-500 hover:border-gray-500"
                >
                  {`Save Draft`}
                  <svg
                    width="10"
                    height="13"
                    viewBox="0 0 10 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 7.5L5 11.5L1 7.5M9 1.5L5 5.5L1 1.5"
                      stroke="#222222"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  type="submit"
                  className="flex flex-row items-center gap-x-1 p-2 px-8 rounded-lg bg-blue-400 border-[1px] font-medium  text-white hover:bg-blue-500"
                >
                  {`Publish`}{" "}
                  <svg
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1.5L11 5.5L7 9.5M1 1.5L5 5.5L1 9.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </form></>}
          {
            user && user.role && user.role !== "admin" && <div className="w-full flex justify-center items-center my-4">
              <h1 className="text-2xl font-medium">You are not authorized to create job opening</h1>
            </div>
          }

        </div>}

        {
          !user && <div className=" w-full sm:w-[500px] bg-white rounded-lg shadow-lg ">
            <div className="w-full flex justify-center items-center my-4">
              <h1 className="text-2xl font-medium">Sign In</h1>
            </div>
            <form
              onSubmit={handleLogInSubmit(handleSignIn)}
              className="w-full flex flex-row flex-wrap justify-center items-center gap-y-4 relative "
              
            >
              <div className="w-full h-[300px] rounded-lg p-4">
                <div className="w-full flex flex-col justify-center items-start pr-2">
                  <label className=" text-md font-medium text-gray-500">UserName</label>
                  <input
                    className="font-medium w-full border-[0.5px] border-gray-300 rounded-lg  px-4 py-2 mt-2 focus:outline-none focus:border-gray-700 focus:ring-gray-700"
                    {...logInRegister("username")} type="text" placeholder="admin" />
                </div>
                <div className="flex flex-col w-full justify-center items-start h-auto mt-4">
                  <label className=" text-md font-medium text-gray-500">Password</label>
                  <input
                    className="font-medium w-full border-[0.5px] border-gray-300 rounded-lg  px-4 py-2 mt-2 focus:outline-none focus:border-gray-700 focus:ring-gray-700"
                    {...logInRegister("password")} type="password" placeholder="admin123" />
                </div>
                <button className="w-full px-4 py-2 hover:bg-blue-500 mt-4 text-lg font-medium  bg-blue-400 rounded-lg text-white" type="submit">Sign In</button>
              </div>
            </form>
          </div>
        }
      </div>

    </>

  );
}


