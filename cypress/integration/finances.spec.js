/// <reference types="cypress" />

context('Deve Finances Agilezei', () => {
    // hooks
    //trechos que executam antes e depois do teste
    // before -> antes de todos os testes
    //beforeEach -> antes de cada teste
    //after -> depois de todos os testes
    //afterEach -> depois de cada teste

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app')  //site
    });
    it('Cadastrar entradas', () => {
     
     cy.get('#transaction .button ').click() //id + class  (botão=nova transção) (vai clicar no botão)
     cy.get('[placeholder=Descrição]').type('Presente') // id  (descrição) (preencher)
     cy.get('[name=amount]').type(12) // atributos  (valor)  (preencher)
     cy.get('[type=date]').type('2022-02-03')  // atributos  (data) (preencher)
     cy.get('button').contains('Salvar').click() //tipo e valor  (Salvar)

     cy.get(' #data-table tbody tr').should('have.length',1)  //(should utlizado para acerçoes) 1 tamanho tabela


    });
    // cadastrar saidas
    it('cadastrar saidas', () => { // only para rodar somente o teste saida
        

        cy.get('#transaction .button ').click() 
        cy.get('[placeholder=Descrição]').type('Presente') 
        cy.get('[name=amount]').type(-12)   // -12 saida de dinheiro
        cy.get('[type=date]').type('2022-02-03') 
        cy.get('button').contains('Salvar').click() 
   
        cy.get(' #data-table tbody tr').should('have.length',1)  
    });
    // remover entradas e saidas
    it.only('Remover entradas e saidas', () => {
        const entrada = 'comissao'    //cria uma variavel
        const saida   = 'Chocolate'

        cy.get('#transaction .button ').click() 
        cy.get('[placeholder=Descrição]').type('entrada') 
        cy.get('[name=amount]').type(100)   // -12 saida de dinheiro
        cy.get('[type=date]').type('2022-02-03') 
        cy.get('button').contains('Salvar').click() 
        
        cy.get('#transaction .button ').click() 
        cy.get('[placeholder=Descrição]').type('saida') 
        cy.get('[name=amount]').type(-35)   // -35 saida de dinheiro
        cy.get('[type=date]').type('2022-02-03') 
        cy.get('button').contains('Salvar').click() 


        //estrategia 1: voltar p/elemento pai (tr) e avançar para um (td) img atributo
            cy.get('td[class="description"]')
            .contains(entrada)          //Mesada elemento ancora
            .parent()                      //comando pai (tr)
            .find('img[onclick$=remove]')   //filho
            .click()

            // estrategia 2: buscar todos os irmãos e buscar o que tem img + atr

            cy.get('td[class="description"]')
            .contains(saida)
            .siblings()                         //buscar elementos irmaos
            .children('img[onclick$=remove]')   //filho
            .click()

            cy.get(' #data-table tbody tr').should('have.length',0)   //nossa listagem deve ter o tamanho 0 
    });
    
});

        //entender o fluxo manualmente
        //mapear os elementos que vamos interagir
        //descrever as interações com cypress
        //adicionar as asserçoes que a gente precisa