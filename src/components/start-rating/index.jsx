import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './styles.css'

export default function StartRating({ noOfStars }) {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    function handleClick(currInd) {
        setRating(currInd);
    }

    function handleMouseEnter(currInd) {
        setHover(currInd);
    }

    function handleMouseLeave() {
        setHover(rating);       // coz when we leave the selected starts should show as it is
    }

    return (
        <div className="star-rating">
            {
                [...Array(noOfStars)].map((_, ind) => {
                    ind += 1;

                    return <FaStar
                        key={ind}
                        className= {ind <= (hover || rating) ? 'active' : 'inactive'}
                        onClick={() => handleClick(ind)}
                        onMouseMove={() => handleMouseEnter(ind)}
                        onMouseLeave={() => handleMouseLeave()}
                        size={40}
                    />
                })
            }
        </div>
    )
}