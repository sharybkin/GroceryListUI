import React from 'react';
import ProductTable from './ProductTable';
import AddingProduct from './AddingProduct';
import {observer} from 'mobx-react-lite';
import productListStore from './store/productList';
import { useParams } from "react-router-dom";



function ProductListEditor(){
    let { listId } = useParams();

    let listInfo = productListStore.lists.find(pr => pr.id === listId);
    let listLoaded = productListStore.alreadyLoaded;
    console.log("ProductListEditor ", listInfo);

    function productListEditor(){
        return ( <div>
			<h2 align="center">{listInfo.name}</h2>	
			<ProductTable listId = {listInfo.id}/>
			<AddingProduct listId = {listInfo.id}/>
		</div>
        )
    };

    return (
        <div style = {{maxWidth: "900px"}} className="container">
			{listLoaded ? productListEditor() : ""}
		</div>
    );
}

export default observer(ProductListEditor);