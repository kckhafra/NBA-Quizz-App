let currentQuestion = 1;
let score = 0;

function generateQuestion() {
  return `
    <form class="form-questions">
      <fieldset>
        <legend>NBA Questions</legend>
        <section class = "question"> ${STORE[currentQuestion-1].question} </section>
        
        <label>
          <input type="radio" value="${STORE[currentQuestion-1].answers[0]}" name="answers" required></input>
          <span class = "answer-choice">${STORE[currentQuestion-1].answers[0]} </span>
        </label>

        <label>
          <input type="radio" value="${STORE[currentQuestion-1].answers[1]}" name="answers" required></input>
          <span class = "answer-choice">${STORE[currentQuestion-1].answers[1]} </span>
        </label>

        <label>
            <input type="radio" value="${STORE[currentQuestion-1].answers[2]}" name="answers" required></input>
            <span class = "answer-choice">${STORE[currentQuestion-1].answers[2]} </span>
        </label>

        <label>
          <input type="radio" value="${STORE[currentQuestion-1].answers[3]}" name="answers" required></input>
          <span class = "answer-choice">${STORE[currentQuestion-1].answers[3]} </span>
        </label>
      </fieldset>
      
      <button type="submit" value="submit" class= "submit-button">Submit</button>
    </form>`;   
}

function startQuiz() {
  $('main').html(generateQuestion());
}

function handleEnterButton(){
  $(".enter-button").on("click", function(){
     updateQuestion()
    startQuiz();
  })
}

function handleSubmitButton() {
    $("main").on("submit", function(){ 
    event.preventDefault();
   
    handleUserAnswer()
    
  })
}
/*let correctAnswer = STORE[currentQuestion-1].answers[STORE[currentQuestion-1].correctAnswer]*/
function handleUserAnswer() {
  let selectedAnswer = $("input:checked").val();
  console.log(selectedAnswer)
  let correctAnswer = `${STORE[currentQuestion - 1].correctAnswer}`;
  console.log(correctAnswer)
  if (selectedAnswer===correctAnswer) {
    ifAnswerCorrect() 
  }
  else {
    ifAnswerWrong()
  }
}

function ifAnswerCorrect(){
  updateScore()
  $("main").html(function(){
    return `
      <h2> CONGRATULATIONS</h2> 
      <p> Your knowledge of basketball is at an all time high. <p>
      <button value="Next" class= "next-button">Next</button>`
  })
}

function ifAnswerWrong(){
  $("main").html(function(){
    return `
      <h2> YOUR ANSWER IS WRONG </h2> 
      <p> The correct answer is ${STORE[currentQuestion-1].correctAnswer}<p>
      <button value="Next" class= "next-button">Next</button>`
  })
}

function handleNextButton(){
  $("main").on("click", '.next-button', function(){
    if ( currentQuestion < STORE.length) { 
    event.preventDefault();
    iterateQuestion();
    $('main').html(generateQuestion());
    updateQuestion()
    }
   else {
    results()
  }
  });
}

function iterateQuestion() {
    currentQuestion++;
  }
function changeScore() {
  score++;
}

function updateScore(){
  changeScore()
    $(".js-score").text(score)
}

function updateQuestion(){
  currentQuestion+
  $(".js-question").text(currentQuestion);
}


function results() {
  $("main").html(function(){
    if(score < 4) {
    return `<h2 class = "end-score"> Your score is ${score}/10</h2> 
    <p>You must study the game more. You can't be great unless you study the past greats.</p>
      <button class= "restart-button">Restart</button>`
    }
    else if (score <= 6) {
    return `<h2 class = "end-score"> Your score is ${score}/10</h2> 
    <p>You are well on your way to be a expert of the game. Continue to study and you will reacch greatness.</p>
      <button class= "restart-button">Restart</button>`
    }

    else  {
    return `<h2 class = "end-score"> Your score is ${score}/10</h2> 
    <p>You are a true student of the game. </p>
      <button class= "restart-button">Restart</button>`
    }

  })
}

function handleRestartButton(){
  $('main').on("click", ".restart-button", 
  function() {
    location.reload();
    
  })
}

function createNbaQuiz(){
  handleEnterButton()
  handleSubmitButton()
  handleNextButton()
  handleRestartButton()
}

$(createNbaQuiz());