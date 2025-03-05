import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";

export class ProductsPage {

    constructor(page) {
        this.page = page

        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitles = page.locator('[data-qa="product-title"]')
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

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor();
        await this.productTitles.first().waitFor();
        const unsortedTitles = await this.productTitles.allInnerTexts();
        await this.sortDropdown.selectOption("price-asc");
        const sortedTitles = await this.productTitles.allInnerTexts();
        expect(sortedTitles).not.toEqual(unsortedTitles);
    }
}