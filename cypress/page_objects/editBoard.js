class EditBoard {

    get configureBoard() {
        return cy.get('ul > li[data-cy="board-configuration"]')
    }

    get boardTitle() {
        return cy.get('input[name="name"]')
    }

    get boardDescription() {
        return cy.get('textarea[name="description"]')
    }

    get updateButton() {
        return cy.get('button[class="vs-c-btn vs-c-btn--primary vs-c-btn--spaced vs-u-font-weight-bold vs-c-btn-auth--top-gap"]')
    }

    editBoard(title, description){
        this.configureBoard.click()
        this.boardTitle.type(title)
        this.boardDescription.type(description)
        this.updateButton.click()
    }

}

export const editBoard = new EditBoard()