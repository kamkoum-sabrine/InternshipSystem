const { By, until } = require('selenium-webdriver'); // Ajout de 'until' pour les attentes

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'http://localhost:4200/#/login';

        // --- VÉRIFIEZ CECI ---
        this.usernameField = By.id('email');
        this.passwordField = By.id('password');
        this.loginButton = By.css('button[type="submit"]');
    }

    async load() {
        await this.driver.get(this.url);

        // PAUSE DÉBOGAGE (pour donner le temps au router Angular de démarrer)
        await this.driver.sleep(1000);

        // ATTENTE EXPLICITE CORRIGÉE :
        // 1. On attend que l'élément soit PRÉSENT dans le DOM (elementLocated).
        // 2. On utilise l'objet 'until' correctement pour sa méthode 'elementLocated'.
        // 3. Nous allons utiliser By.id('email') comme localisateur pour l'attente.

        const emailElement = await this.driver.wait(
            until.elementLocated(this.usernameField),
            15000 // 15 secondes d'attente maximum
        );

        // De plus, nous nous assurons qu'il est visible après l'avoir localisé.
        await this.driver.wait(until.elementIsVisible(emailElement), 15000);
    }
    async login(email, password) {
        // Le test a échoué précédemment ici. Maintenant, l'élément devrait être trouvé.
        await this.driver.findElement(this.usernameField).sendKeys(email);
        await this.driver.findElement(this.passwordField).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }
}

module.exports = LoginPage;