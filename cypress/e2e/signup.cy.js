import { faker } from "@faker-js/faker";
import signupPage from "../support/pages/signup";

describe("cadastro", function () {
  const user = {
    name: "Juliana Dias",
    email: "Elyse_Johnston47@hotmail.com",
    senha: "123456",
  };

  it("deve cadastrar um novo usuario", function () {
    cy.task("removedUser", user.email).then(function (result) {
      console.log(result);
    });

    signupPage.go();
    signupPage.form(user);
    signupPage.submit();
    signupPage.toast.shouldHaveText(
      "Agora você pode fazer seu login no Samurai Barbershop!"
    );
  });

  it("deve exibir email já cadastrado", function () {
    signupPage.go();
    signupPage.form(user);
    signupPage.submit();
    signupPage.toast.shouldHaveText("Email já cadastrado para outro usuário.");
  });

  context("quando o email é incorreto", () => {
    const user = {
      name: "Julia Roberts",
      email: "julia_robtsmailinator.com",
      senha: "123456",
    };

    it("deve exibir mensagem de alerta", () => {
      signupPage.go();
      signupPage.form(user);
      signupPage.submit();

      signupPage.alertHaveText("Informe um email válido");
    });
  });

  context("quando a senha é muito curta", () => {
    const senhas = ["1", "12", "123", "1234", "12345"];

    beforeEach(() => {
      signupPage.go();
    });

    senhas.forEach(function (p) {
      it("não deve realizar cadastro com a senha: " + p, () => {
        const user = {
          name: "Julia Roberts",
          email: "julia_@mailinator.com",
          senha: "p",
        };

        signupPage.form(user);
        signupPage.submit();
      });
      afterEach(() => {
        signupPage.alertHaveText("Pelo menos 6 caracteres");
      });
    });
  });
  context('quando não preencho nenhum dos campos', () => {

      const alertMessages = [
        'Nome é obrigatório',
        'E-mail é obrigatório',
        'Senha é obrigatória'
      ]

      before(function(){
        signupPage.go()
        signupPage.submit()
      })

      alertMessages.forEach(function(alert){
        it('deve exibir ' + alert.toLowerCase(), () => {
          signupPage.alertHaveText(alert)
        });
      })

  });
});
