const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const LoginPage = require('../pageObjects/LoginPage');
const { describe, it, before, after } = require('mocha'); // Utilisation de Mocha

describe('Cas Critique 1: Authentification Réussie', function () {
    this.timeout(30000);
    let driver;
    let loginPage;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        loginPage = new LoginPage(driver);
    });

    it('devrait permettre à un utilisateur valide de se connecter et d’accéder au tableau de bord', async function () {
        // 1. Action : Accéder à la page de connexion (appel load() qui contient l'attente explicite)
        await loginPage.load();

        // 🚨 AJOUT DE CETTE PAUSE POUR LE DÉBOGAGE
        // Ceci donne un petit répit au navigateur avant de chercher le premier élément
        await driver.sleep(1500); // Pause de 1.5 seconde

        // 2. Action : Se connecter
        await loginPage.login('kamkoumsabrine@enicar.ucar.tn', 'password');

        // 3. Assertion : Vérifier la redirection
        // On attend que l'URL change pour la page d'accueil après connexion
        await driver.wait(() => driver.getCurrentUrl().then(url => url.includes('/dashboard')), 10000);

        // 4. Vérification finale
        const currentUrl = await driver.getCurrentUrl();
        assert(currentUrl.includes('/dashboard'), `Redirection échouée. URL actuelle: ${currentUrl}`);
    });

    after(async function () {
        await driver.quit();
    });
});