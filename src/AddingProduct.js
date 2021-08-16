import React, {useState} from 'react';
import PropTypes from 'prop-types';
import productListItemStore from './store/productListItem';

// AddingProduct.propTypes = {
//     listId: PropTypes.string.isRequired,
//     onAdd: PropTypes.func.isRequired
// }

function AddingProduct({listId}){

    let [productName, setProduct] = useState("");
    let [amount, setAmount] = useState("");

    let onInputProductName = (e) => {
        productName = setProduct(e.target.value);
    }

    let onInputAmount = (e) => {
        amount = setAmount(parseFloat(e.target.value));
    }

    let addProduct = () => {
        let id = "799f675d-707e-462c-8cfc-22566badb266";
        let status = 0;
        amount = !isNaN(amount) ? 1 : amount;
        productListItemStore.add(id, productName, amount, status);
        setAmount("");
        setProduct("");
        console.log("Product was added to ", listId)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addProduct();
        }
    }

    let buttonStyle = {
        padding: 0,
        border: "none",
        backgroundColor: "transparent"
    }

    return (
        <table style = {{tableLayout: "auto"}} className="table align-middle">
            <tbody>
            <tr style= {{borderBottom: "transparent"}}>
                <td></td>
                <td>
                    <input id="inputProductName" placeholder="наименование (*)" 
                        className="form-control" list="productExamples" autoComplete="off"
                        onChange = {onInputProductName}
                        value = {productName}
                        onKeyDown = {handleKeyDown}/>
                    <datalist id="productExamples"></datalist>
                </td>
                <td colSpan="2">
                    <input id="inputProductAmount" type="number" 
                        placeholder="кол-во (*)" className="form-control"
                        onChange = {onInputAmount}
                        value = {amount}
                        onKeyDown = {handleKeyDown}/>
                </td>
                <td>
                    <button type="button" onClick= {() => addProduct()}
                            name="add" style= {buttonStyle}> X
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default AddingProduct;