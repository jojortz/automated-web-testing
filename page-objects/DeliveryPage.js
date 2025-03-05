export class DeliveryPage {
    constructor(page) {
        this.page = page

        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
        this.addressStreetInput = page.locator('[data-qa="delivery-address-street"]');
        this.addressPostcodeInput = page.locator('[data-qa="delivery-postcode"]');
        this.addressCityInput = page.locator('[data-qa="delivery-city"]');
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
    }

    fillDeliveryDetails = async () => {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill("John");

        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill("Doe");

        await this.addressStreetInput.waitFor();
        await this.addressStreetInput.fill("1 Test Street");

        await this.addressPostcodeInput.waitFor();
        await this.addressPostcodeInput.fill("TE1 1ST");

        await this.addressCityInput.waitFor();
        await this.addressCityInput.fill("Test City");

        await this.countryDropdown.waitFor();
        this.countryDropdown.selectOption("United States of America");
        
        await this.page.pause();   
    }
}