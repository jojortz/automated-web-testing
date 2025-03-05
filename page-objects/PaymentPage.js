import { expect } from '@playwright/test';

export class PaymentPage {
    constructor(page) {
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
        this.discountInput = page.locator('[data-qa="discount-code-input"]');

    }

    activateDiscount = async () => {
        // Add your code here
        await this.discountCode.waitFor();
        const discountCode = await this.discountCode.innerText();
        await this.discountInput.waitFor();
        await this.discountInput.fill(discountCode);
        await expect(this.discountInput).toHaveValue(discountCode);
    }
}