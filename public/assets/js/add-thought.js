const $thoughtForm = document.querySelector('#thought-form');



const handleThoughtSubmit = event => {
  event.preventDefault();

  const thoughtText = $thoughtForm.querySelector('#thought-text').value;
  const createdBy = $thoughtForm.querySelector('#created-by').value;
  const createdAt = $thoughtForm.querySelector('#created-at').value;
  
  if (!thoughtText || !createdBy || !createdAt) {
    return;
  }

  const formData = { pizzaName, createdBy, createdAt };

  fetch('/api/thoughts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(postResponse => {
      console.log(postResponse);
    })
    .catch(err => {
      console.log(err);
      saveRecord(formData);
      // DO INDEXED DB STUFF HERE
    });
};

$thoughtForm.addEventListener('submit', handleThoughtSubmit);