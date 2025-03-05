import { expect } from '@playwright/test';

export class PaymentPage {
    constructor(page) {
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
        this.discountInput = page.locator('[data-qa="discount-code-input"]');
        this.submitDiscountButton = page.locator('[data-qa="submit-discount-button"]');
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]');
        this.totalValue = page.locator('[data-qa="total-value"]');
        this.totalWithDiscount = page.locator('[data-qa="total-with-discount-value"]');
        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]');
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]');
        this.creditCardExpiryInput = page.locator('[data-qa="valid-until"]');
        this.creditCardCvcInput = page.locator('[data-qa="credit-card-cvc"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
    }

    _getIntFromInnerText = async (locator) => {
        const textValue = await locator.innerText();
        return parseInt(textValue.replace(/[^0-9]/g, ''), 10);
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor();
        const discountCode = await this.discountCode.innerText();
        await this.discountInput.waitFor();

        await this.discountInput.fill(discountCode);
        await expect(this.discountInput).toHaveValue(discountCode);

        //Option 2 for laggy inputs: slow typing
        // await this.discountInput.focus();
        // await this.page.keyboard.type(discountCode, { delay: 1000 });
        // expect(await this.discountInput.inputValue()).toBe(discountCode);

        expect(await this.discountActiveMessage.isVisible()).toBe(false);
        expect(await this.totalWithDiscount.isVisible()).toBe(false);

        await this.submitDiscountButton.waitFor();
        await this.submitDiscountButton.click();

        await this.discountActiveMessage.waitFor();
        await expect(this.discountActiveMessage).toHaveText("Discount activated!");

        await this.totalValue.waitFor();
        const totalValueInt = await this._getIntFromInnerText(this.totalValue);
        await this.totalWithDiscount.waitFor();
        const totalWithDiscountInt = await this._getIntFromInnerText(this.totalWithDiscount);
        expect(totalValueInt).toBeGreaterThan(totalWithDiscountInt);
    }

    fillPaymentDetails = async (paymentDetails) => {
        await this.creditCardOwnerInput.waitFor();
        await this.creditCardOwnerInput.fill(paymentDetails.owner);
        await this.creditCardNumberInput.waitFor();
        await this.creditCardNumberInput.fill(paymentDetails.number);
        await this.creditCardExpiryInput.waitFor();
        await this.creditCardExpiryInput.fill(paymentDetails.validUntil);
        await this.creditCardCvcInput.waitFor();
        await this.creditCardCvcInput.fill(paymentDetails.cvc);
    }

    completePayment = async () => {
        await this.payButton.waitFor();
        await this.payButton.click();
        await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
    }
}