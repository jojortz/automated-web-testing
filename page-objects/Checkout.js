import { expect } from '@playwright/test';

export class Checkout {
    constructor(page) {
        this.page = page

        this.basketCards = this.page.locator('[data-qa="basket-card"]');
        this.basketItemPrice = this.page.locator('[data-qa="basket-item-price"]');
        this.basketItemRemoveButton = this.page.locator('[data-qa="basket-card-remove-item"]');
        this.continueToCheckoutButton = this.page.locator('[data-qa="continue-to-checkout"]');
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor();
        const initialBasketCount = await this.basketCards.count();

        await this.basketItemPrice.first().waitFor();

        const allPriceTexts = await this.basketItemPrice.allInnerTexts();
        const justNumbers = allPriceTexts.map((priceText) => {
            const withoutDollar = priceText.replace("$", "");
            return parseInt(withoutDollar, 10);
        });

        const smallestPrice = Math.min(...justNumbers);
        const index = justNumbers.indexOf(smallestPrice);

        const removeButton = this.basketItemRemoveButton.nth(index);
        await removeButton.waitFor();
        await removeButton.click();

        await expect(this.basketCards).toHaveCount(initialBasketCount - 1);
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor();
        await this.continueToCheckoutButton.click();
        await this.page.waitForURL(/\/login/, {timeout: 3000});
    }

}