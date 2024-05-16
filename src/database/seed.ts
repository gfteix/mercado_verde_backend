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
    frutaCategory.imageUrl = "frutas.jpg";
    categories.push(frutaCategory);

    const verduraCategory = new Category();
    verduraCategory.name = "Verduras";
    verduraCategory.imageUrl = "verduras.jpg";
    categories.push(verduraCategory);

    const legumesCategory = new Category();
    legumesCategory.name = "Legumes";
    legumesCategory.imageUrl = "legumes.jpg";
    categories.push(legumesCategory);

    const products: Product[] = [];

    const laranja = new Product();
    laranja.name = "Laranja";
    laranja.category = frutaCategory;
    laranja.imageUrl = "laranja.jpg";
    laranja.price = 100;

    products.push(laranja);

    const kiwi = new Product();
    kiwi.name = "Kiwi";
    kiwi.category = frutaCategory;
    kiwi.imageUrl = "kiwi.jpg";
    kiwi.price = 200;

    products.push(kiwi);

    const limaoSiciliano = new Product();
    limaoSiciliano.name = "Limão Siciliano";
    limaoSiciliano.category = frutaCategory;
    limaoSiciliano.imageUrl = "limao_siciliano.jpg";
    limaoSiciliano.price = 430;

    products.push(limaoSiciliano);

    const pimentao = new Product();
    pimentao.name = "Pimentão";
    pimentao.category = legumesCategory;
    pimentao.imageUrl = "pimentao.jpg";
    pimentao.price = 550;

    products.push(pimentao);

    const alface = new Product();
    alface.name = "Alface";
    alface.category = verduraCategory;
    alface.imageUrl = "alface.jpg";
    alface.price = 200;

    products.push(alface);

    const cebola = new Product();
    cebola.name = "Cebola";
    cebola.category = legumesCategory;
    cebola.imageUrl = "cebola.jpg";
    cebola.price = 330;

    products.push(cebola);

    await AppDataSource.getRepository(Product).save(products);
  }

  console.log("Seed finished");
}

export default seed;
