describe('Создание заказа', () => {
  beforeEach(() => {
    // Запрос на получение ингредиентов
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' });
    // Запрос на получение данных пользователя
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });
    // Запрос на создание заказа
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' });

    // Подстановка моковых токенов
    cy.setCookie('accessToken', 'some-access-token');
    window.localStorage.setItem('refreshToken', 'some-refresh-token');

    cy.visit('http://localhost:4000/');
  });

  afterEach(() => {
    // Очистка токенов
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('Создание заказа', () => {
    // Сборка бургера
    cy.get('[data-cy="1"]').find('button').click();
    cy.get('[data-cy="2"]').find('button').click();
    cy.get('[data-cy="burger-constructor"]').contains('Булка').should('exist');
    cy.get('[data-cy="burger-constructor"]')
      .contains('Котлета')
      .should('exist');

    // Клик на "Оформить заказ"
    cy.contains('Оформить заказ').click();

    // Проверяем, что модальное окно с номером заказа открылось
    cy.contains('Ваш заказ начали готовить').should('exist');
    cy.contains('12').should('exist');

    // Закрываем модальное окно и проверяем закрытие
    cy.get('[data-cy="modal-close"]').click();
    cy.contains('Ваш заказ начали готовить').should('not.exist');

    // Проверяем, что конструктор пуст
    cy.get('[data-cy="burger-constructor"]')
      .contains('Булка')
      .should('not.exist');
    cy.get('[data-cy="burger-constructor"]')
      .contains('Котлета')
      .should('not.exist');
  });
});
