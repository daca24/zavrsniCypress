class Login {

    get emailInput() {
        return cy.get('input[type="email"]')
    }

    get passwordInput() {
        return cy.get('input[type="password"]')
    }

    get loginButton() {
        return cy.get('button[type="submit"]')
    }

    login(email, password) {
        this.emailInput.type(email)
        this.passwordInput.type(password)
        this.loginButton.click()
    }
}

export const login = new Login()