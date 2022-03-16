let db;

const request = indexedDB.open('social_net', 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;

    db.createObjectStore('new_thought', { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.online) {

    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

function saveRecord(record) {
    const transaction = db.transaction(['new_thought'], 'readwrite');

    const thoughtObjectStore = transaction.objectStore('new_thought');

    thoughtObjectStore.add(record);
};

function uploadThought() {
    const transaction = db.transaction(['new_thought'], 'readwrite');

    const thoughtObjectStore = transaction.objectStore('new_thought');

    const getAll = thoughtObjectStore.getAll();

// upon a successful .getAll() execution, run this function
getAll.onsuccess = function() {
    // if there was data in indexedDb's store, let's send it to the api server
    if (getAll.result.length > 0) {
      fetch('/api/thoughts', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(serverResponse => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // open one more transaction
          const transaction = db.transaction(['new_thought'], 'readwrite');
          // access the new_pizza object store
          const thoughtObjectStore = transaction.objectStore('new_thought');
          // clear all items in your store
          thoughtObjectStore.clear();

          alert('All saved thought has been submitted!');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
}

  window.addEventListener('online', uploadThought);