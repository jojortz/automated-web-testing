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
        
        await this.page.pause();   
    }
}