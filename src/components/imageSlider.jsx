import React from "react";

/**
 * ImageSlider Component
 * =============================================================================
 * A functional React component that renders an interactive image gallery.
 * It displays a main featured image and a navigable strip of thumbnails.
 * * * Functional Steps:
 * 1. Extracts the 'images' array from the incoming props.
 * 2. Validates the data: If no images exist or the data is invalid, 
 * it renders a fallback message to prevent errors.
 * 3. Initializes local state to track the currently selected image index.
 * 4. Renders the main view:
 * - Displays the large image based on the current state index.
 * - Generates a row of clickable thumbnails using the map function.
 * - Applies conditional styling (borders) to highlight the active thumbnail.
 * =============================================================================
 */
export default function ImageSlider(props) {

  // Extract the images array from the component properties
  const images = props.images;

  // Validation Check:
  // Ensure 'images' exists, is a valid array, and is not empty.
  // If validation fails, return a fallback UI.
  if (!images || !Array.isArray(images) || images.length === 0) {
    return <div>No images to display.</div>;
  }

  // State Initialization:
  // 'currentImageIndex' holds the index of the image currently displayed in the main view.
  // 'setCurrentImageIndex' is the function used to update this index.
  // Default state is 0 (the first image).
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  return (
    <div className="w-[400px]">
      
      {/* Main Image Display 
        Dynamically sets the 'src' based on the 'currentImageIndex' state.
      */}
      <img 
        src={images[currentImageIndex]} 
        alt="Product Image" 
        className="w-full h-[400px] object-cover"
      />

      {/* Thumbnail Container */}
      <div className="w-full h-[100px] flex justify-center items-center gap-4">
        {
          /* Array Mapping Function
            ----------------------
            Iterates through the 'images' array to create a thumbnail for each item.
            
            Arguments:
            - img: The URL string of the current image in the iteration.
            - index: The numeric position of the image in the array.
          */
          images.map((img, index) => {
            return (
              <img 
                key={index} 
                src={img}
                /* Conditional Styling Logic:
                  - Base classes: fixed dimensions (90x90) and object-cover.
                  - If this image IS the current one (currentImageIndex === index):
                    Apply a thick accent border ("border-4 border-accent").
                  - If this image IS NOT the current one:
                    Apply a thin gray border ("border-2 border-gray-300") and 
                    add hover effects ("hover:border-accent cursor-pointer") to indicate interactivity.
                */
                className={
                  "w-[90px] h-[90px] object-cover " + 
                  (currentImageIndex === index ? "border-4 border-accent" : "border-2 border-gray-300 hover:border-accent cursor-pointer")
                }
                /* Click Handler:
                  Updates the state to the index of this clicked thumbnail, 
                  causing the Main Image Display to re-render with the new image.
                */
                onClick={() => {
                  setCurrentImageIndex(index);
                }}
              />
            );
          })
        }
      </div>
    </div>
  );
}