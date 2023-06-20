import React from 'react';
import CartItem from './CartItem';

function Cart(props) {
    const { products, onIncreaseQuantity, onDecreaseQuantity, onHandleDeleteProduct } = props;

    return (
        <div className="cart">
            {products.map((product, index) => (
                <div key={product.id}>
                    <CartItem
                        key={product.id}
                        product={product}
                        onIncreaseQuantity={onIncreaseQuantity}
                        onDecreaseQuantity={onDecreaseQuantity}
                        onhandleDeleteProduct={onHandleDeleteProduct}
                    />
                    {index < products.length - 1 && <div style={{ marginBottom: '10px' }}></div>}
                </div>
            ))}
        </div>
    );
}

export default Cart;
