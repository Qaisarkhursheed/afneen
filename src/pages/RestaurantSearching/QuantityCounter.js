import React, {useState, useEffect} from 'react';
import {Button}  from 'antd';

const QuantityCounter = ({isEdit, quantity, getQuantity, initialValue }) => {
    const [counter, setCounter] =  useState( isEdit ? initialValue : quantity);
    const onPlus = () => {
        setCounter(counter + 1);
        getQuantity(counter + 1);
    };
    const onMinus = () => {
        setCounter(counter < 2 ? counter : counter - 1);
        getQuantity(counter < 2 ? 1 : counter - 1);
    };
    useEffect(()=>{
        if (isEdit) {
            setCounter(initialValue)
        }
    },[isEdit,initialValue])
    return(
        <div className="items-counters">
            <Button onClick={onMinus} className="increment">
                <i className="fas fa-minus"></i>
            </Button>
                <span>{counter}</span>
            <Button onClick={onPlus} className="decrement">
                <i className="fas fa-plus"></i>
            </Button>
        </div>
    );
};

export default QuantityCounter;
