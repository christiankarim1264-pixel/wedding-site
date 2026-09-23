import "./styles.css";

const images = ['/pictures/DSC01980.JPEG','/pictures/DSC02075.JPEG','/pictures/DSC02001.JPEG','/pictures/DSC02093.JPEG'];

export default function Carousel() {
    const slides = [...images, ...images, ...images];

    return (
        <div className="carousel">
            <div className="carouselTrack">
                {slides.map((src, index) => (
                    <img key={index} src={src} className="carouselSlide" />
                ))}
            </div>
        </div>
    );
}
