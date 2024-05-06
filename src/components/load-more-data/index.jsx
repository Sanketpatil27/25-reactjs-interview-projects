import { useEffect, useState } from "react"
import "./style.css"

export default function LoadMoreData() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableBtn, setDisableBtn] = useState(false);

    async function fetchProducts() {
        try {
            setLoading(true);

            // first time no need to skip any data, afterwords we skip already received data that is 20 each increasing after we click, so count*20 (first time 0 * 20 = 0 data skip)
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count * 20}`);
            const data = await response.json();
            // console.log(data.products);

            if (data && data.products && data.products.length) {
                setProducts(prevProducts => [...prevProducts, ...data.products]);
                setLoading(false);
            }

        } catch (e) {
            console.log("error occured during fetching data");
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [count])

    useEffect(() => {
        if(products && products.length === 100)
            setDisableBtn(true);
    }, [products])

    if (loading) {
        return <div> Loading Data... </div>
    }

    return <div className="load-more-container">
        <div className="product-container">
            {
                products && products.length
                    ? products.map((item, ind) => {
                        return <div className="product" key={ind}>
                                <img src={item.thumbnail} alt={item.title} />
                                <p>{item.title}</p>
                            </div>
                      })
                    : null
            }
        </div>

        <div className="button-container">
            <button 
                onClick={()=>{ setCount(c => c+1) }}
                disabled = {disableBtn}
            >   
                Load More Products
            </button>
        </div>
    </div>
}