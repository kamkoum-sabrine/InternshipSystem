const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const { describe, it, before, after } = require('mocha');

// Importations des Page Objects
const CreateUserPage = require('../pageObjects/CreateUserPage');
const LoginPage = require('../pageObjects/LoginPage');

describe('Cas Critique 2: Création d’un Utilisateur (Étudiant)', function () {
    this.timeout(50000);

    let driver;
    let createUserPage;

    // --- Données de Test ---
    const uniqueTimestamp = Date.now();
    const testUserData = {
        nom: 'Martin',
        prenom: 'Alex',
        cin: '12345678', // Assurez-vous que le format est valide
        email: `alex.martin.${uniqueTimestamp}@enicar.ucar.tn`,
        role: 'ETUDIANT',
        filiere: '2',
        niveau: '1'
    };

    // NOTE : REMPLACER AVEC VOS VRAIS IDENTIFIANTS ADMIN
    const adminCredentials = {
        email: 'kamkoumsabrine@enicar.ucar.tn',
        password: 'password'
    };


    // Bloc BEFORE : Précondition de connexion
    before(async function () {
        // 1. Initialisation du driver
        driver = await new Builder().forBrowser('chrome').build();

        // 2. Exécution de la Connexion
        const loginPage = new LoginPage(driver);
        await loginPage.load();

        console.log(`Tentative de connexion en tant que ${adminCredentials.email}...`);
        await loginPage.login(adminCredentials.email, adminCredentials.password);

        // 3. Attente de la redirection (Dashboard)
        await driver.wait(() => driver.getCurrentUrl().then(url => url.includes('/dashboard')), 10000);
        console.log('Connexion Admin réussie.');

        // 4. Préparation du Page Object de création
        createUserPage = new CreateUserPage(driver);
    });


    // Le cas de test principal
    it('devrait créer un utilisateur ETUDIANT avec succès et rediriger', async function () {

        // 1. Navigation vers la page de liste des utilisateurs
        await createUserPage.loadList();

        // 2. Clic sur le bouton pour ouvrir le formulaire
        await createUserPage.openCreateForm();

        // 3. Remplissage du formulaire et Soumission
        await createUserPage.createUser(testUserData);

        // 4. Assertion : Vérifier la redirection après soumission réussie
        // NOTE: Vérifiez l'URL de destination après la création
        const expectedSuccessUrlPart = '/utilisateurs';

        await driver.wait(() => driver.getCurrentUrl().then(url => url.includes(expectedSuccessUrlPart)), 15000);

        // 5. Vérification finale
        const currentUrl = await driver.getCurrentUrl();
        assert(
            currentUrl.includes(expectedSuccessUrlPart),
            `Création échouée. Attendue: ${expectedSuccessUrlPart}, Actuelle: ${currentUrl}`
        );
        console.log('Utilisateur créé avec succès et redirection vérifiée.');
    });

    // Bloc AFTER : Fermeture du navigateur
    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});