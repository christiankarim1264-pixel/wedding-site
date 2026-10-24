import Image from "next/image";
import "./styles.css";

const images = ['/pictures/DSC01980.JPEG','/pictures/DSC02001.JPEG','/pictures/DSC01982.JPEG','/pictures/DSC02075.JPEG','/pictures/DSC02040.JPEG','/pictures/DSC02136.JPG','/pictures/DSC02093.JPEG','/pictures/DSC02035.JPEG','/pictures/DSC02358.JPEG','/pictures/DSC02455.JPEG','/pictures/DSC01996.JPEG'];

export default function Carousel() {
    const slides = [...images, ...images];

    return (
        <div className="carousel">
            <div className="carouselTrack">
                {slides.map((src, index) => (
                    <Image
                        key={index}
                        src={src}
                        alt=""
                        width={800}
                        height={500}
                        sizes="500px"
                        loading="eager"
                        className="carouselSlide"
                    />
                ))}
            </div>
        </div>
    );
}
