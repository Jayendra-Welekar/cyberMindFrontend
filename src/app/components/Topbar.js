
"use client"
import BottomNav from "./Navbar/BottomNav";
import TopNav from "./Navbar/TopNav";

export default function Topbar() {
return(
    <div className="p-4 flex flex-col items-center justify-center shadow-md bg-white relative">
        <TopNav /> 
        <BottomNav/>   
    </ div>
)

}