const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const { describe, it, before, after } = require('mocha');

// Importations des Page Objects
const LoginPage = require('../pageObjects/LoginPage');
const ConventionPage = require('../pageObjects/ConventionPage');

describe('Cas Critique 6: Validation d\'une Convention par le Service de Stage', function () {
    this.timeout(50000);

    let driver;
    let conventionPage;

    // REMPLACER AVEC VOS VRAIS IDENTIFIANTS SERVICE_STAGE
    const stageServiceCredentials = {
        email: 'toumimahdi@enicar.ucar.tn',
        password: 'password'
    };
    const dashboardUrlPart = '/dashboard';

    before(async function () {
        // 1. Initialisation du driver
        driver = await new Builder().forBrowser('chrome').build();

        // 2. Exécution de la Connexion Service de Stage
        const loginPage = new LoginPage(driver);
        await loginPage.load();

        console.log(`Tentative de connexion en tant que ${stageServiceCredentials.email}...`);
        await loginPage.login(stageServiceCredentials.email, stageServiceCredentials.password);

        // 3. Attente de la redirection (Dashboard)
        await driver.wait(() => driver.getCurrentUrl().then(url => url.includes(dashboardUrlPart)), 10000);
        console.log('Connexion Service de Stage réussie.');

        // 4. Préparation du Page Object
        conventionPage = new ConventionPage(driver);
    });


    it('devrait valider une convention en attente et vérifier le changement de statut', async function () {

        // 1. Navigation vers la page Conventions
        await conventionPage.load();

        // 2. Récupérer l'état initial
        const initialStatus = await conventionPage.getCurrentStatus();
        console.log(`Statut initial de la première convention (lu): '${initialStatus}'`);

        // ASSERTION INITIIALE FLEXIBLE : S'assurer que la convention n'est pas déjà traitée
        const validInitialStatuses = ['En attente', ''];
        if (!validInitialStatuses.includes(initialStatus)) {
            assert.fail(`Le statut initial n'est pas valide pour la validation. Statut trouvé: '${initialStatus}'. Nous attendions 'En attente' ou ''.`);
        }

        // 3. Lancer la validation (inclut le clic sur le pop-up)
        await conventionPage.validateConvention();

        // 4. Recharger la page pour obtenir le statut mis à jour
        await conventionPage.load();

        // 5. Récupérer le nouvel état
        const finalStatus = await conventionPage.getCurrentStatus();
        console.log(`Statut final de la première convention (lu): '${finalStatus}'`);

        // 6. ASSERTION FINALE : Le statut doit avoir changé
        const expectedFinalStatus = 'validée';

        assert.notStrictEqual(
            initialStatus,
            finalStatus,
            'Échec: Le statut de la convention n\'a pas changé après la validation.'
        );

        assert.strictEqual(
            finalStatus,
            expectedFinalStatus,
            `Échec de la cohérence: Attendait '${expectedFinalStatus}', mais a trouvé '${finalStatus}'.`
        );

        console.log('Validation réussie et statut mis à jour.');
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});