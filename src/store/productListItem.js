import { makeObservable, action, observable, computed } from 'mobx';

class ProductListItemStore{
    products = [
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

    changeStatus = (id, status) => {
        this.products = this.products.map(pr => pr.id !== id ? pr : {
            ...pr, 
            status
        });
    };

    changeDetails = (id, productName, amount) => {
        this.products = this.products.map(pr => pr.id !== id ? pr : {
            ...pr, 
            productName, amount
        });
    };

	delete = (id) => {
        this.products = this.products.filter(p => p.id !== id);
    };

	add = (id, productName, amount, status) => {
		this.products.push({
			id, amount, productName, status
		})
	};

    getProductById = (id) => {
        return this.products.find(pr => pr.id === id);
    }

    constructor(){
        makeObservable(this,{
            products: observable,
            changeStatus: action,
            changeDetails: action,
            delete: action,
            add: action
        })
    }
}

export default new ProductListItemStore();