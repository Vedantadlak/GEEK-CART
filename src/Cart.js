import React from 'react';
import CartItem from './CartItem';

function Cart(props) {
    const { products, onIncreaseQuantity, onDecreaseQuantity, onHandleDeleteProduct } = props;

    return (
        <div className="cart">
            {products.map((product) => (
                <CartItem
                    key={product.id}
                    product={product}
                    onIncreaseQuantity={onIncreaseQuantity}
                    onDecreaseQuantity={onDecreaseQuantity}
                    onHandleDeleteProduct={onHandleDeleteProduct}
                />
            ))}
        </div>
    );
}

export default Cart;
