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

function generateIcon(){
  return `
  <img src = ${STORE[currentQuestion-1].icon} alt=${STORE[currentQuestion-1].alt}>`
}
function addIcon() {
  $(".icon").html(generateIcon());
  $("div").removeClass("remove")
  $("main").removeClass("main-noicon")
}

function eraseIcon(){
  $("div").addClass("remove")

}

function startQuiz() {
  $('main').html(generateQuestion());
  addIcon();
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
    eraseIcon();
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
    $("main").addClass("main-noicon")

  }
  else {
    ifAnswerWrong()
    $("main").addClass("main-noicon")
  }
}

function ifAnswerCorrect(){
  updateScore()
  $("main").html(function(){
    return `
      <h2> CONGRATULATIONS</h2> 
      <img src = "https://media2.giphy.com/media/Nszyp6d42uqd7ppDBi/200w.webp?cid=790b76115cbc972a5848456677599ec4">
      <p> Your knowledge of basketball is at an all time high. <p>
      <button value="Next" class= "next-button">Next</button>`
  })
}

function ifAnswerWrong(){
  $("main").html(function(){
    return `
      <h2> YOUR ANSWER IS WRONG </h2> 
      <img src="https://media0.giphy.com/media/ROjyrAKOhMMms/200w.webp?cid=790b76115cbc95d475464c396b38e63f">
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
    $("div").removeClass("remove")
    $("main").removeClass("main-noicon")
    addIcon();
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
function restartQuestionScore(){
  currentQuestion = 1
  $(".js-question").text(currentQuestion)
  score = 0;
  $(".js-score").text(score)
}


function handleRestartButton(){
  $('main').on("click", ".restart-button", 
  function() {
    event.preventDefault();
    restartQuestionScore();
    startQuiz();
    
    
    
    
  })
}

function createNbaQuiz(){
  handleEnterButton()
  handleSubmitButton()
  handleNextButton()
  handleRestartButton()
}

$(createNbaQuiz());