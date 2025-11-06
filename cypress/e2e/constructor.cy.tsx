import { selectors } from '../support/selectors';

describe('Проверка конструктора бургера', () => {
  beforeEach(() => {
    // Перехватываем запрос на получение ингредиентов
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    });

    cy.visit('/');
  });

  it('Загрузка ингредиентов', () => {
    // Проверяем, что ингредиенты есть
    cy.contains('Булка').should('exist');
    cy.contains('Котлета').should('exist');
  });

  it('Добавление ингредиентов', () => {
    // Добавляем булку
    cy.get(selectors.bun).find('button').click();
    // Проверяем, что булка добавилась в конструктор
    cy.get(selectors.burgerConstructor).as('constructor').contains('Булка').should('exist');

    // Добавляем котлету
    cy.get(selectors.meat).find('button').click();
    // Проверяем, что котлета добавилась в конструктор
    cy.get('@constructor').contains('Котлета').should('exist');
  });
});

describe('Проверка работы модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.visit('/');
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    // Открываем модальное окно по клику на ингредиент
    cy.contains('Булка').click();
    // Проверяем, что модальное окно открылось и в нём правильный ингредиет
    cy.contains('Детали ингредиента').should('exist');
    cy.contains('200').should('exist');

    // Закрываем модальное окно по клику на крестик
    cy.get(selectors.modalClose).click();
    // Проверяем, что модальное окно закрылось
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    cy.contains('Булка').click();
    cy.contains('Детали ингредиента').should('exist');

    // Закрываем модалку по клику на оверлей
    cy.get(selectors.modalOverlay).click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});
