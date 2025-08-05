const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function getUserChoice() {
  return new Promise(resolve => {
    rl.question('\nMake your choice:\nPress [1] for Rock, [2] for Paper, [3] for Scissors\n>> ', choice => {
      const userChoice = parseInt(choice.trim());
      if (userChoice >= 1 && userChoice <= 3) {
        resolve(userChoice);
      } else {
        console.log('Invalid choice. Please try again.');
        resolve(getUserChoice());
      }
    });
  });
}

function getComputerChoice() {
  return Math.floor(Math.random() * 3) + 1;
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return 'It\'s a tie!';
  } else if ((userChoice === 1 && computerChoice === 3) ||
             (userChoice === 2 && computerChoice === 1) ||
             (userChoice === 3 && computerChoice === 2)) {
    return 'You win!';
  } else {
    return 'Computer wins!';
  }
}

async function playGame() {
  const userChoice = await getUserChoice();
  const computerChoice = getComputerChoice();
  console.log(`\nYou chose: ${['Rock', 'Paper', 'Scissors'][userChoice - 1]}`);
  console.log(`Computer chose: ${['Rock', 'Paper', 'Scissors'][computerChoice - 1]}`);
  console.log(determineWinner(userChoice, computerChoice));
  rl.question('\nPlay again? Y(es)/N(o)\n>>', answer => {
    if (answer.toLowerCase() === 'y') {
      playGame();
    } else {
      rl.close();
    }
  });
}

playGame();
