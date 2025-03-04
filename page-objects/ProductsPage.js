import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";

export class ProductsPage {

    constructor(page) {
        this.page = page

        this.addButtons = this.page.locator('[data-qa="product-button"]')
    }

    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const thisAddCuttom = this.addButtons.nth(index)
        thisAddCuttom.waitFor();
        await expect(thisAddCuttom).toHaveText("Add to Basket");
        const navigation = new Navigation(this.page);
        const basketCountBefore = await navigation.getBasketCount();
        thisAddCuttom.click();
        await expect(thisAddCuttom).toHaveText("Remove from Basket");
        const basketCountAfter = await navigation.getBasketCount();
        expect(basketCountAfter).toBe(basketCountBefore + 1);
    }
}