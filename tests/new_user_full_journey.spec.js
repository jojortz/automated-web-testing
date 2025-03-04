import {test, expect} from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";

test.only("New User Full End-to-End test Journey", async ({page}) => {
    const productsPage = new ProductsPage(page);
    await productsPage.visit();
    await productsPage.addProductToBasket(0);
    await productsPage.addProductToBasket(1);
    await productsPage.addProductToBasket(2);
    await page.pause();
});