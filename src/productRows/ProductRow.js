import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './productRow.module.css';

ProductRow.propTypes = {
    id: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

function ProductRow({id, productName, amount, status, onChange, onEdit, onDelete}){

    let changeStatus = () => {
        let newStatus = status === 1 ? 0 : 1;
        onChange(id, newStatus);
        console.log(productName + "was changed. Status: " + newStatus);
    }

    let buttonStyle = {
        padding: 0,
        border: "none",
        backgroundColor: "transparent"
    }

    return (
        <tr className="productRow" id={id}>
            <td style={{width: "2%"}}>
                <input id = {"check_" + id} 
                defaultChecked={status === 1}
                type="checkbox" 
                onChange = {changeStatus}/>
            </td>
            <td>
                <label className = {status === 1 ? "done" : ""} 
                    style={{paddingLeft: "12px"}} 
                    id= {"label_" + id} 
                    htmlFor={"check_" + id} >{productName}</label>
            </td>
            <td className={styles.cellAmount}>
                <span style= {{paddingLeft: "12px"}}>{amount}</span>
            </td>
            <td className={styles.cellButton}>
                <button type="button" name="edit" style = {buttonStyle}
                onClick = {() => onEdit(id)}>X
                </button>
            </td>
            <td className={styles.cellButton}>
                <button type="button" name="delete" style = {buttonStyle}
                onClick = {() => onDelete(id)}>X
                </button>
            </td>
        </tr>
    );
}

export default ProductRow;