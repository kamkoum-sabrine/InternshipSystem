const { By, until } = require('selenium-webdriver');

class ConventionPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://localhost:4200/#/conventionsService';

        this.firstConventionRow = By.xpath('//c-smart-table//tbody/tr[1]');

        // Ciblage du PREMIER bouton d'action dans la colonne 5
        this.validateButton = By.xpath('//c-smart-table//tbody/tr[1]/td[5]//button[1]');

        this.statusBadge = By.xpath('//c-smart-table//tbody/tr[1]//td[4]//c-badge');

        this.swalConfirmButton = By.css('.swal2-confirm');
        this.swalContainer = By.css('.swal2-container');
    }

    async load() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.firstConventionRow), 10000);
        await this.driver.sleep(1000);
    }

    async getCurrentStatus() {
        const badgeElement = await this.driver.findElement(this.statusBadge);
        return await badgeElement.getText();
    }

    async validateConvention() {
        console.log('Tentative de validation de la première convention (clic sur le bouton vert)...');

        // --- NETTOYAGE (Correction ElementClickInterceptedError) ---
        // Tenter de fermer un éventuel pop-up de notification ou d'erreur résiduel
        try {
            const residualConfirm = await this.driver.findElement(this.swalConfirmButton);
            if (await residualConfirm.isDisplayed()) {
                console.log("Fermeture d'un pop-up SweetAlert résiduel (clic sur Confirmer/OK).");
                await residualConfirm.click();
                await this.driver.sleep(1000); // Laisse le temps à l'élément de disparaître
            }
        } catch (e) {
            // L'élément n'existe pas ou n'est pas visible, c'est ce qu'on veut.
        }
        // --------------------------------------------------------

        // 1. Attendre que le bouton soit localisé
        const button = await this.driver.wait(
            until.elementLocated(this.validateButton),
            5000,
            "Le bouton de validation n'a pas été trouvé (XPath: //c-smart-table//tbody/tr[1]/td[5]//button[1])."
        );

        // 2. Attendre que le bouton soit visible
        await this.driver.wait(
            until.elementIsVisible(button),
            5000,
            "Le bouton de validation n'est pas visible/interactable."
        );

        // Clic sur le bouton de validation (✅)
        await button.click();

        // --- GESTION DU POP-UP SWEETALERT2 DE CONFIRMATION ---
        console.log('Pop-up de confirmation SweetAlert détecté. Clic sur Valider...');

        // 3. Attendre que le bouton de confirmation du pop-up soit cliquable
        await this.driver.wait(until.elementLocated(this.swalConfirmButton), 5000);

        // 4. Cliquer sur le bouton "Valider" du pop-up
        await this.driver.findElement(this.swalConfirmButton).click();

        // 5. Attendre la disparition du pop-up de succès/échec.
        await this.driver.sleep(3000);
    }
}

module.exports = ConventionPage;