describe('Categories API Testing', () => {

  const baseUrl = 'https://api.escuelajs.co/api/v1/categories'
  let newId

  // 1. GET all categories
  it('Get all categories', () => {
    cy.request('GET', baseUrl).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
    })
  })

  // 2. GET single category
  it('Get single category by id', () => {
    cy.request('GET', `${baseUrl}/1`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
    })
  })

  // 3. CREATE category 
  it('Create new category', () => {
    const randomName = 'Kategori-' + Date.now()

    cy.request('POST', baseUrl, {
      name: randomName,
      image: 'https://placeimg.com/640/480/any'
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201])
      expect(response.body).to.have.property('name', randomName)

      newId = response.body.id
    })
  })

  // 4. UPDATE category
  it('Update category', () => {
    cy.request('PUT', `${baseUrl}/${newId}`, {
      name: 'Update-' + Date.now()
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('name')
    })
  })

  // 5. DELETE category 
  it('Delete category', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/${newId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect([200, 204]).to.include(response.status)
    })
  })

  // 6. NEGATIVE: invalid id 
  it('Get category invalid id', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/999999`,
      failOnStatusCode: false
    }).then((response) => {
      expect([200, 400, 404]).to.include(response.status)
    })
  })

  // 7. NEGATIVE: create tanpa name
  it('Create category without name', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      body: {
        image: 'https://placeimg.com/640/480/any'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.not.eq(201)
    })
  })

})