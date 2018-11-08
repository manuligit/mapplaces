//  * * * * * * * * * * * * * * * * * * * * * * * 
//  *  V I E W S                                *
//  * * * * * * * * * * * * * * * * * * * * * * * 

// Form for adding a new place
function createForm() {
  return `<div>
            <form class="createForm" onsubmit="addPlace();">
              <div>
                <label htmlFor="title">
                  Title
                </label>
                <input id="title" type="text" name="title" value="a" required />
              </div>
              <div>
                <label htmlFor="description">
                  Description
                </label>
                <br />
                <textarea id="description" name="description" rows="5" cols="40" required>a</textarea>
              </div>
              <div>
                <label htmlFor="coords">
                  Coordinates
                </label>
                <input id="latitude" type="text" name="latitude" placeholder="Latitude" required value="a" />
                <input id="longitude" type="text" name="longitude" placeholder="Longitude" required value="a" />
              </div>
              <div>
                <label htmlFor="hours">
                  Opening hours
                </label>
                <br />
                <input id="opens_at" type="time" name="opens_at" placeholder="Opening time" value="13:30" required />-
                <input id="closes_at" type="time" name="closes_at" placeholder="Closing time"  value="14:30" required />
              </div>
              <input type="submit" value="Add Place"/>
            </form>
          </div>`
}

// Form for editing an existing place
function editForm(place) {
  return `<div>
            <form class="editForm" onsubmit="editPlace(${place.id});">
              <div>
                <label htmlFor="title">
                  Title
                </label>
                <input id="title" type="text" name="title" value="${place.title}" required />
              </div>
              <div>
                <label htmlFor="description">
                  Description
                </label>
                <br />
                <textarea id="description" name="description" rows="5" cols="40" required>${place.description}</textarea>
              </div>
              <div>
                <label htmlFor="coords">
                  Coordinates
                </label>
                <input id="latitude" type="text" name="latitude" placeholder="Latitude" value=${place.latitude} required />
                <input id="longitude" type="text" name="longitude" placeholder="Longitude" value=${place.longitude} required />
              </div>
              <div>
                <label htmlFor="hours">
                  Opening hours
                </label>
                <br />
                <input id="opens_at" type="time" name="opens_at" placeholder="Opening time" value=${place.opens_at} required />-
                <input id="closes_at" type="time" name="closes_at" placeholder="Closing time" value=${place.closes_at} required />
              </div>
              <input type="submit" value="Edit Place"/>
            </form>
          </div>`
}


function largeFormBlock() {
  return createForm();
}

function formBlock() {
  return `<div class="formBlock block">
            <button id="formBlock" class="menu" value="small" onclick="toggleBlock2();">+</button>
            <h3>Add or edit a place</h3>
            <div id="formContainer"></div>
          </div>`
}

// Toggle between the small and large form block:
function toggleBlock2() {
  event.preventDefault();
  if (event.target.value === "small") {
    event.target.value = "big";
    document.querySelector('#formContainer').innerHTML= largeFormBlock();
  } else {
    event.target.value = "small";
    document.querySelector('#formContainer').innerHTML= '';
  }
}