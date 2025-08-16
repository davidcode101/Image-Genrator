import { useContext, useState } from 'react'; // Import React hooks for state and context
import { assets } from '../assets/assets/assets'; // Import placeholder/sample assets
import { AppContext } from '../Context/AppContext'; // Import AppContext to access shared functions like generateImage

const Result = () => {
  // State for currently displayed image
  const [image, setImage] = useState(assets.sample_img_1);

  // Flag to check if the generated image has loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Flag to show loading animation
  const [loading, setLoading] = useState(false);

  // State for user input prompt
  const [input, setInput] = useState('');

  // Destructure generateImage function from context
  const { generateImage } = useContext(AppContext);

  // Handler when form is submitted
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Start loading indicator
    if (input) {
      const image = await generateImage(input); // Generate image from input prompt
      if (image) {
        setIsLoaded(true); // Set flag to true when image is loaded
        setImage(image); // Update image state
      }
    }
    setLoading(false); // Stop loading indicator
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
      <div>
        <div className='relative'>
          {/* Display generated or placeholder image */}
          <img src={image} alt="" className='max-w-sm rounded' />

          {/* Loading progress bar at the bottom */}
          {loading && <span className='absolute bottom-0 left-0 h-1 bg-blue-500 w-full transition-all duration-[10s]' />}
        </div>

        {/* Loading text shown only when loading */}
        <p className={!loading ? 'hidden' : ''}>Loading...</p>
      </div>

      {/* Input section shown only when image is not yet loaded */}
      {!isLoaded &&
        <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
          <input
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20'
            type="text"
            placeholder='Type Your Prompt Here'
            value={input}
            onChange={(e) => setInput(e.target.value)} // Update input state
          />
          <button type="submit" className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
        </div>
      }

      {/* Section shown after image is loaded */}
      {isLoaded &&
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          {/* Button to reset and generate a new image */}
          <p onClick={() => { setIsLoaded(false) }} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>
            Generate another
          </p>

          {/* Button to download the generated image */}
          <a href={image} download="generated-image.png" className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>
            Download
          </a>
        </div>
      }
    </form>
  );
}

export default Result; // Export the Result component
