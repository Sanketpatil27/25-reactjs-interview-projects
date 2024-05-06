import Accordian from "./components/accordian"
import RandomColor from "./components/random-color"
import StartRating from "./components/start-rating"
import ImageSlider from "./components/image-slider"
import LoadMoreData from "./components/load-more-data"
import './App.css'

function App() {

  return (
    <div>
      {/* <Accordian /> */}
      {/* <RandomColor /> */}
      {/* <StartRating noOfStars={5}/> */}
      {/* <ImageSlider url={'https://picsum.photos/v2/list'} page={1} limit={10} /> */}
      <LoadMoreData />
    </div>
  )
}

export default App
