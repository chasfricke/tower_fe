const locations = {
  "locations": [
      {
          "id": 1,
          "name": "Starbucks",
          "business_type": "coffee",
          "address": "200 Quebec St, Denver, CO 80230",
          "latitude": 39.72,
          "longitude": -104.902,
          "first_visit": "2017-01-14T00:00:00.000Z"
      },
      {
          "id": 3,
          "name": "QuinceEssential Coffee House",
          "business_type": "coffee",
          "address": "1447 Quince St, Denver, CO 80220",
          "latitude": 39.7396,
          "longitude": -104.902,
          "first_visit": "2017-01-14T00:00:00.000Z"
      },
      {
          "id": 4,
          "name": "Lowry Elementary",
          "business_type": "school",
          "address": "8001 E Cedar Ave, Denver, CO 80230",
          "latitude": 39.7128,
          "longitude": -104.896,
          "first_visit": "2017-01-14T00:00:00.000Z"
      },
      {
          "id": 5,
          "name": "Teller Elementary",
          "business_type": "school",
          "address": "1150 Garfield St, Denver, CO 80206",
          "latitude": 39.7344,
          "longitude": -104.944,
          "first_visit": "2017-01-14T00:00:00.000Z"
      },
      {
          "id": 6,
          "name": "Starbucks",
          "business_type": "coffee",
          "address": "6160 E Colfax Ave #1, Denver, CO 80220",
          "latitude": 39.7399,
          "longitude": -104.916,
          "first_visit": null
      },
      {
          "id": 2,
          "name": "Timbuk Toys",
          "business_type": "business",
          "address": "200 Quebec St, Denver, CO 80230",
          "latitude": 39.72,
          "longitude": -104.902,
          "first_visit": "2017-01-14T00:00:00.000Z"
      }
  ]
}

describe('App initialization', () => {
  it('Loads all elements on page load', () => {
    cy.server()
    cy.route('GET', '/locations', locations)
    cy.visit('http://localhost:3000/')

    cy.get('.locations-list li')
      .should('exist')
    
    cy.get('.message')
      .should('exist')
    
    cy.get('.Google-Map')
      .should('exist')

    cy.get('form')
      .should('have.length', 4)
  })

  it('Update Location Form updates list', () => {
    cy.get('#location_1 .update-load-button').click()
    cy.get('#update-location-name').clear()
    cy.get('#update-location-name').type('Acme Coffee')
    cy.get('#update-location-button').click()
    cy.reload()
    cy.get('#location_1 .update-load-button').click()
    cy.get('#update-location-name').clear()
    cy.get('#update-location-name').type('Starbucks')
    cy.get('#update-location-button').click()
    cy.reload()
  })

  it('Add Note Form updates Location Card', () => {
  cy.get('#location_5 .add-note-button').click()
  cy.get('#create-note-form textarea').type('I left posters.')
  cy.get('#create-note-form input').type('John Doe')
  cy.get('#create-note-form button').click()
  cy.reload()
  cy.get('.message > .delete-note-button').last().click()
  cy.reload()
  })
})


 
