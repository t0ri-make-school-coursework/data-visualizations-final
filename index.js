class Country {
  constructor(data) {
    const { 
      "Country or region": country,
      "GDP per capita": gdp,
      "Social support": support,
      "Healthy life expectancy": health,
      "Generosity": generosity,
      "Overall rank": rank
    } = data

    this.country = country
    this.gdp = gdp
    this.support = support
    this.health = health
    this.generosity = generosity
    this.rank = rank
  }
}

function getData() {
  // Pull data from JSON file
  fetch('./2019.json')
    .then(res => res.json())
    .then(json => handleData(json))
    .catch()
}


function handleData(data) {
  let countries = []
  data.forEach(country => countries.push(new Country(country)))

  challengeTwo(countries)
  challengeThree(countries)
  challengeFour(countries)
}


function challengeTwo(data) {
  const container = document.getElementById('challenge-two')
  const countries = document.createElement('p')
  countries.innerHTML = `${data.length} countries`
  
  // TODO: grab the year and display it here
  // yeah I couldn't figure this out so I hardcoded it
  const year = document.createElement('p')
  year.innerHTML = `2019`
  
  container.appendChild(countries)
  container.appendChild(year)
}


function challengeThree(data) {
  const container = document.getElementById('challenge-three')
  topGDP(data, container)
  topSupport(data, container)
  topHealth(data, container)
  topGenerosity(data, container)
}


function topGDP(data, container) {
  const gdpContainer = document.createElement('div')
  const gdpHeading = document.createElement('h3')
  gdpHeading.innerHTML = 'Countries Ranked By Highest GDP'
  gdpContainer.appendChild(gdpHeading)
  
  sortedByGDP = data.sort((countryOne, countryTwo) => countryTwo.gdp - countryOne.gdp)
  sortedByGDP.slice(0, 10).forEach((country, index) => {
    const element = document.createElement('p')
    element.innerHTML = `${index + 1}. ${country.country} - ${country.gdp}`
    gdpContainer.appendChild(element)
  })
  
  container.appendChild(gdpContainer)
}


function topSupport(data, container) {
  const supportContainer = document.createElement('div')
  const supportHeading = document.createElement('h3')
  supportHeading.innerHTML = 'Countries Ranked By Access to Social Support'
  supportContainer.appendChild(supportHeading)
  
  sortedBySupport = data.sort((countryOne, countryTwo) => countryTwo.support - countryOne.support)
  sortedBySupport.slice(0, 10).forEach((country, index) => {
    const element = document.createElement('p')
    element.innerHTML = `${index + 1}. ${country.country} - ${country.support}`
    supportContainer.appendChild(element)
  })
  
  container.appendChild(supportContainer)
}


function topHealth(data, container) {
  const healthContainer = document.createElement('div')
  const healthHeading = document.createElement('h3')
  healthHeading.innerHTML = 'Countries Ranked By Life Expectancy & Health'
  healthContainer.appendChild(healthHeading)
  
  sortedByHealth = data.sort((countryOne, countryTwo) => countryTwo.health - countryOne.health)
  sortedByHealth.slice(0, 10).forEach((country, index) => {
    const element = document.createElement('p')
    element.innerHTML = `${index + 1}. ${country.country} - ${country.health}`
    healthContainer.appendChild(element)
  })
  
  container.appendChild(healthContainer)
}


function topGenerosity(data, container) {
  const generosityContainer = document.createElement('div')
  const generosityHeading = document.createElement('h3')
  generosityHeading.innerHTML = 'Countries Ranked By Generosity'
  generosityContainer.appendChild(generosityHeading)
  
  sortedByGenerosity = data.sort((countryOne, countryTwo) => countryTwo.generosity - countryOne.generosity)
  sortedByGenerosity.slice(0, 10).forEach((country, index) => {
    const element = document.createElement('p')
    element.innerHTML = `${index + 1}. ${country.country} - ${country.generosity}`
    generosityContainer.appendChild(element)
  })
  
  container.appendChild(generosityContainer)
}


function challengeFour(data) {
  const container = document.getElementById('challenge-four')

  const graphHeading = document.createElement('h2')
  graphHeading.innerHTML = 'Country Ranking Visualization'
  container.appendChild(graphHeading)

  const legend = document.createElement('h4')
  legend.innerHTML = 'Each graph shows countries ordered by their Overall Rank. Hover squares for individual statistics.'
  legend.style.color = 'grey'
  container.appendChild(legend)

  sortedByRank = data.sort((countryOne, countryTwo) => countryOne.rank - countryTwo.rank)

  visualizationGDP(sortedByRank, container)
  visualizationSupport(sortedByRank, container)
  visualizationHealth(sortedByRank, container)
  visualizationGenerosity(sortedByRank, container)
}


function visualizationGDP(data, container) {
  const dataContainer = document.createElement('div')

  const heading = document.createElement('h3')
  heading.innerHTML = 'Countries Shown by GDP'
  container.appendChild(heading)

  let elements = []
  data.forEach((country) => {
    const element = document.createElement('div')
    element.style.height = '40px'
    element.style.width = '40px'
    element.style.backgroundColor = `hsl(${(country.gdp * (0 - 100)) + 130}, 100%, 45%)`
    element.title = `${country.country} - GDP: ${country.gdp}`
    elements.push(element)
    dataContainer.appendChild(element)
  })

  container.appendChild(dataContainer)
}


function visualizationSupport(data, container) {
  const dataContainer = document.createElement('div')

  const heading = document.createElement('h3')
  heading.innerHTML = 'Countries Shown by Access to Social Services'
  container.appendChild(heading)

  let elements = []
  data.forEach((country) => {
    const element = document.createElement('div')
    element.style.height = '40px'
    element.style.width = '40px'
    element.style.backgroundColor = `hsl(${(country.support * (0 - 100)) + 150}, 100%, 45%)`
    element.title = `${country.country} - Support Score: ${country.support}`
    elements.push(element)
    dataContainer.appendChild(element)
  })

  container.appendChild(dataContainer)
}


function visualizationHealth(data, container) {
  const dataContainer = document.createElement('div')

  const heading = document.createElement('h3')
  heading.innerHTML = 'Countries Shown by Life Expectancy'
  container.appendChild(heading)

  let elements = []
  data.forEach((country) => {
    const element = document.createElement('div')
    element.style.height = '40px'
    element.style.width = '40px'
    element.style.backgroundColor = `hsl(${(country.health * (0 - 100)) + 130}, 100%, 45%)`
    element.title = `${country.country} - Health Score: ${country.health}`
    elements.push(element)
    dataContainer.appendChild(element)
  })

  container.appendChild(dataContainer)
}


function visualizationGenerosity(data, container) {
  const dataContainer = document.createElement('div')

  const heading = document.createElement('h3')
  heading.innerHTML = 'Countries Shown by Generosity'
  container.appendChild(heading)

  let elements = []
  data.forEach((country) => {
    const element = document.createElement('div')
    element.style.height = '40px'
    element.style.width = '40px'
    element.style.backgroundColor = `hsl(${(country.generosity * (0 - 100)) + 50}, 100%, 45%)`
    element.title = `${country.country} - Generosity: ${country.generosity}`
    elements.push(element)
    dataContainer.appendChild(element)
  })

  container.appendChild(dataContainer)
}


getData()