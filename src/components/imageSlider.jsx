import React from "react";

export default function ImageSlider(props) {

    const images = props.images;

        if (!images || !Array.isArray(images) || images.length === 0) {
        return <div>No images to display.</div>; // Or handle this case as appropriate
    }

    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    
    return (
        <div className="w-[400px]">
            <img src={images[currentImageIndex]} alt="Product Image" className="w-full h-[400px] object-cover"/>
            <div className="w-full h-[100px] flex justify-center items-center gap-4">
                {
                    images.map(
                        (img, index) => {
                            return (
                                <img 
                                    key={index} 
                                    src={img}
                                    className={"w-[90px] h-[90px] object-cover " + (currentImageIndex === index ? "border-4 border-accent" : "border-2 border-gray-300 hover:border-accent cursor-pointer")}
                                    onClick={()=>{
                                        setCurrentImageIndex(index);
                                    }}
                                />
                            )
                        }
                    )
                }
            </div>
        </div>
    );
}