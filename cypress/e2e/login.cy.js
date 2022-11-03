/// <reference types = "Cypress"/>

import { login } from "../page_objects/login"

describe('Login', () => {
    beforeEach('Go to login page', () => {
        cy.visit('')
        cy.url().should('contain', '/login')
        login.loginButton.should('exist')
    })

    it('Login with valid credentials', () => {
        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/login').as('validLogin')
        login.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
        login.loginButton.should('not.exist')
        cy.url().should('contain', '/my-organizations')
        cy.wait('@validLogin').then(intercept => {
            expect(intercept.request.body.email).to.eq(Cypress.env('validEmail'))
            expect(intercept.request.body.password).to.eq(Cypress.env('validPassword'))
            expect(intercept.response.statusCode).to.eq(200)
            expect(intercept.response.statusMessage).to.eq('OK')
        })
    })
}) 