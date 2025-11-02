export interface Product{
    _id?:string;
    name:string;
    slug:string;
    photos:string[];
    description:string;
    price:number;
    discount?:number;
    inStock?:boolean;
    status?:'active' | 'inactive';
    categories?:string[];

    //optional, but it is the best practice to include it
    createdAt?:string;
    updatedAt?:string;

}

//-----------product-state-------------

export interface ProductState{

    products:Product[];
    loading:boolean;
    error: string | null;
    success: string | null;
    singleProduct?:Product;
}