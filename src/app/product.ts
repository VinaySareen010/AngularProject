

export class Product {
    id:any;
    title:any;
    description:any;
    price:any;
    image:any;
    subCategoryId:any;
    ratingAvg:any;
    constructor()
    {
        this.id=null;
        this.title=null;
        this.description=null;
        this.price=null;
        this.image=null;
        this.subCategoryId=null;
        this.ratingAvg=null;
    }
}
export class rating
{
    productId:any;
    ratingAvg:any;
    constructor()
    {
        this.productId=null;
        this.ratingAvg=null;
    }
}
