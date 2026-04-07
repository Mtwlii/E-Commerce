import { ProductType } from "@/interfaces/Product.interface";

export async function getAllProducts(): Promise<ProductType[] | undefined> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
      cache: "force-cache",
    });
    const finalRes = await res.json();

    return finalRes.data;
  } catch (error) {
    console.log(error);
  }
}

// https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b

export async function getSingleProduct(
  id: string,
): Promise<ProductType | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      {
        cache: "force-cache",
        // next: { revalidate: 60, tags: ["product"] },
      },
    );
    const finalRes = await res.json();
    // console.log(finalRes.data);
    return finalRes.data;
  } catch (error) {
    console.log(error);
  }
}
