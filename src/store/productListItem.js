import { makeObservable, action, observable, computed, runInAction } from 'mobx';

class ProductListItemStore{
    products = [
        // {
        //     id: "5156fc02-c458-4903-84e5-0168ffcbae29",
        //     amount: 1.0,
        //     productName: "Мангал",
        //     status: 0
        // },
        // {
        //     id: "fe85a3fd-c769-492b-93f0-7a19c06d73f4",
        //     amount: 2.0,
        //     productName: "Шашлык",
        //     status: 1
        // },
        // {
        //     id: "e314b223-66b0-4675-8f59-15c0b25158d0",
        //     amount: 4.0,
        //     productName: "Вода",
        //     status: 1
        // }
    ];

    #alreadyLoaded = false;

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

	async delete(id){

        let product = {
            "id": id,
        }

        let uri = "http://192.168.0.121:8081/products/delete";
        try {
            let response = await fetch(uri, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            await response.json();
            runInAction(() => {
                this.products = this.products.filter(p => p.id !== id);
            });
        } catch (error) {
            console.log("Detele error:", error);
            console.log(error);
        }
        
       
    };

    getProductById = (id) => {
        return this.products.find(pr => pr.id === id);
    }
    
    listId = "";

    async loadByListId(id){
        if(this.listId !== id){
            let uri = "http://192.168.0.121:8081/products/" + id;
            let response = await fetch(uri);
            let productResponse = await response.json();
            runInAction(() => {
                this.products = productResponse;
                this.listId = id;
            });
        }   
    }

    async add(name, amount){

        let product = {
            "productName": name,
            "amount" : amount,
            "status" : 0
        }
        let uri = "http://192.168.0.121:8081/productList/" + this.listId + "/add";
        let response = await fetch(uri, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(product)
        });
        
        let newProduct = await response.json();
        runInAction(() => {
            this.products.push(newProduct);
        });
    }

    constructor(){
        makeObservable(this,{
            products: observable,
            changeStatus: action,
            changeDetails: action,
            delete: action,
            add: action,
            loadByListId: action
        })
    }
}

export default new ProductListItemStore();