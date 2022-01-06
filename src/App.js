import React from 'react';
import ProductListEditor from './ProductListEditor';
import Navigation from './Navigation';
import Container from '../node_modules/react-bootstrap/esm/Container';
import productListStore from './store/productList';


import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

function App(){

   let listExists = true;

	return (
	<Router>
		<div>
			<header>
				<Navigation/>
			</header>
			<main>
				{!listExists && 
				<Container style = {{marginTop: "70px"}}>
					<h2 class="text-danger">List not found</h2>
				</Container>}
				{listExists && 
				<Container style = {{marginTop: "70px"}}>
					<Route path = {"/list/:listId"} exact = {true}>
						<ProductListEditor/>
					</Route>
				</Container>}
			</main>
			<footer>
			</footer>
		</div>
	</Router>
	);
}

export default App;