class AddNewBoard {

    get addBoard() {
        return cy.get('ul > li[title="Add new Board"]')
    }

    get boardTitle() {
        return cy.get('input[name="name"]')
    }

    get nextButon() {
        return cy.get('button[name="next_btn"]')
    }

    get boardType() {
        return cy.get('span[name="type_scrum"]')
    }

    addNewBoard(boardTitle) {
        this.addBoard.click()
        this.boardTitle.type(boardTitle)
        this.nextButon.click()
        this.boardType.click()
        this.nextButon.click()
        this.nextButon.click()
        this.nextButon.click()
        this.nextButon.click()
    }

}

export const addNewBoard = new AddNewBoard()