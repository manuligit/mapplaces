let db_places
let places
let keywords
let base_url = 'http://localhost:8000/api'

// Get the places data from backend <<
function getData () {
  console.log('getdata')
  return fetch(`${base_url}/places/`, { mode: 'cors' })
    .then(function (response) {
      return response.json()
    }).then((responseJson) => {
      // console.log(responseJson)
      return responseJson
    })
}

function getKeywordData () {
  return fetch(`${base_url}/keywords/`, { mode: 'cors' })
    .then(function (response) {
      return response.json()
    }).then((responseJson) => {
      // console.log(responseJson)
      return responseJson
    })
}

function addPlace () {
  event.preventDefault()
  // Send a fetch request with the parameters from the form
  const data = getFormData('.createForm')

  fetch(`${base_url}/places/`,
    {
      body: data,
      method: 'post'
    }).then((value) => {
    console.log('request sent: ' + value)
    update()
  })
  // if fails, add debugger
}

function editPlace (id) {
  event.preventDefault()
  console.log(id)

  const data = getFormData('.editForm')
  fetch(`${base_url}/places/${id}`,
    {
      body: data,
      method: 'put',
      mode: 'cors'
    }).then((value) => {
    console.log('request sent: ' + value)
    update()
  })
}

// Delete a place from the server:
function deletePlaceFromServer (id) {
  return fetch(`${base_url}/places/${id}`, { method: 'DELETE', mode: 'cors' })
    .then(
      console.log('Place deleted')
    )
}

export default { getData, getKeywordData, addPlace, deletePlaceFromServer }
