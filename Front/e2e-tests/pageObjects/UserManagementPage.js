const { By, until, Key } = require('selenium-webdriver');

class UserManagementPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://localhost:4200/#/utilisateurs';

        // Sélecteurs d'interaction
        this.firstUserDetailsButton = By.xpath('//c-smart-table//tbody/tr[1]//button[contains(text(), "Détails")]');
        this.toggleActionButton = By.xpath('//div[contains(@class, "card-body")]//button[contains(text(), "compte")]');
        this.firstUserStatusBadge = By.xpath('//c-smart-table//tbody/tr[1]//c-badge');

        // Sélecteurs SweetAlert2
        this.swalConfirmButton = By.css('.swal2-confirm');
        this.swalContainer = By.css('.swal2-container');
    }

    async load() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.firstUserDetailsButton), 10000);
    }

    async toggleDetails(rowIndex = 1) {
        console.log(`Ouverture des détails de l'utilisateur à la ligne ${rowIndex}...`);

        const detailsButton = By.xpath(`//c-smart-table//tbody/tr[${rowIndex}]//button[contains(text(), "Détails")]`);

        await this.driver.findElement(detailsButton).click();

        // 1. Localiser l'élément bouton d'action pour obtenir l'objet WebElement
        const toggleButtonElement = await this.driver.findElement(this.toggleActionButton);

        // 2. Attendre que le bouton soit VISIBLE (résout l'erreur ElementNotInteractableError)
        await this.driver.wait(
            until.elementIsVisible(toggleButtonElement),
            7000,
            "Le bouton d'activation/désactivation n'est pas devenu visible (après clic sur Détails)."
        );
    }

    async getCurrentStatus(rowIndex = 1) {
        const badgeLocator = By.xpath(`//c-smart-table//tbody/tr[${rowIndex}]//c-badge`);
        const badgeElement = await this.driver.findElement(badgeLocator);
        return await badgeElement.getText();
    }

    async changeAccountState() {

        const buttonElement = await this.driver.findElement(this.toggleActionButton);

        // Attendre que le texte du bouton soit chargé
        await this.driver.wait(async () => {
            const text = await buttonElement.getText();
            return text.includes('compte');
        }, 5000, "Le texte 'compte' n'est pas apparu sur le bouton d'action.");

        const buttonTextBefore = await buttonElement.getText();
        console.log(`Statut avant clic (texte du bouton): ${buttonTextBefore}`);

        // Clic initial qui déclenche le pop-up
        await buttonElement.click();

        // --- GESTION DU POP-UP SWEETALERT2 ---
        console.log('Pop-up de confirmation SweetAlert détecté. Clic sur Confirmer...');

        // 1. Attendre que le bouton de confirmation soit cliquable
        await this.driver.wait(until.elementLocated(this.swalConfirmButton), 5000);

        // 2. Cliquer sur le bouton de confirmation
        await this.driver.findElement(this.swalConfirmButton).click();

        // 3. Attendre la disparition du pop-up de succès/échec qui suit.
        await this.driver.sleep(3000);


        // Attendre la fin de l'API et la mise à jour du DOM
        await this.driver.sleep(3000);

        const buttonTextAfter = await this.driver.findElement(this.toggleActionButton).getText();
        console.log(`Statut après clic (texte du bouton): ${buttonTextAfter}`);

        return { before: buttonTextBefore, after: buttonTextAfter };
    }
}

module.exports = UserManagementPage;