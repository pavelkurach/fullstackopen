describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user1 = {
      name: 'Test User',
      username: 'testuser',
      password: 'password123',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user1);

    const user2 = {
      name: 'Test User 2',
      username: 'testuser2',
      password: 'password1234',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user2);

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

    it('a blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('A new blog');
      cy.get('#author').type('Test Author');
      cy.get('#url').type('http://testurl.com');
      cy.get('#create-button').click();
      cy.contains('A new blog Test Author');
    });

    describe('When logged in and one blog is created', function () {
      this.beforeEach(function () {
        cy.contains('new blog').click();
        cy.get('#title').type('A new blog');
        cy.get('#author').type('Test Author');
        cy.get('#url').type('http://testurl.com');
        cy.get('#create-button').click();
      });

      it('user can like a blog', function () {
        cy.get('#view-button').click();
        cy.get('#likes').should('contain', 'likes 0');
        cy.get('#like-button').click();
        cy.wait(1000);
        cy.get('#likes').should('contain', 'likes 1');
        cy.get('#like-button').click();
        cy.wait(1000);
        cy.get('#likes').should('contain', 'likes 2');
      });

      it('user can delete a blog', function () {
        cy.get('#view-button').click();
        cy.get('#delete-button').click();
        cy.get('.blog').should('not.exist');
      });

      it('blog cannot be deleted by a user who is not its creator', function () {
        cy.get('#logout-button').click();
        cy.get('#username').type('testuser2');
        cy.get('#password').type('password1234');
        cy.get('#login-button').click();
        cy.contains('Test User 2 is logged in.');

        cy.get('#view-button').click();
        cy.get('#delete-button').should('not.exist');
      });
    });
  });
});
