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

	let productLists = productListStore.lists.map((pl) => (
		<Route key = {pl.id} path = {"/list/" + pl.id} exact = {true}>
			<ProductListEditor listInfo = {pl}/>
		</Route>
   ));

	return (
	<Router>
		<div>
			<header>
				<Navigation/>
			</header>
			<main>
				<span>Path : {location.pathname}</span>
				<Container style = {{marginTop: "70px"}}>
					{productLists}
				</Container>
			</main>
			<footer>
			</footer>
		</div>
	</Router>
	);
}

export default App;