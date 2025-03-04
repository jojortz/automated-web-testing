import {test, expect} from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductPage";

test.only("New User Full End-to-End test Journey", async ({page}) => {
    const productsPage = new ProductsPage(page);
    await productsPage.visit();
    await page.pause();
});