import { FaSpinner } from "react-icons/fa";

const LoadingSpinner =()=>{
    return(
        <div className="flex flex-col justify-center items-center h-screen gap-4
        ">
            <FaSpinner className="animate-spin text-3xl text-primary"/>
        </div>
    )
}
export default LoadingSpinner;