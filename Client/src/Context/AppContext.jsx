import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { Navigate } from "react-router-dom";
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const[token,setToken]=useState(localStorage.getItem('token'))
    const [credit,setCredit]=useState()



   const backendurl=import.meta.env.VITE_BACKEND_URL
   
   const loadCredits=async()=>{
    try {
        const{data}=await axios.get(backendurl+'/api/user/creadits',{headers:{token}})
        if(data.success){
            setCredit(data.credits)
            setUser(data.user)
        }
    } catch (error) {
     console.log(error)
     toast.error(error.message)   
    }
   }

 const generateImage=async(prompt)=>{
    try {
      const {data}=  await axios.post(backendurl+'/api/image/generate',{prompt},{headers:{token}})
        if(data.success){
                      loadCredits()
                        return data.resultImage
        }else{
            toast.error(data.message)
         
           loadCredits()
           if(data.creditBalance===0){
            Navigate('/buy')
           }
        }
    } catch (error) {
        toast.error(error.message)
    }
 }


   const logout=()=>{
    localStorage.removeItem('token');
    setToken('')
    setUser(null)
   }
useEffect(()=>{
    if (token) {
        loadCredits()
    }
},[token])


    const value = {
        user, setUser, showLogin, setShowLogin,backendurl,token,setToken,credit,setCredit
    ,loadCredits,logout,generateImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;