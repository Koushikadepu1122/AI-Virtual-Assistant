import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext";

function Card({image}){

     const {serverUrl, userData, setUserData, backendImage, setBackendImage, frontendImage, setFrontendImage,
     selectedImage, setSelectedImage} = useContext(userDataContext)

    return(
        <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030338] border-2 
        border-[#03035ac8] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-600 
        cursor-pointer hover:border-3 hover:border-white ${selectedImage ==image ? 
        "border-3 border-white shadow-2xl shadow-cyan-600" : null}`} 
        onClick={() => 
            {
                setSelectedImage(image)
                setBackendImage(null)
                setFrontendImage(null)
                
        }}>

            <img src={image} className='h-full object-cover transition-transform duration-500
        hover:scale-110 ' />

        </div>
    )
}

export default Card
