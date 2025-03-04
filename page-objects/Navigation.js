export class Navigation {
    constructor(page) {
        this.page = page

        this.basketCounter = this.page.locator('[data-qa="header-basket-count"]');
        this.checkoutLink = this.page.getByRole('link', { name: 'Checkout' });

    }

    getBasketCount = async () => {
        this.basketCounter.waitFor();
        const text = await this.basketCounter.innerText();
        return parseInt(text, 10);
    }

    goToCheckout = async () => {
        this.checkoutLink.waitFor();
        await this.checkoutLink.click();
        await this.page.waitForURL("/basket");
    }
}