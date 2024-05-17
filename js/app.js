document
  .getElementById('playerForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const apiKey = '8ca5ce9d-33a4-40d9-8ffe-e0ade475a756';

    const url =
      'https://api.balldontlie.io/v1/players?https://api.balldontlie.io/v1/players/?ID';

    fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const player = data.data.find(
          (player) =>
            player.first_name === firstName && player.last_name === lastName
        );
        const playerInfoDiv = document.getElementById('playerInfo');

        if (player) {
          const playerHtml = `
                  <h2>Player Information</h2>
                  <p>Name: ${player.first_name} ${player.last_name}</p>
                  <p>Position: ${player.position}</p>
                  <p>Height: ${player.height}</p>
                  <p>Weight: ${player.weight}</p>
                  <p>Team: ${player.team.full_name}</p>
              `;
          playerInfoDiv.innerHTML = playerHtml;
        } else {
          playerInfoDiv.innerHTML = '<p>Player not found</p>';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
document.getElementById('clearButton').addEventListener('click', function () {
  document.getElementById('playerList').innerHTML = '';
  document.getElementById('playerInfo').innerHTML = '';
});
