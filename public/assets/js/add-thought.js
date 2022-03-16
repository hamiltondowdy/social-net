const $thoughtText = document.querySelector('#thought-text');
const $username = document.querySelector('#username');
const $createdAt = document.querySelector('#created-at');
const $reactionSection = document.querySelector('#reaction-section');
const $newReactionForm = document.querySelector('#new-reaction-form');

let thoughtId;

function getThought() {

    const searchParams = new URLSearchParams(document.location.search.substring(1));
    const thoughtId = searchParams.get('id');

    fetch(`/api/thoughts/${thoughtId}`)
    .then(response => {
        console.log(response);
        if (!response.ok) {
            console.log('success');
            throw new Error({ message: 'oops'});
        }

        return response.json();
    })
    .then(printThought)
    .catch(err => {
        console.log(err);
        alert('double oops, no thought with this id');
    });
}

function printThought(thoughtData) {
    console.log(thoughtData);

    thoughtId = thoughtData._id;

    const { thoughtText, username, createdAt, reactions } = thoughtData;

    $thoughtText.textContent = thoughtText;
    $username.textContent = username;
    $createdAt.textContent = createdAt;
    
    if(reactions && reactions.length) {
        reactions.forEach(printReaction);
    } else {
        $reactionSection.innerHTML = '<h4 class="bg-dark p-3 rounded">No comments yet!</h4>';
    }
}

function printReaction(reaction) {
    const reactionDiv = document.createElement('div');
    reactionDiv.classList.add('my-2', 'card', 'p-2', 'w-100', 'text-dark', 'rounded');

    const reactionContent = `<h5 class="text-dark">${reaction.writtenBy} reacted to ${reaction.createdAt}:</h5>
    <p>${reaction.reactionBody}</p>
`;

reactionDiv.innerHTML = reactionContent;
$reactionSection.prepend(reactionDiv);
}

function handleNewReactionSubmit(event) {
    event.preventDefault();
  
    const reactionBody = $newReactionForm.querySelector('#reaction').value;
    const writtenBy = $newReactionForm.querySelector('#written-by').value;
  
    if (!reactionBody || !writtenBy) {
      return false;
    }
  
    const formData = { reactionBody, writtenBy };
  
    fetch(`/api/thoughts/${thoughtId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        response.json();
      })
      .then(reactionResponse => {
        console.log(reactionResponse);
        // location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  $newReactionForm.addEventListener('submit', handleNewReactionSubmit);
  
  getThought();