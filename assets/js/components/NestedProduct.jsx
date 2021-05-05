import React from 'react';

const NestedProduct = ({ array, handleNestedShow }) => {
    return (<>
        <h2>Products</h2>
        {array.map(product =>

            <p>{product.products.productName}</p>
        )}
    </>);
}

export default NestedProduct;