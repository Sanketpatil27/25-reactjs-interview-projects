import { useEffect, useState } from "react"


export default function RandomColor() {
    const [typeOfColor, setTypeOfColor] = useState('hex');
    const [color, setColor] = useState('#000')

    useEffect(() => {
        if(typeOfColor === 'rgb')
            randomRGBColor();
        else 
            randomHexColor();
        
    }, [typeOfColor])


    function generateRGB() {
        return Math.floor(Math.random() * 256);
    }

    function randomRGBColor() {
        if (typeOfColor === 'rgb') {
            const r = generateRGB();
            const g = generateRGB();
            const b = generateRGB();

            setColor(`rgb(${r},${g},${b})`);
        }
    }

    function randomHexColor() {
        const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
        let hexCol = "#";

        for (let i = 0; i < 6; i++)
            hexCol += hex[Math.floor(Math.random() * hex.length)];            // add random value in hexColor

        setColor(hexCol);
    }


    return <div className="container" style={{
        textAlign: "center",
        width: "100vw",
        height: "100vh",
        background: color
    }}>
        <button onClick={() => setTypeOfColor('hex')}> Create HEX Color </button>
        <button onClick={() => setTypeOfColor('rgb')}> Create RGB Color </button>
        <button onClick={typeOfColor === 'hex' ? randomHexColor : randomRGBColor}> Generate Random Color </button>

        <div style={{ display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "200px",
                      fontSize: '100px', 
                    }}>
            <h3> {color} </h3>
        </div>
    </div>
}