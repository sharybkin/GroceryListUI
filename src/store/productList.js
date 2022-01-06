import { makeObservable, action, observable, computed, runInAction } from 'mobx';
import axios from 'axios';

class ProductListStore{
    lists = [
        // {
        //     id: "588afb3c-b84b-4672-8755-2648e1efcd08",
        //     name: "Шашлыки"
        // },
        // {
        //     id: "fe85a3fd-c769-492b-93f0-7a19c06d73f4",
        //     name: "Новый год"
        // },
        // {
        //     id: "e314b223-66b0-4675-8f59-15c0b25158d0",
        //     name: "Ашан",
        // }

        {
            id: "e314b223-66b0-4675-8f59-15c0b25158d0",
            name: "",
        }
    ];

    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDE0OTYzMjAsImlhdCI6MTY0MTQ1MzEyMCwidXNlcklkIjoiOWI5NjM2NDAtMDgxMy00OWVmLWIzY2UtMTQ4MDE0ZDllNmNlIn0.OAlsi0Z9EvC6rM3yItOS4fU7WS6gBMhyo-GjxPYuXiM";

    add = (id, name) => {
		this.lists.push({
			id, name
		})
	};

    existsById = (id) => {
        return this.lists.some(li => li.id === id);

        for(var i = 0; i < this.lists.length; i++) {
            if (lists[i].id === id) {
                return true;
            }
        }
        return false;
    }

    getById = (id) => {

        let listById = this.lists.find(pr => pr.id === id);
        return listById;
    }

    alreadyLoaded = false;

    async load(){
        if(!this.alreadyLoaded){
                       
            // const bodyParameters = {
            //    key: "value"
            // };

            const config = {
                headers: { "Authorization": `Bearer ${this.token}` },
                mode: 'cors'
            };
            
            axios.get( 
              'http://localhost:8020/api/list',
              config
            ).then(res => {
                let productList = res.data;

                console.log(productList)

                runInAction(() => {
                    this.lists = productList;
                    this.alreadyLoaded = true;
                    console.log("Загрузил");
                }); 
              }).catch(console.log);

            // let response = await fetch('http://localhost:8081/api/list', {
            //     headers: new Headers({
            //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzk3OTA0MzcsImlhdCI6MTYzOTc0NzIzNywidXNlcklkIjoiOWI5NjM2NDAtMDgxMy00OWVmLWIzY2UtMTQ4MDE0ZDllNmNlIn0.qoQMlRMHWc5hvryrtOKcGPKolfITz23bRoPYYv9Idxk',
            //       'Content-Type': 'application/json'
            //     }),
            //     mode: 'no-cors'
            //   });

            // console.log(response)

            //let productList = await response.json();
            
            // runInAction(() => {
            //     this.lists = productList
            //     this.alreadyLoaded = true;
            //     console.log("Загрузил");
            // });
        }
    }

    constructor(){
        makeObservable(this,{
            lists: observable,
            alreadyLoaded: observable,
            add: action,
            existsById: action,
            load: action,
            getById: action
        })
    }

}

export default new ProductListStore();