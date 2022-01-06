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
        let value = parseFloat(e.target.value);
        
        value = isNaN(value) ? "" : value;
        setAmount(value);
    }

    let addProduct = () => {
        console.log(amount);
        amount = amount == "" ? 1 : amount;
        productListItemStore.add(productName, amount);
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