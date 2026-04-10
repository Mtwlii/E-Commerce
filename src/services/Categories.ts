import { CategoryType } from "@/interfaces/Product.interface";

export async function getAllCategories(): Promise<CategoryType[] | undefined> {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
            // cache: "force-cache",
            // with lazy loading
           

        });
        const finalRes = await res.json();
        return finalRes.data;
    } catch (error) {
        console.log(error);
    }
}