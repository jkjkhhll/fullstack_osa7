describe('Bloglist ', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Testikäyttäjä',
            username: 'testik',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('home')
    })

    it('user can login', function () {
        cy.get('#username').type('testik')
        cy.get('#password').type('salainen')
        cy.contains('kirjaudu').click()
        cy.contains('Testikäyttäjä logged in')
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.get('#username').type('testik')
            cy.get('#password').type('salainen')
            cy.contains('kirjaudu').click()
        })

        it('a new blog can be created', function () {
            cy.contains('add new').click()
            cy.get('#title').type('Testiblogi')
            cy.get('#author').type('Testikirjoittaja')
            cy.get('#url').type('http://www.testi.fi')
            cy.contains('create').click()
            cy.contains('Testiblogi')
        })
    })

    describe('when logged in and new blog added', function () {
        beforeEach(function () {
            cy.get('#username').type('testik')
            cy.get('#password').type('salainen')
            cy.contains('kirjaudu').click()
            cy.contains('add new').click()
            cy.get('#title').type('Testiblogi')
            cy.get('#author').type('Testikirjoittaja')
            cy.get('#url').type('http://www.testi.fi')
            cy.contains('create').click()
        })

        it('a comment can be added', function () {
            cy.get('a.blog').click()
            cy.get("#comment").type('Testikommentti')
            cy.contains('add comment').click()
            cy.contains('Testikommentti')
        })
    })
})