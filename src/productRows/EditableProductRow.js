import React from 'react';
import PropTypes from 'prop-types';
import styles from './productRow.module.css';

EditableProductRow.propTypes = {
    id: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    onApply: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

function EditableProductRow({id, productName, amount, onApply, onCancel}){

    let newProductName;
    let newAmount;

    let setAmount = (e) => {
        newAmount =  parseFloat(e.target.value);
    }

    let setProductName = (e) => {
        newProductName =  e.target.value;
    }

    let applyChanges = () => {
        onApply(id, !(newProductName) ? productName : newProductName, 
        !(newAmount) ? amount : newAmount);
        console.log(id, "was applied");
    }

    let cancelChanges = () => {
        onCancel();
        console.log(id, "change was canceled");
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            applyChanges()
        }
    }


    let buttonStyle = {
        padding: 0,
        border: "none",
        backgroundColor: "transparent"
    }

    return (
        <tr key = {id} className="productRow" id={id}>
            <td style={{width: "2%"}}>
            </td>
            <td>
                <input defaultValue = {productName} className="form-control" autoComplete="off"
                onChange = {setProductName}
                onKeyDown = {handleKeyDown}/>
            </td>
            <td className={styles.cellAmount}>
                <input defaultValue = {amount} className="form-control" autoComplete="off"
                onChange = {setAmount}
                onKeyDown = {handleKeyDown}/>
            </td>
            <td className={styles.cellButton}>
                <button type="button" name="applyChanges" style = {buttonStyle}
                onClick = {applyChanges}>X
                </button>
            </td>
            <td className={styles.cellButton}>
                <button type="button" name="cancel" style = {buttonStyle}
                onClick = {cancelChanges}>X
                </button>
            </td>
        </tr>
    );
}

export default EditableProductRow;