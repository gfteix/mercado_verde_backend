import { Category } from "../entities/category";
import { Product } from "../entities/product";
import { AppDataSource } from "./database.config";

async function seed() {
  const productRepository = AppDataSource.getRepository(Product);
  const productsCount = await productRepository.count();

  if (productsCount === 0) {
    const categories: Category[] = [];

    const frutaCategory = new Category();
    frutaCategory.name = "Frutas";
    frutaCategory.imageUrl = "frutas.png";
    categories.push(frutaCategory);

    const verduraCategory = new Category();
    verduraCategory.name = "Verduras";
    verduraCategory.imageUrl = "verduras.png";
    categories.push(verduraCategory);

    const legumesCategory = new Category();
    legumesCategory.name = "Legumes";
    legumesCategory.imageUrl = "legumes.png";
    categories.push(legumesCategory);

    const products: Product[] = [];

    const laranja = new Product();
    laranja.name = "Laranja";
    laranja.category = frutaCategory;
    laranja.imageUrl = "laranja.png";
    laranja.price = 100;

    products.push(laranja);

    const kiwi = new Product();
    kiwi.name = "Kiwi";
    kiwi.category = frutaCategory;
    kiwi.imageUrl = "kiwi.png";
    kiwi.price = 100;

    products.push(kiwi);

    await AppDataSource.getRepository(Product).save(products);
  }

  console.log("Seed finished");
}

export default seed;
