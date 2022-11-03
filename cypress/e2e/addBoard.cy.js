/// <reference types = "Cypress"/>

import { addNewBoard } from "../page_objects/addBoard"
import { login } from "../page_objects/login"
import { faker } from '@faker-js/faker'
import { editBoard } from "../page_objects/editBoard"

var token
describe('Create new board', () => {
    let id_board = ''
    before('Go to login page and login with valid credentials', () => {
        cy.visit('')
        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/login').as('validLogin')
        login.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
        cy.url().should('contain', '/my-organizations')
        cy.wait('@validLogin').then(intercept => {
            expect(intercept.request.body.email).to.eq(Cypress.env('validEmail'))
            expect(intercept.request.body.password).to.eq(Cypress.env('validPassword'))
            expect(intercept.response.statusCode).to.eq(200)
            expect(intercept.response.statusMessage).to.eq('OK')
            token = intercept.response.body.token;
        })
    })

    beforeEach('Stay logged in', () => {
        window.localStorage.setItem('token', token);
    })

    it('Add new board', () => {
        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards').as('addNewBoard')
        addNewBoard.addNewBoard(faker.name.jobType())
        cy.wait('@addNewBoard').then(intercept => {
            id_board=intercept.response.body.id
            expect(intercept.response.statusCode).to.eq(201)
            expect(intercept.response.statusMessage).to.eq('Created')
            expect(intercept.response.body.id).to.eq(id_board)
        })
    })

    it('Edit board', () => {
        cy.intercept('PUT', 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards/' + id_board).as('editBoard')
        editBoard.editBoard(faker.name.jobType(), faker.name.jobDescriptor())
        cy.wait('@editBoard').then(intercept => {
            expect(intercept.response.statusCode).to.eq(200)
            expect(intercept.response.statusMessage).to.eq('OK')
        })
    })

    it('Delete gallery BE', () => {
        cy.request({
            method: 'DELETE',
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${id_board}`,
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Logout BE', () => {
        cy.request({
            method: 'POST',
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/logout`,
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
        })
    })
})