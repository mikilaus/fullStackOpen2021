describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Miklos Komcsak",
      username: "mikilaus",
      password: "admin",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in").click();
    cy.contains("username");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("mikilaus");
      cy.get("#password").type("admin");
      cy.get("#login-button").click();

      cy.contains("mikilaus logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("mikilaus");
      cy.get("#password").type("adminn");
      cy.get("#login-button").click();

      cy.get("html").should("not.contain", "mikilaus logged in");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "mikilaus",
        password: "admin",
      }).then((response) => {
        localStorage.setItem("loggedUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.contains("add blog").click();
      cy.get("#title").type("new blog by cypress");
      cy.get("#author").type("cypress");
      cy.get("#url").type("url by cypress");
      cy.contains("create").click();

      cy.contains("new blog by cypress");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.contains("add blog").click();
        cy.get("#title").type("new blog by cypress");
        cy.get("#author").type("cypress");
        cy.get("#url").type("url by cypress");
        cy.contains("create").click();
        cy.wait(1000);
      });

      it("it can be liked", function () {
        cy.contains("view").click();
        cy.get("#like-button").click();
        cy.contains("1");
      });

      it("can be deleted by the creator", function () {
        cy.contains("view").click();
        cy.contains("remove").click();
        cy.get("html").should("not.contain", "new blog by cypress");
      });

      it.only("blogs are ordered according to likes", function () {
        cy.contains("add blog").click();
        cy.get("#title").type("new blog by cypress 2");
        cy.get("#author").type("cypress 2");
        cy.get("#url").type("url by cypress 2");
        cy.contains("create").click();
        cy.wait(1000);

        cy.get(".blog").then((blogs) => {
          cy.wrap(blogs[1]).find("button").click();
        });

        cy.get("#like-button").click();
        cy.visit("http://localhost:3000");

        cy.get(".blog").then((blogs) => {
          cy.wrap(blogs[0]).find("button").click();
          cy.contains("1");
        });
      });
    });
  });
});
