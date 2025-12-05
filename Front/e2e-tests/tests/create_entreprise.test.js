const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const { describe, it, before, after } = require('mocha');

// Importations des Page Objects
const LoginPage = require('../pageObjects/LoginPage');
const EntreprisePage = require('../pageObjects/EntreprisePage');

describe('Cas Critique 5: Création d\'une Entreprise par le Service de Stage', function () {
    this.timeout(50000);

    let driver;
    let entreprisePage;

    // --- Données de Test ---
    const uniqueTimestamp = Date.now();
    const testEntrepriseData = {
        nom: `TestCorp-${uniqueTimestamp}`,
        adresse: '12 Rue de l\'Innovation, Tunis',
        email: `contact.testcorp.${uniqueTimestamp}@example.com`,
        telephone: `90${uniqueTimestamp.toString().slice(-6)}`
    };

    const stageServiceCredentials = {
        email: 'toumimahdi@enicar.ucar.tn',
        password: 'password'
    };


    // Bloc BEFORE : Précondition de connexion
    before(async function () {
        // 1. Initialisation du driver
        driver = await new Builder().forBrowser('chrome').build();

        // 2. Exécution de la Connexion Service de Stage
        const loginPage = new LoginPage(driver);
        await loginPage.load();

        console.log(`Tentative de connexion en tant que ${stageServiceCredentials.email}...`);
        await loginPage.login(stageServiceCredentials.email, stageServiceCredentials.password);

        // 3. Attente de la redirection (Dashboard)
        await driver.wait(() => driver.getCurrentUrl().then(url => url.includes('/dashboard')), 10000);
        console.log('Connexion Service de Stage réussie.');

        // 4. Préparation du Page Object
        entreprisePage = new EntreprisePage(driver);
    });


    // Le cas de test principal
    it('devrait créer une entreprise avec succès et la trouver dans le tableau', async function () {

        // 1. Navigation vers la page Entreprises
        await entreprisePage.load();

        // 2. Clic sur le bouton pour ouvrir la modale
        await entreprisePage.openCreateModal();

        // 3. Remplissage du formulaire et Soumission
        await entreprisePage.createEntreprise(testEntrepriseData);

        // 4. Vérification de la présence de la nouvelle entreprise dans le tableau
        console.log(`Vérification de la présence de l'entreprise : ${testEntrepriseData.nom}`);

        const isCreated = await entreprisePage.checkEntrepriseExists(testEntrepriseData.nom);

        // 5. Assertion
        assert.strictEqual(
            isCreated,
            true,
            `Création échouée. L'entreprise ${testEntrepriseData.nom} n'a pas été trouvée dans le tableau.`
        );
        console.log(`L'entreprise ${testEntrepriseData.nom} a été créée et trouvée avec succès.`);
    });

    // Bloc AFTER : Fermeture du navigateur
    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});