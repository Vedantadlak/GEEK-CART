import React from 'react';

function CartItem(props) {
    const { product, onIncreaseQuantity, onDecreaseQuantity, onHandleDeleteProduct } = props;

    return (
        <div className="cart-item" key={product.id}>
            <div className="left-block">
                <img style={styles.image} src={product.img} alt={product.title} />
            </div>
            <div className="right-block">
                <div style={{ fontSize: 25 }}>{product.title}</div>
                <div style={{ color: '#777' }}>Rs {product.price}</div>
                <div style={{ color: '#777' }}>Qty: {product.qty}</div>
                <div className="cart-item-actions">
                    <img
                        alt="increase"
                        className="action-icons"
                        src="https://cdn-icons-png.flaticon.com/128/992/992651.png"
                        onClick={() => onIncreaseQuantity(product)}
                    />
                    <img
                        alt="decrease"
                        className="action-icons"
                        src="https://cdn-icons-png.flaticon.com/512/992/992683.png"
                        onClick={() => onDecreaseQuantity(product)}
                    />
                    <img
                        alt="delete"
                        className="action-icons"
                        src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
                        onClick={() => onHandleDeleteProduct(product.id)}
                    />
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
        background: '#ccc',
    },
};

export default CartItem;
