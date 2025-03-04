import { expect } from "@playwright/test";

export class ProductsPage {

    constructor(page) {
        this.page = page

        this.addButtons = this.page.locator('[data-qa="product-button"]')
        this.basketCounter = this.page.locator('[data-qa="header-basket-count"]')
    }

    visit = async () => {
        await this.page.goto("/")
    }

    getBasketCount = async () => {
        this.basketCounter.waitFor();
        const text = await this.basketCounter.innerText();
        return parseInt(text, 10);
    }

    addProductToBasket = async (index) => {
        const thisAddCuttom = this.addButtons.nth(index)
        thisAddCuttom.waitFor();
        await expect(thisAddCuttom).toHaveText("Add to Basket");
        const basketCountBefore = await this.getBasketCount();
        thisAddCuttom.click();
        await expect(thisAddCuttom).toHaveText("Remove from Basket");
        const basketCountAfter = await this.getBasketCount();
        expect(basketCountAfter).toBe(basketCountBefore + 1);
    }
}