import { createContext, useEffect, useState } from "react"; // Import React hooks and createContext
import { toast } from "react-toastify"; // Import toast for notifications
import axios from 'axios'; // Import axios for HTTP requests
import { Navigate } from "react-router-dom"; // Import Navigate (though this usage might not work directly)

export const AppContext = createContext(); // Create context for global state

const AppContextProvider = (props) => {
    // State to store the logged-in user info
    const [user, setUser] = useState(null);

    // State to show/hide the login modal
    const [showLogin, setShowLogin] = useState(false);

    // State to store token from localStorage
    const [token, setToken] = useState(localStorage.getItem('token'));

    // State to store user's credits
    const [credit, setCredit] = useState();

    // Backend API URL from environment variables
    const backendurl = import.meta.env.VITE_BACKEND_URL;
   
    // Function to load user credits and update user info
    const loadCredits = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/user/creadits', { headers: { token } });
            if (data.success) {
                setCredit(data.credits); // Update credits
                setUser(data.user); // Update user info
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message); // Show error notification
        }
    }

    // Function to generate AI images using prompt
    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(backendurl + '/api/image/generate', { prompt }, { headers: { token } });
            if (data.success) {
                loadCredits(); // Update credits after generating
                return data.resultImage; // Return generated image
            } else {
                toast.error(data.message); // Show error if failed
                loadCredits(); // Update credits even if failed
                if (data.creditBalance === 0) {
                    Navigate('/buy'); // Redirect to buy page if no credits (note: Navigate here won't work like a hook)
                }
            }
        } catch (error) {
            toast.error(error.message); // Show error if request fails
        }
    }

    // Function to log out user
    const logout = () => {
        localStorage.removeItem('token'); // Remove token from storage
        setToken(''); // Clear token state
        setUser(null); // Clear user state
    }

    // Load credits whenever token changes
    useEffect(() => {
        if (token) {
            loadCredits();
        }
    }, [token]);

    // Context value object with all states and functions
    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendurl,
        token,
        setToken,
        credit,
        setCredit,
        loadCredits,
        logout,
        generateImage
    }

    // Provide context to children components
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider; // Export context provider
