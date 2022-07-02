function getProductsFromServer() {
    return fetch('http://127.0.0.1:3006/api/product/getall').then(res => res.json()).then(d => d.data.data);
}
function updateProductsToServer(products) {
    console.log(products);
    return fetch('http://127.0.0.1:3006/api/product/update', {
        body: JSON.stringify({ products: products }),
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(d => console.log(d.state));
}

export { getProductsFromServer, updateProductsToServer };