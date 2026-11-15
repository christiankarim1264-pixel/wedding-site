import Image from "next/image";
import "./styles.css";

/* Real pixel sizes of each photo (after rotation). The browser uses them to
know each slide's shape, and `sizes` below to pick a sharp enough version. */
const images = [
    { src: '/pictures/DSC01980.JPEG', width: 4722, height: 7080 },
    { src: '/pictures/DSC02001.JPEG', width: 4749, height: 7120 },
    { src: '/pictures/DSC01982.JPEG', width: 5304, height: 7952 },
    { src: '/pictures/DSC02075.JPEG', width: 7952, height: 5304 },
    { src: '/pictures/DSC02040.JPEG', width: 5304, height: 7952 },
    { src: '/pictures/DSC02136.JPG', width: 5304, height: 7952 },
    { src: '/pictures/DSC02093.JPEG', width: 7952, height: 5304 },
    { src: '/pictures/DSC02035.JPEG', width: 4687, height: 7027 },
    { src: '/pictures/DSC02358.JPEG', width: 4750, height: 7122 },
    { src: '/pictures/DSC02455.JPEG', width: 4614, height: 6918 },
    { src: '/pictures/DSC01996.JPEG', width: 5304, height: 7952 },
];

/* Must match the .carousel heights in styles.css. */
const DESKTOP_HEIGHT = 800;
const PHONE_HEIGHT = 500;

/* Slides fill the carousel height, so a photo's on-screen width is that
height times its aspect ratio: ~1200px for landscape, ~530px for portrait. */
function slideSizes(width: number, height: number) {
    const ratio = width / height;
    return `(max-width: 600px) ${Math.ceil(PHONE_HEIGHT * ratio)}px, ${Math.ceil(DESKTOP_HEIGHT * ratio)}px`;
}

export default function Carousel() {
    const slides = [...images, ...images];

    return (
        <div className="carousel">
            <div className="carouselTrack">
                {slides.map((image, index) => (
                    <Image
                        key={index}
                        src={image.src}
                        alt=""
                        width={image.width}
                        height={image.height}
                        sizes={slideSizes(image.width, image.height)}
                        loading="eager"
                        className="carouselSlide"
                    />
                ))}
            </div>
        </div>
    );
}
