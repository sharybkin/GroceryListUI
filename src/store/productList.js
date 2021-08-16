import { makeObservable, action, observable, computed } from 'mobx';

class ProductListStore{
    lists = [
        {
            id: "588afb3c-b84b-4672-8755-2648e1efcd08",
            name: "Шашлыки"
        },
        {
            id: "fe85a3fd-c769-492b-93f0-7a19c06d73f4",
            name: "Новый год"
        },
        {
            id: "e314b223-66b0-4675-8f59-15c0b25158d0",
            name: "Ашан",
        }
    ]; 

    add = (id, name) => {
		this.lists.push({
			id, name
		})
	};

    constructor(){
        makeObservable(this,{
            lists: observable,
            add: action
        })
    }
    
}

export default new ProductListStore();