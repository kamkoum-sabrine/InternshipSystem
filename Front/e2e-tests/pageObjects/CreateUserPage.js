const { By, until, Key } = require('selenium-webdriver');

class CreateUserPage {
    constructor(driver) {
        this.driver = driver;

        // La page de liste est la page de départ pour l'action de création
        this.urlListeUtilisateurs = 'http://localhost:4200/#/utilisateurs';

        // Bouton pour ouvrir le formulaire (basé sur le texte)
        this.addButton = By.xpath("//button[contains(., 'Ajouter un utilisateur')]");

        // Champs de Saisie du Formulaire (basés sur les IDs)
        this.nomField = By.css('input#nom');
        this.prenomField = By.css('input#prenom');
        this.cinField = By.css('input#cin');
        this.emailField = By.css('input#email');

        // Dropdowns (Listes Déroulantes)
        this.roleDropdown = By.id('role');
        this.filiereDropdown = By.id('filiere');
        this.niveauDropdown = By.id('niveau');

        // Bouton Soumettre du formulaire de création
        this.submitButton = By.css('button[type="submit"]');
    }

    async loadList() {
        // Navigue vers la page de liste des utilisateurs après la connexion
        await this.driver.get(this.urlListeUtilisateurs);

        // Attente explicite que le bouton "Ajouter un utilisateur" soit visible
        await this.driver.wait(until.elementLocated(this.addButton), 10000);
    }

    async openCreateForm() {
        console.log('Clic sur "Ajouter un utilisateur" pour ouvrir le formulaire...');
        await this.driver.findElement(this.addButton).click();

        // Attendre que le premier champ du formulaire ('nom') soit visible dans la modale/nouvelle page
        await this.driver.wait(until.elementLocated(this.nomField), 10000);
    }

    async selectOptionByValue(dropdownLocator, value) {

        // 1. Attendre l'élément SELECT lui-même
        await this.driver.wait(until.elementLocated(dropdownLocator), 5000);

        const dropdownElement = await this.driver.findElement(dropdownLocator);

        // 2. Cliquer sur le SELECT pour l'ouvrir
        await dropdownElement.click();

        // 3. Envoyer la valeur directement au select. 
        // NOTE: Ceci fonctionne si le 'value' est le texte affiché, sinon cela sélectionne la valeur de l'attribut 'value'.
        await dropdownElement.sendKeys(value);

        // 4. (Optionnel) Appuyer sur Entrée pour confirmer la sélection si nécessaire
        await dropdownElement.sendKeys(Key.ENTER);
    }

    /**
     * Crée un utilisateur complet (Tuteur, Administrateur, ou Étudiant)
     */
    async createUser(userData) {
        // 1. Remplir les champs communs
        await this.driver.findElement(this.nomField).sendKeys(userData.nom);
        await this.driver.findElement(this.prenomField).sendKeys(userData.prenom);
        await this.driver.findElement(this.cinField).sendKeys(userData.cin);
        await this.driver.findElement(this.emailField).sendKeys(userData.email);

        // 2. Sélection du Rôle
        await this.selectOptionByValue(this.roleDropdown, userData.role);

        // 3. Remplissage des champs spécifiques à l'ÉTUDIANT (si le rôle est sélectionné)
        if (userData.role === 'ETUDIANT') {
            // Ces champs n'apparaissent que si ETUDIANT est sélectionné, donc attente implicite par le DOM
            await this.selectOptionByValue(this.filiereDropdown, userData.filiere);
            await this.selectOptionByValue(this.niveauDropdown, userData.niveau);
        }

        // 4. Soumission
        console.log('Soumission du formulaire...');
        await this.driver.findElement(this.submitButton).click();
    }
}

module.exports = CreateUserPage;