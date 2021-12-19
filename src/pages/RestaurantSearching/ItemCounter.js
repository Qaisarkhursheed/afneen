import React, {useState, useEffect} from 'react';
import {Button}  from 'antd';

const ItemCounter = ({isEdit, item, onIncrement, onDecrement, initialValue }) => {
    const [counter, setCounter] =  useState( isEdit ? item.quantity : item.quantity);
    const onPlus = () => {
        setCounter(counter + 1);
        onIncrement({name:item.name, price: item.price, quantity:counter + 1});
    };
    const onMinus = () => {
        setCounter(counter < 1 ? counter : counter - 1);
        onDecrement(counter < 1 ? 
            {name:item.name, price: item.price,  quantity:0} :
            {name:item.name, price: item.price, quantity:counter - 1});
    };
    useEffect(()=>{
            if (isEdit) {
                setCounter(item.quantity)
            } else {
                setCounter(item.quantity)
            }
    },[isEdit,item.quantity])
    return (
        <div className="items-counters">
            <div className="items-heading-and-prices">
                <p>{item.name}</p>
                <p>{item.price} CHF</p>
            </div>
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

export default ItemCounter;
