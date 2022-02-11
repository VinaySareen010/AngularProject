import { analyzeAndValidateNgModules } from "@angular/compiler";

export class Product {
    id:any;
    title:any;
    description:any;
    price:any;
    image:any;
    subCategoryId:any;
    constructor()
    {
        this.id=null;
        this.title=null;
        this.description=null;
        this.price=null;
        this.image=null;
        this.subCategoryId=null;
    }
}
