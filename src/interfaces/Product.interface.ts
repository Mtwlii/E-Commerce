export interface ProductType {
  id: number,
  title: string,
  description: string,
  imageCover: string,
  price: number,
  discountPercentage: number,
  ratingsAverage: number,
  stock: number,
  thumbnail: string,
  images: string[],
  ratingsQuantity: number,
  priceAfterDiscount?: number,
  brand: BrandType,
  category: CategoryType,
  subcategor: SubcategoryType[]
}


export interface CategoryType {
  _id: number,
  name: string,
  slug: string,
  image: string,
}


export interface BrandType {
  _id: number,
  name: string,
  slug: string,
  image: string,
}


export interface SubcategoryType { 
  _id:string,
  slug:string,
  name:string,
  category:string,

}

