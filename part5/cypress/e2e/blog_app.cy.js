describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'password123',
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('username:');
    cy.contains('password');
    cy.contains('Login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('password123');
      cy.get('#login-button').click();

      cy.contains('Test User is logged in.');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser');
      cy.get('#password').type('wrongpassword');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testuser',
        password: 'password123',
      }).then(response => {
        localStorage.setItem(
          'loggedBloglistAppUser',
          JSON.stringify(response.body),
        );
        cy.visit('http://localhost:3000');
      });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('A new blog');
      cy.get('#author').type('Test Author');
      cy.get('#url').type('http://testurl.com');
      cy.get('#create-button').click();
      cy.contains('A new blog Test Author');
    });
  });
});
