import { Repository } from "typeorm";
import { Category } from "../entities/category";
import { Product } from "../entities/product";
import { AppDataSource } from "./database.config";
import * as fs from "fs";
import * as path from "path";

async function seed() {
  const productRepository = AppDataSource.getRepository(Product);
  const categoryRepository = AppDataSource.getRepository(Category);

  const productsCount = await productRepository.count();
  const categoriesCount = await categoryRepository.count();

  if (categoriesCount === 0) {
    await insertCategories(categoryRepository);
  }

  if (productsCount === 0) {
    const categories = await categoryRepository.find();
    await insertInitialProducts(categories, productRepository);
  }

  console.log("Seed finished");
}

async function insertInitialProducts(
  categories: Category[],
  repository: Repository<Product>,
) {
  let frutaCategoryId = "";
  let legumesCategoryId = "";
  let verdurasCategoryId = "";

  categories.forEach((category) => {
    if (category.name === "Frutas") {
      frutaCategoryId = category.id;
    }

    if (category.name === "Legumes") {
      legumesCategoryId = category.id;
    }

    if (category.name === "Verduras") {
      verdurasCategoryId = category.id;
    }
  });

  const products: Product[] = [];

  const laranja = new Product();
  laranja.name = "Laranja";
  laranja.categoryId = frutaCategoryId;
  const laranjaImagePath = path.resolve(__dirname, "../assets/laranja.jpg");
  const laranjaImage = fs.readFileSync(laranjaImagePath);
  laranja.image = laranjaImage;
  laranja.price = 100;

  products.push(laranja);

  const kiwi = new Product();
  kiwi.name = "Kiwi";
  kiwi.categoryId = frutaCategoryId;
  const kiwiImagePath = path.resolve(__dirname, "../assets/kiwi.jpg");
  const kiwiImage = fs.readFileSync(kiwiImagePath);
  kiwi.image = kiwiImage;
  kiwi.price = 200;

  products.push(kiwi);

  const limaoSiciliano = new Product();
  limaoSiciliano.name = "Limão Siciliano";
  limaoSiciliano.categoryId = frutaCategoryId;
  const limaoSicilianoImagePath = path.resolve(
    __dirname,
    "../assets/limao_siciliano.jpg",
  );
  const limaoSicilianoImage = fs.readFileSync(limaoSicilianoImagePath);
  limaoSiciliano.image = limaoSicilianoImage;
  limaoSiciliano.price = 430;

  products.push(limaoSiciliano);

  const pimentao = new Product();
  pimentao.name = "Pimentão";
  pimentao.categoryId = legumesCategoryId;
  const pimentaoImagePath = path.resolve(__dirname, "../assets/pimentao.jpg");
  const pimentaoImage = fs.readFileSync(pimentaoImagePath);
  pimentao.image = pimentaoImage;
  pimentao.price = 550;

  products.push(pimentao);

  const alface = new Product();
  alface.name = "Alface";
  alface.categoryId = verdurasCategoryId;
  const alfaceImagePath = path.resolve(__dirname, "../assets/alface.jpg");
  const alfaceImage = fs.readFileSync(alfaceImagePath);
  alface.image = alfaceImage;
  alface.price = 200;

  products.push(alface);

  const cebola = new Product();
  cebola.name = "Cebola";
  cebola.categoryId = legumesCategoryId;
  const cebolaImagePath = path.resolve(__dirname, "../assets/cebola.jpg");
  const cebolaImage = fs.readFileSync(cebolaImagePath);
  cebola.image = cebolaImage;
  cebola.price = 330;

  products.push(cebola);

  await repository.save(products);
}

async function insertCategories(repository: Repository<Category>) {
  // categories without products
  const categories: Category[] = [];

  const frutaCategory = new Category();
  frutaCategory.name = "Frutas";
  const frutasImagePath = path.resolve(__dirname, "../assets/frutas.jpg");
  const frutasImage = fs.readFileSync(frutasImagePath);
  frutaCategory.image = frutasImage;

  categories.push(frutaCategory);

  const verduraCategory = new Category();
  verduraCategory.name = "Verduras";
  const verdurasImagePath = path.resolve(__dirname, "../assets/verduras.jpg");
  const verdurasImage = fs.readFileSync(verdurasImagePath);
  verduraCategory.image = verdurasImage;

  categories.push(verduraCategory);

  const legumesCategory = new Category();
  legumesCategory.name = "Legumes";
  const legumesImagePath = path.resolve(__dirname, "../assets/legumes.jpg");
  const legumesImage = fs.readFileSync(legumesImagePath);
  legumesCategory.image = legumesImage;

  categories.push(legumesCategory);

  const caulesCategory = new Category();
  caulesCategory.name = "Caules";
  const caulesImagePath = path.resolve(__dirname, "../assets/caules.jpg");
  const caulesImage = fs.readFileSync(caulesImagePath);
  caulesCategory.image = caulesImage;

  categories.push(caulesCategory);

  const floresCategory = new Category();
  floresCategory.name = "Flores";
  const floresImagePath = path.resolve(__dirname, "../assets/flores.jpg");
  const floresImage = fs.readFileSync(floresImagePath);
  floresCategory.image = floresImage;

  categories.push(floresCategory);

  const tuberculosCategory = new Category();
  tuberculosCategory.name = "Tuberculos";
  const tuberculosImagePath = path.resolve(
    __dirname,
    "../assets/tuberculos.jpg",
  );
  const tuberculosImage = fs.readFileSync(tuberculosImagePath);
  tuberculosCategory.image = tuberculosImage;

  categories.push(tuberculosCategory);

  await repository.save(categories);
}

export default seed;
