import { expect } from '@playwright/test';

export class DeliveryPage {
    constructor(page) {
        this.page = page

        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
        this.addressStreetInput = page.locator('[data-qa="delivery-address-street"]');
        this.addressPostcodeInput = page.locator('[data-qa="delivery-postcode"]');
        this.addressCityInput = page.locator('[data-qa="delivery-city"]');
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' });
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]');
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]');
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]');
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
        this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]');
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]');
        this.goToPaymentButton = page.getByRole('button', { name: 'Continue to payment' });
    }

    fillDeliveryDetails = async (deliveryDetails) => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(deliveryDetails.firstName);

        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(deliveryDetails.lastName);

        await this.addressStreetInput.waitFor();
        await this.addressStreetInput.fill(deliveryDetails.addressStreet);

        await this.addressPostcodeInput.waitFor();
        await this.addressPostcodeInput.fill(deliveryDetails.addressPostcode);

        await this.addressCityInput.waitFor();
        await this.addressCityInput.fill(deliveryDetails.addressCity);

        await this.countryDropdown.waitFor();
        this.countryDropdown.selectOption(deliveryDetails.country);
    }

    saveDetails = async () => {
        const initialSavedAddressCount = await this.savedAddressContainer.count();
        await this.saveAddressButton.waitFor();
        await this.saveAddressButton.click();
        await expect(this.savedAddressContainer).toHaveCount(initialSavedAddressCount + 1);

        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue());
        await this.savedAddressLastName.first().waitFor()
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue());
        await this.savedAddressStreet.first().waitFor()
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.addressStreetInput.inputValue());
        await this.savedAddressCity.first().waitFor()
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.addressCityInput.inputValue());
        await this.savedAddressPostcode.first().waitFor()
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.addressPostcodeInput.inputValue());
        await this.savedAddressCountry.first().waitFor()
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue());
    }

    goToPayment = async () => {
        await this.goToPaymentButton.waitFor();
        await this.goToPaymentButton.click();
        await this.page.waitForURL(/\/payment/, { timeout: 3000 });
    };
}