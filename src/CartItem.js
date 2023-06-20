
import { React, useState } from 'react';
import './App.css'

function CartItem(props) {

    
    
    return (
        <div className="cart-item">
            <div className="left-block">
                <img style={styles.image} src={props.product.img} />
            </div>
            <div className="right-block">
                <div style={{ fontSize: 25 }}>{props.product.title}</div>
                <div style={{ color: '#777' }}>Rs {props.product.price}</div>
                <div style={{ color: '#777' }}>Qty :{props.product.qty}</div>
                <div className="cart-item-actions">
                    <img 
                    alt="increase"
                     className="action-icons" 
                     src="https://cdn-icons-png.flaticon.com/128/992/992651.png"
                        onClick={() => props.onIncreaseQuantity(props.product)}/>
                    <img alt="decrease" className="action-icons" src="https://cdn-icons-png.flaticon.com/512/992/992683.png"
                        onClick={()=>props.onDecreaseQuantity(props.product)} />
                    <img alt="delete" className="action-icons" src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
                        onClick={() => props.onhandleDeleteProduct(props.product.id)} />


            </div>

            </div>


        </div>
    );
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;