import { useEffect, useState } from "react"
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import './style.css'

export default function ImageSlider({ url, page = 1, limit = 6 }) {
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchImages(getUrl) {
        try {
            setLoading(true);
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (data) {
                setImages([data]);
                setLoading(false);
            }

        } catch (e) {
            setLoading(false);
            setErrorMsg(e.message);
        }
    }


    useEffect(() => {
        if (url !== '')
            fetchImages(url);
    }, [url]);

    console.log(images);

    if (loading) {
        return <div>
            Loading....
        </div>
    }

    if (errorMsg !== null) {
        return <div>
            Error Occured!!!  {errorMsg}
        </div>
    }


    function handlePrev() {
        setCurrentSlide(currentSlide => currentSlide === 0 ? images[0].length-1 : currentSlide-1);
    }
    
    function handleNext() {
        setCurrentSlide(currentSlide => currentSlide === images[0].length-1 ? 0 : currentSlide+1);
    }

    return (
        <div className="container">
            <BsArrowLeftCircleFill onClick={handlePrev} className="arrow arrow-left" />

            {
                images && images.length
                    ? images[0].map((imageItem, ind) => {
                        return <img
                            key={imageItem.id}
                            src={imageItem.download_url}
                            alt="nothing here"
                            className={currentSlide === ind ? "current-image" : "current-image-hide"}
                        />
                    })
                    : null
            }

            <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right" />

            <span className="circle-indicator">
                {
                    images && images.length
                        ? images[0].map((_, ind) => {
                            return <button
                                key={ind}
                                className={currentSlide === ind ? "current-indicator" : "current-indicator inactive-indicator"}
                                onClick={() => setCurrentSlide(ind)}
                            > </button>
                        })
                        : null
                }
            </span>
        </div>
    );
}