const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const { describe, it, before, after } = require('mocha');

// Importations
const LoginPage = require('../pageObjects/LoginPage');
const UserManagementPage = require('../pageObjects/UserManagementPage');

describe('Cas Critique 4: Activation/Désactivation de Compte par Super Admin', function () {
    this.timeout(50000);

    let driver;
    let userManagementPage;
    const rowIndexToTest = 1; // On teste la première ligne du tableau

    // --- Identifiants du Super Admin ---
    const adminCredentials = {
        email: 'kamkoumsabrine@enicar.ucar.tn',
        password: 'password'
    };
    const dashboardUrlPart = '/dashboard';


    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();

        // 1. CONNEXION du Super Admin
        const loginPage = new LoginPage(driver);
        await loginPage.load();
        await loginPage.login(adminCredentials.email, adminCredentials.password);

        await driver.wait(() => driver.getCurrentUrl().then(url => url.includes(dashboardUrlPart)), 10000);
        console.log('Connexion Super Admin réussie.');

        userManagementPage = new UserManagementPage(driver);
    });


    it('devrait changer l\'état du compte (Activer/Désactiver) et vérifier la mise à jour', async function () {

        // 1. Navigation vers la liste des utilisateurs et récupération de l'état initial
        await userManagementPage.load();
        const initialBadgeStatus = await userManagementPage.getCurrentStatus(rowIndexToTest);
        console.log(`État initial du compte à tester (Badge): ${initialBadgeStatus}`);

        // 2. Ouvrir la section Détails
        await userManagementPage.toggleDetails(rowIndexToTest);

        // 3. Changer l'état du compte (inclut le clic sur le pop-up de confirmation)
        await userManagementPage.changeAccountState();

        // 4. Recharger la page (méthode la plus fiable après un changement d'état critique)
        await userManagementPage.load();

        // 5. Récupérer l'état final du badge
        const finalBadgeStatus = await userManagementPage.getCurrentStatus(rowIndexToTest);
        console.log(`État final du compte (Badge): ${finalBadgeStatus}`);

        // 6. Assertion 1: Vérifier que le statut du badge a changé
        assert.notStrictEqual(
            initialBadgeStatus,
            finalBadgeStatus,
            'Échec: Le statut du compte n\'a pas changé après l\'opération.'
        );

        // 7. Assertion 2: Vérifier la cohérence du changement
        const expectedFinalStatus = (initialBadgeStatus === 'Activé') ? 'Désactivé' : 'Activé';

        assert.strictEqual(
            finalBadgeStatus,
            expectedFinalStatus,
            `Échec de la cohérence: Attendait ${expectedFinalStatus}, mais a trouvé ${finalBadgeStatus}.`
        );

    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});