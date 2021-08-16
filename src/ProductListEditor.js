import React from 'react';
import ProductTable from './ProductTable';
import AddingProduct from './AddingProduct';
import {observer} from 'mobx-react-lite';



function ProductListEditor({listInfo}){


    return (
        <div style = {{maxWidth: "900px"}} className="container">
			<h2 align="center">{listInfo.name}</h2>	
			<ProductTable/>
			<AddingProduct listId = {listInfo.id}/>
		</div>
    );
}

export default observer(ProductListEditor);