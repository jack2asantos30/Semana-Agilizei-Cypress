/// <reference types="cypress" />



context('Deve Finances Agilezei', () => {
    

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app')  
    });
    it('Cadastrar entradas', () => {
     
     cy.get('#transaction .button ').click() 
     cy.get('[placeholder=Descrição]').type('Presente') 
     cy.get('[name=amount]').type(12) 
     cy.get('[type=date]').type('2022-02-03')  
     cy.get('button').contains('Salvar').click() 

     cy.get(' #data-table tbody tr').should('have.length',1)  


    });
    
    it('cadastrar saidas', () => { 
        

        cy.get('#transaction .button ').click() 
        cy.get('[placeholder=Descrição]').type('Presente') 
        cy.get('[name=amount]').type(-12)   
        cy.get('[type=date]').type('2022-02-03') 
        cy.get('button').contains('Salvar').click() 
   
        cy.get(' #data-table tbody tr').should('have.length',1)  
    });
    
    it('Remover entradas e saidas', () => {
        const entrada = 'comissao'    
        const saida   = 'Chocolate'

        cy.get('#transaction .button ').click() 
        cy.get('[placeholder=Descrição]').type(entrada) 
        cy.get('[name=amount]').type(100)   
        cy.get('[type=date]').type('2022-02-03') 
        cy.get('button').contains('Salvar').click() 
        
        cy.get('#transaction .button ').click() 
        cy.get('[placeholder=Descrição]').type(saida) 
        cy.get('[name=amount]').type(-35)   
        cy.get('[type=date]').type('2022-02-03') 
        cy.get('button').contains('Salvar').click() 


        
            cy.get('td[class="description"]')
            .contains(entrada)          
            .parent()                      
            .find('img[onclick*=remove]')   
            .click()

           

            cy.get('td[class="description"]')
            .contains(saida)
            .siblings()                         
            .children('img[onclick*=remove]')   
            .click()

            cy.get(' #data-table tbody tr').should('have.length',0)  
    });
});

   
