const { By, until, Key } = require('selenium-webdriver');

class EntreprisePage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://localhost:4200/#/entreprises'; // URL de la gestion des entreprises

        // Sélecteurs de la page de liste
        this.addButton = By.xpath("//button[contains(., 'Ajouter une entreprise')]");

        // Sélecteurs du formulaire dans la modale (basés sur les IDs ou les noms dans le template)
        // NOTE: Le template utilise ngModel sans ID/class spécifique. On cible par le label ou la position.

        // Tentative de ciblage par le label parent ou l'ordre des inputs dans la modale:
        this.modalTitle = By.xpath("//div[@class='modal-content']/h3[contains(text(), 'Ajouter une entreprise')]");

        // Input 1: Nom (premier input text)
        this.nomField = By.xpath("//form//label[contains(text(), 'Nom:')]/following-sibling::input[1]");

        // Input 2: Adresse
        this.adresseField = By.xpath("//form//label[contains(text(), 'Adresse:')]/following-sibling::input[1]");

        // Input 3: Email
        this.emailField = By.xpath("//form//label[contains(text(), 'Email:')]/following-sibling::input[1]");

        // Input 4: Téléphone
        this.telephoneField = By.xpath("//form//label[contains(text(), 'Téléphone:')]/following-sibling::input[1]");

        // Bouton de soumission dans la modale
        this.submitButton = By.xpath("//div[@class='modal-actions']/button[contains(., 'Ajouter')]");

        // Bouton d'annulation dans la modale
        this.cancelButton = By.xpath("//div[@class='modal-actions']/button[contains(., 'Annuler')]");

        // Sélecteur pour vérifier la présence dans le tableau (par nom)
        this.entrepriseRowByName = (name) => By.xpath(`//c-smart-table//tbody//tr//td[contains(text(), '${name}')]`);

    }

    async load() {
        await this.driver.get(this.url);
        // Attente que le bouton d'ajout soit visible après navigation
        await this.driver.wait(until.elementLocated(this.addButton), 10000);
    }

    async openCreateModal() {
        console.log('Clic sur "Ajouter une entreprise" pour ouvrir la modale...');
        await this.driver.findElement(this.addButton).click();

        // Attendre que la modale soit visible et le titre présent
        await this.driver.wait(until.elementLocated(this.modalTitle), 10000);
        // Attendre que le champ 'Nom' soit visible dans la modale
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.nomField)), 5000);
    }

    async createEntreprise(data) {
        // 1. Remplir les champs
        await this.driver.findElement(this.nomField).sendKeys(data.nom);
        await this.driver.findElement(this.adresseField).sendKeys(data.adresse);
        await this.driver.findElement(this.emailField).sendKeys(data.email);
        await this.driver.findElement(this.telephoneField).sendKeys(data.telephone);

        // Attendre un instant pour la validation Angular (si applicable)
        await this.driver.sleep(500);

        // 2. Soumission
        console.log('Soumission du formulaire de création d\'entreprise...');
        await this.driver.findElement(this.submitButton).click();

        // Après la soumission réussie, la modale devrait se fermer.
        // Attendre que le bouton d'ajout redevienne visible (ou que la modale disparaisse)
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.addButton)), 10000);
    }

    async checkEntrepriseExists(name) {
        const locator = this.entrepriseRowByName(name);
        try {
            await this.driver.wait(until.elementLocated(locator), 5000);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = EntreprisePage;