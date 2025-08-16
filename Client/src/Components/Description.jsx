// Importing assets (like images) from a local assets folder
import { assets } from "../assets/assets/assets";

// Functional React component named Description
const Description = () => {
  // The component returns JSX, which defines the UI
  return (
    // Main container div with flex layout, centered content, margin & padding
    <div className="flex flex-col items-center justify-center text-center my-20 p-6 md:px-28">

      {/* Main heading */}
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create ai Images
      </h1>

      {/* Subheading/description text */}
      <p className="text-gray-500 mb-8">Turn your imagination in visuals</p>

      {/* Container for image and text side by side on medium screens and above */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">

        {/* Sample image from imported assets */}
      <img
  src={assets.sample_img_1}         // Image source
  alt="Sample AI-generated visual"  // Descriptive alt text for accessibility
  className="w-80 sm:w-96 md:w-1/2 lg:w-2/5 rounded-xl shadow-lg object-cover "
/>


        {/* Container for text content next to image */}
        <div>
          {/* Heading for AI generator introduction */}
          <h1 className='text-3xl font-medium mx-w-lg mb-4'>
            Introducing the AI-Powerd Text To IMAge Genrator
          </h1>

          {/* Paragraph explaining the platform */}
          <p className="text-gray-600 mb-4">
            InkWave is a powerful AI image generation platform that transforms
            your imagination into vivid visuals using simple text prompts.
            Whether you're an artist, designer, or casual creator, InkWave lets
            you generate stunning, high-quality images in seconds. With features
            like customizable styles, a public gallery, and light-to-dark theme
            support, it's designed for both inspiration and expression.
            Discover, create, and share your unique visions effortlessly with
            InkWave — where your words become waves of visual magic. 🎨✨
          </p>

          {/* Paragraph listing key features */}
          <p>
            <strong>Key Features:</strong>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              <li>AI-powered image generation</li>
              <li>Customizable styles and themes</li>
              <li>Public gallery for inspiration</li>
              <li>Fast and user-friendly interface</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the component so it can be used in other parts of the app
export default Description;
