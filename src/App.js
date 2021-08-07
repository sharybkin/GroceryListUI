import React, {useState, useEffect} from 'react';
import ProductTable from './ProductTable';
import AddingProduct from './AddingProduct';

const listId = '588afb3c-b84b-4672-8755-2648e1efcd08';
	const productFromServer = [
		{
			id: "5156fc02-c458-4903-84e5-0168ffcbae29",
			amount: 1.0,
			productName: "Мангал",
			status: 0
		},
		{
			id: "fe85a3fd-c769-492b-93f0-7a19c06d73f4",
			amount: 2.0,
			productName: "Шашлык",
			status: 1
		},
		{
			id: "e314b223-66b0-4675-8f59-15c0b25158d0",
			amount: 4.0,
			productName: "Вода",
			status: 1
		}
	];

function App(){

	let [products, setProducts] = useState(productFromServer);

	useEffect(() => {
        //console.log("Подписчик на изменения products")
    }, [products])

	let onChangeStatus = (id, status) => {
        setProducts(products.map(pr => pr.id !== id ? pr : {
            ...pr, 
            status
        }));
    }

	let onChangeDetails = (id, productName, amount) => {
        setProducts(products.map(pr => pr.id !== id ? pr : {
            ...pr, 
            productName, amount
        }));
    }

	let onDelete = (pr_id) => {
        console.log("onDelete");
        let newProducts = products.filter(p => p.id !== pr_id);
        setProducts(newProducts);
    }

	let onAdd = (id, productName, amount, status) => {
		products.push({
			id, amount, productName, status
		})
		setProducts(products.map(pr => pr));
	}

	return (
	<div>
		<header>
		</header>
		<main>
		<div style = {{maxWidth: "900px"}} className="container">
			<h2 align="center" style = {{ marginTop: "40px"}}>Список товаров</h2>	
			<ProductTable 
				products = {products}
				onChangeStatus = {onChangeStatus}
				onApplyChange = {onChangeDetails}
				onDelete = {onDelete}/>
			<AddingProduct listId = {listId} onAdd ={onAdd} />
		</div>
		</main>
		<footer>
		</footer>
	</div>
	);
}

export default App;