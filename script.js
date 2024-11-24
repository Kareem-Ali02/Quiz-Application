const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctAnswer: 1
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Fe", "Au", "Cu"],
      correctAnswer: 2
    }
  ];
  
  class Quiz {
    constructor() {
      this.score = 0;
      this.currentQuestion = 0;
      this.initElements();
      this.initEventListeners();
      this.showScreen('title-screen');
    }
  
    initElements() {
      this.screens = {
        title: document.getElementById('title-screen'),
        quiz: document.getElementById('quiz-screen'),
        results: document.getElementById('results-screen')
      };
      this.questionText = document.getElementById('question-text');
      this.optionsContainer = document.getElementById('options-container');
      this.progressBar = document.getElementById('progress-bar');
      this.nextButton = document.getElementById('next-btn');
    }
  
    initEventListeners() {
      document.getElementById('start-btn').addEventListener('click', () => this.startQuiz());
      this.nextButton.addEventListener('click', () => this.nextQuestion());
      document.getElementById('retry-btn').addEventListener('click', () => this.resetQuiz());
    }
  
    showScreen(screenId) {
      document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
      document.getElementById(screenId).classList.add('active');
    }
  
    startQuiz() {
      this.score = 0;
      this.currentQuestion = 0;
      this.showScreen('quiz-screen');
      this.displayQuestion();
    }
  
    displayQuestion() {
      const question = questions[this.currentQuestion];
      this.questionText.textContent = question.question;
      this.optionsContainer.innerHTML = '';
      this.nextButton.disabled = true;
  
      // Update progress bar
      const progress = (this.currentQuestion / questions.length) * 100;
      this.progressBar.style.width = `${progress}%`;
  
      // Create option buttons
      question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => this.checkAnswer(index));
        this.optionsContainer.appendChild(button);
      });
    }
  
    checkAnswer(selectedIndex) {
      const question = questions[this.currentQuestion];
      const options = this.optionsContainer.children;
  
      // Disable all options after selection
      Array.from(options).forEach(option => {
        option.style.pointerEvents = 'none';
      });
  
      // Show correct and wrong answers
      options[question.correctAnswer].classList.add('correct');
      if (selectedIndex !== question.correctAnswer) {
        options[selectedIndex].classList.add('wrong');
      } else {
        this.score++;
      }
  
      this.nextButton.disabled = false;
    }
  
    nextQuestion() {
      this.currentQuestion++;
      
      if (this.currentQuestion < questions.length) {
        this.displayQuestion();
      } else {
        this.showResults();
      }
    }
  
    showResults() {
      this.showScreen('results-screen');
      const percentage = (this.score / questions.length) * 100;
      document.getElementById('final-score').textContent = 
        `${this.score}/${questions.length} (${percentage}%)`;
      
      const message = document.getElementById('performance-message');
      if (percentage >= 80) {
        message.textContent = "Excellent! You're a quiz master! 🏆";
      } else if (percentage >= 60) {
        message.textContent = "Good job! Keep it up! 👍";
      } else {
        message.textContent = "Keep practicing, you'll get better! 💪";
      }
    }
  
    resetQuiz() {
      this.score = 0;
      this.currentQuestion = 0;
      this.progressBar.style.width = '0%';
      this.showScreen('title-screen');
    }
  }
  
  // Initialize the quiz when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    new Quiz();
  });