describe('Проверка конструктора бургера', () => {
  beforeEach(() => {
    // Перехватываем запрос на получение ингредиентов
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    });

    cy.visit('http://localhost:4000/');
  });

  it('Загрузка ингредиентов', () => {
    // Проверяем, что ингредиенты есть
    cy.contains('Булка').should('exist');
    cy.contains('Котлета').should('exist');
  });

  it('Добавление ингредиентов', () => {
    // Добавляем булку
    cy.get('[data-cy="1"]').find('button').click();
    // Проверяем, что булка добавилась в конструктор
    cy.get('[data-cy="burger-constructor"]').contains('Булка').should('exist');

    // Добавляем котлету
    cy.get('[data-cy="2"]').find('button').click();
    // Проверяем, что котлета добавилась в конструктор
    cy.get('[data-cy="burger-constructor"]')
      .contains('Котлета')
      .should('exist');
  });
});

describe('Проверка работы модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.visit('http://localhost:4000/');
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    // Открываем модальное окно по клику на ингредиент
    cy.contains('Булка').click();
    // Проверяем, что модальное окно открылось и в нём правильный ингредиет
    cy.contains('Детали ингредиента').should('exist');
    cy.contains('200').should('exist');

    // Закрываем модальное окно по клику на крестик
    cy.get('[data-cy="modal-close"]').click();
    // Проверяем, что модальное окно закрылось
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    cy.contains('Булка').click();
    cy.contains('Детали ингредиента').should('exist');

    // Закрываем модалку по клику на оверлей
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});
