import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EditableProductRow from './productRows/EditableProductRow';
import ProductRow from './productRows/ProductRow';
import { observer } from 'mobx-react-lite';
import productListItemStore from './store/productListItem';

ProductTable.propTypes = {
    
}


function ProductTable({listId}){
    let [editableProductId, setEditableProductId] = useState("");

    productListItemStore.loadByListId(listId);
    console.log("ListId = ", listId);

    let onEdit = (id) => {
        setEditableProductId(id);
        console.log("onEdit");
    }

    let onApplyEdit = () => {        
        setEditableProductId("")
    }

    let getProductRow = (pr) => {
        return (
        <ProductRow key = {pr.id} id = {pr.id} onEdit = {onEdit}/>);
    }

    let getEditableRow = (pr) => {
        return (
        <EditableProductRow key = {pr.id} id ={pr.id} 
            onApply = {onApplyEdit} onCancel = {onApplyEdit} />);
    }

    let productRows = productListItemStore.products.map((pr) => (
         pr.id === editableProductId ? getEditableRow(pr) : getProductRow(pr)
    ));

    return (
        <table id = "productTable" style = {{tableLayout: "auto"}} className="table align-middle">
            <thead>
                <tr>
                    <td>Done</td>
                    <td>Name</td>
                    <td>Amount</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
            </thead>
            <tbody>
                {productRows}
            </tbody>
        </table>
    );
}

export default observer(ProductTable);