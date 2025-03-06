import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { adminDetails } from "../data/userDetails";

test.only("My Account using cookie injection", async ({ page }) => {
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password);
    const myAccount = new MyAccountPage(page);
    await myAccount.visit();
    await page.evaluate(([loginTokenInsideBrowser]) => {
        document.cookie = `token=${loginTokenInsideBrowser}`;
    }, [loginToken]);
    await myAccount.visit();
    await myAccount.waitForPageHeading();
});