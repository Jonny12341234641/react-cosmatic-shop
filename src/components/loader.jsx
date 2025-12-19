/**
 * Loader Component
 * =============================================================================
 * A functional component that renders a centered loading spinner.
 * This is typically used to indicate active data fetching or processing states.
 * * Functional Steps:
 * 1. Creates a full-width, full-height container.
 * 2. Uses Flexbox to center the content both vertically and horizontally.
 * 3. Renders a circular element with a spinning animation to visual loading.
 * =============================================================================
 */
export function Loader() {
  return (
    /* Main Container
       - w-full h-full: Occupies available width and height.
       - flex justify-center items-center: Centers the spinner in the middle of the container.
    */
    <div className="w-full h-full h-[min] flex justify-center items-center">
      
      {/* Spinner Element
         - border-[8px]: Sets the thickness of the spinner ring.
         - border-accent: Colors the ring with the theme's accent color.
         - border-b-transparent: Makes the bottom border transparent to create the "gap" in the circle.
         - rounded-full: Turns the square div into a perfect circle.
         - w-[100px] h-[100px]: Sets the specific dimensions of the spinner.
         - animate-spin: Applies the Tailwind utility for infinite rotation.
      */}
      <div className="border-[8px] border-accent border-b-transparent rounded-full w-[100px] h-[100px] animate-spin">
      </div>
      
    </div>
  );
}