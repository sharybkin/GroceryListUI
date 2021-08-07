import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EditableProductRow from './productRows/EditableProductRow';
import ProductRow from './productRows/ProductRow';

ProductTable.propTypes = {
    
}


function ProductTable({products, onChangeStatus, onApplyChange, onDelete}){
    let [editableProductId, setEditableProductId] = useState("");

    let getProduct = (id) => {
        let product;
        
        products.forEach(pr => {
            if(pr.id === id){
                console.log(pr.productName);
                product = pr;
            }
        });

        return product;
    }

    let onEdit = (id) => {
        setEditableProductId(id);
        console.log("onEdit");
    }

    let onApplyEdit = (id, productName, amount) => {
        
        onApplyChange(id, productName, amount);
        setEditableProductId("")
    }

    let onCancelEdit = () => {
        setEditableProductId("");
    }

    let getProductRow = (pr) => {
        return (
        <ProductRow key = {pr.id} id = {pr.id} productName = {pr.productName} 
                amount = {pr.amount} status = {pr.status} 
                onChange = {onChangeStatus} onEdit = {onEdit} onDelete = {onDelete}/>);
    }

    let getEditableRow = (pr) => {
        return (
        <EditableProductRow key = {pr.id} id ={pr.id} productName = {pr.productName} amount = {pr.amount}
            onApply = {onApplyEdit} onCancel = {onCancelEdit} />);
    }

    let productRows = products.map((pr) => (
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

export default ProductTable;