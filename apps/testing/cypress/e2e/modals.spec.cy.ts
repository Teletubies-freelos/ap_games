import { baseURLEcommerce } from "../../config"

describe('modal flow', () => {
  it('Recojo en tienda', () => {
    cy
      .visit(baseURLEcommerce)
      .get('[data-testid="cartButton"]',{
        timeout: 10*10**3,
      })
      .click()
      .wait(5*10**3)
      .get('[data-testid="deliveryHome"]')
      .click()
      .wait(1*10**3)
      .get('[data-testid="fullname"] input')
      .type('Hello world')
      .get('[data-testid="numberPhone"] input')
      .type('956971785')
      .get('[data-testid="email"] input')
      .type('pikachu@gmail.com')
  })
})
