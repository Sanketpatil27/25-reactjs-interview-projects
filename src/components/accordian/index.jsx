// single selection 
// multiple selection

import { useState } from "react"
import './styles.css'
import data from "./data";

export default function Accordian() {
    // to track which one is selected according to id
    const [selected, setSelected] = useState();
    const [multiSelected, setMultiSelected] = useState([]);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);

    function handleSingleSelection(getCurrentId) {
        setSelected(selected === getCurrentId ? null : getCurrentId);;
    }

    function handleMultiSelection(getCurrentId) {
        let cpyMultiple = [...multiSelected];
        const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);
        console.log(findIndexOfCurrentId);

        if(findIndexOfCurrentId === -1)
            cpyMultiple.push(getCurrentId);
        else
            cpyMultiple.splice(findIndexOfCurrentId, 1);
        
        setMultiSelected(cpyMultiple);
    }

    console.log(selected, multiSelected);
    
    return <div className="wrapper">

        <button onClick={ () => {
            setEnableMultiSelection(!enableMultiSelection) 
        }}> Enable { enableMultiSelection? "SingleSelection" : "MultiSelection"} </button>

        <div className="accordian">
            {
                data && data.length > 0 ?
                    data.map((dataItem, ind) => <div className="item" key={ind}>
                        <div onClick={() => enableMultiSelection
                            ? handleMultiSelection(dataItem.id) 
                            : handleSingleSelection(dataItem.id)} 
                            className="title">
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                        </div>

                        {
                            // if current id found in one of these then show it
                            enableMultiSelection 
                            ? multiSelected.indexOf(dataItem.id) !== -1 && (
                                <div className="content"> {dataItem.answer} </div> 
                            )
                            : selected === dataItem.id && (
                                <div className="content"> {dataItem.answer} </div> 
                            )
                        }
                    </div>)
                : <div> Will get you soon </div>
            }
        </div>
    </div>
}