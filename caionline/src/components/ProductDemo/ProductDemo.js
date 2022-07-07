import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { PIC_BASEURL } from '../../helpers/picUrl';

import * as serviceKit from '../../services';
import { useQuery } from 'react-query';

function ProductDemo() {
  let emptyProduct = {
    id: null,
    name: '',
    image: null,
    description: '',
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK',
    state: 'new'
  };

  const [products, setProducts] = useState(null);
  const [productCUDs, setproductCUDs] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [refresh, SetRefresh] = useState(false);
  useEffect(() => {
    serviceKit.productServices.getAll().then(rtn => {
      let newProducts = [];
      console.log(rtn)
      newProducts = rtn.data.map(r => {
        let np = { ...r };
        np.state = '';
        return np;
      });
      setProducts(newProducts);
    });
  }, [refresh]);

  const formatCurrency = (value) => {
    return value.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' });
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000
        });
      } else {
        _product.id = createId();
        _product.image = 'product-placeholder.svg';
        _products.push(_product);
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    product.state = 'modified';
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    product.state = 'deleted';
    let _deletedProducts = [...deletedProducts];
    _deletedProducts.push(product);
    setDeletedProducts(_deletedProducts);
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter(val => val.id !== product.id);
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000
    });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter(val => !selectedProducts.includes(val));
    let _deletedPrds = products.filter(val => selectedProducts.includes(val));
    _deletedPrds = _deletedPrds.map(p => { return { ...p, state: 'deleted' }; });
    let _deletedProducts = [...deletedProducts];
    _deletedProducts.push(..._deletedPrds);
    setDeletedProducts(_deletedProducts);
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000
    });
  };

  const onCategoryChange = (e) => {
    let _product = { ...product };
    _product['category'] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const imageBodyTemplate = (rowData) => {
    return <img src={`${PIC_BASEURL}${rowData.image}`} onError={(e) => e.target.src =
      'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image}
                className="w-7rem shadow-2"/>;
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false}/>;
  };

  const statusBodyTemplate = (rowData) => {
    return <span
      className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"
                onClick={() => editProduct(rowData)}/>
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"
                onClick={() => confirmDeleteProduct(rowData)}/>
      </React.Fragment>
    );
  };
  const saveToDb = () => {
    let prds = products.filter(p => p.state !== '');
    prds = prds.concat(deletedProducts);
    serviceKit.productServices.update(prds).then(rtn => {
      SetRefresh(!refresh);
      setDeletedProducts([]);
    });
  };

  const header = (
    <div className="flex flex-column md:flex-row md:align-items-center justify-content-between">
            <span className="p-input-icon-left w-full md:w-auto">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)}
                           placeholder="Search..." className="w-full lg:w-auto"/>
            </span>
      <div className="mt-3 md:mt-0 flex justify-content-end">
        <Button icon="pi pi-plus" className="mr-2 p-button-rounded" onClick={openNew} tooltip="New"
                tooltipOptions={{ position: 'bottom' }}/>
        <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded"
                onClick={confirmDeleteSelected}
                disabled={!selectedProducts || !selectedProducts.length} tooltip="Delete"
                tooltipOptions={{ position: 'bottom' }}/>
        <Button icon="pi pi-upload" className="p-button-help p-button-rounded mr-2"
                onClick={exportCSV} tooltip="Export" tooltipOptions={{ position: 'bottom' }}/>
        <Button icon="pi pi-save" className=" p-button-rounded" onClick={() => { saveToDb(); }}
                tooltip="Save" tooltipOptions={{ position: 'bottom' }}/>
      </div>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
      <Button label="Save" icon="pi pi-check" onClick={saveProduct}/>
    </React.Fragment>
  );

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text"
              onClick={hideDeleteProductDialog}/>
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct}/>
    </React.Fragment>
  );

  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text"
              onClick={hideDeleteProductsDialog}/>
      <Button label="Yes" icon="pi pi-check" className="p-button-text"
              onClick={deleteSelectedProducts}/>
    </React.Fragment>
  );
  const handleFileUpload = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    const formdata = new FormData();
    formdata.append('avatar', file);
    for (var value of formdata.values()) {
      console.log(value);
    }
    const url = 'http://127.0.0.1:3000/products/upload';
    fetch(url, {
      method: 'POST',
      body: formdata
    }).then(response => response.json().then(rtn => {
      console.log(rtn);
      let np = [...product];
      np.image = rtn.filename;
      setProduct(np);
    }))
      .catch(error => console.log(error));
  };
  return (
    <div className="datatable-crud-demo surface-card p-4 border-round shadow-2">
      <Toast ref={toast}/>

      <div className="text-3xl text-800 font-bold mb-4">商品管理</div>

      <DataTable ref={dt} value={products} selection={selectedProducts}
                 onSelectionChange={(e) => setSelectedProducts(e.value)}
                 dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                 paginatorTemplate="首页 PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                 globalFilter={globalFilter} header={header} responsiveLayout="scroll">
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}
                exportable={false}></Column>
        <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column>
        <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
        <Column field="image" header="Image" body={imageBodyTemplate}></Column>
        <Column field="price" header="Price" body={priceBodyTemplate} sortable
                style={{ minWidth: '8rem' }}></Column>
        <Column field="category" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
        <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable
                style={{ minWidth: '12rem' }}></Column>
        <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable
                style={{ minWidth: '12rem' }}></Column>
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
      </DataTable>

      <Dialog visible={productDialog} breakpoints={{ '960px': '75vw', '640px': '100vw' }}
              style={{ width: '40vw' }} header="Product Details" modal className="p-fluid"
              footer={productDialogFooter} onHide={hideDialog}>
        {
          product.image &&
          <div>
            <img src={`${PIC_BASEURL}${product.image}`} onError={(e) => e.target.src =
              'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                 alt={product.image} className="block mt-0 mx-auto mb-5 w-20rem shadow-2"/>
            <input type="file" name="avatar" onChange={(e) => { handleFileUpload(e); }}/>
          </div>
        }
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')}
                     required autoFocus
                     className={classNames({ 'p-invalid': submitted && !product.name })}/>
          {submitted && !product.name && <small className="p-error">Name is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <InputTextarea id="description" value={product.description}
                         onChange={(e) => onInputChange(e, 'description')} required rows={3}
                         cols={20}/>
        </div>

        <div className="field">
          <label className="mb-3">Category</label>
          <div className="formgrid grid">
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category1" name="category" value="Accessories"
                           onChange={onCategoryChange}
                           checked={product.category === 'Accessories'}/>
              <label htmlFor="category1">Accessories</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category2" name="category" value="Clothing"
                           onChange={onCategoryChange} checked={product.category === 'Clothing'}/>
              <label htmlFor="category2">Clothing</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category3" name="category" value="Electronics"
                           onChange={onCategoryChange}
                           checked={product.category === 'Electronics'}/>
              <label htmlFor="category3">Electronics</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category4" name="category" value="Fitness"
                           onChange={onCategoryChange} checked={product.category === 'Fitness'}/>
              <label htmlFor="category4">Fitness</label>
            </div>
          </div>
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="price">Price</label>
            <InputNumber id="price" value={product.price}
                         onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency"
                         currency="USD" locale="en-US"/>
          </div>
          <div className="field col">
            <label htmlFor="quantity">Quantity</label>
            <InputNumber id="quantity" value={product.quantity}
                         onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly/>
          </div>
        </div>
      </Dialog>

      <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal
              footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }}/>
          {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
        </div>
      </Dialog>

      <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal
              footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }}/>
          {product && <span>Are you sure you want to delete the selected products?</span>}
        </div>
      </Dialog>
    </div>
  );
}

export default ProductDemo;
