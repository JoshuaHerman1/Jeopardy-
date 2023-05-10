// Function to get categories from the jService API
function getCategories() {
    return $.ajax({
      url: "http://jservice.io/api/categories?count=6",
      dataType: "json"
    });
  }
  
  // Function to get questions for a given category
  function getQuestions(categoryId) {
    return $.ajax({
      url: `http://jservice.io/api/clues?category=${categoryId}`,
      dataType: "json"
    });
  }
  
  $(document).ready(function() {
    // Get categories
    getCategories().done(function(categories) {
      categories.forEach(function(category) {
        let $category = $(`
          <div class="category">
            <h2>${category.title.toUpperCase()}</h2>
          </div>
        `);
  
        // Get questions for each category
        getQuestions(category.id).done(function(questions) {
          for (let i = 0; i < 5; i++) {
            let question = questions[Math.floor(Math.random() * questions.length)];
            let $question = $(`
              <div class="question">?</div>
            `);
            $question.click(function() {
              if ($(this).text() === "?") {
                $(this).text(question.question);
              } else if ($(this).text() === question.question) {
                $(this).text(question.answer);
              }
            });
            $category.append($question);
          }
        });
  
        $("#jeopardy").append($category);
      });
    });
  
    // Restart game when the "Restart" button is clicked
    $("#restart").click(function() {
      location.reload();
    });
  });

  var restartButton = document.querySelector('#restart-button');

  restartButton.addEventListener('click', function() {
    $.ajax({
      url: 'http://jservice.io/api/categories',
      data: { count: 100 },
      success: function(data) {
        // Shuffle the categories
        data = shuffle(data);
        
        // Get the first 6 categories
        data = data.slice(0, 6);
        
        var categories = document.querySelectorAll('.category');
    
        for (var i = 0; i < categories.length; i++) {
          categories[i].textContent = data[i].title.toUpperCase();
        }
        
        var questions = document.querySelectorAll('.question');
        
        questions.forEach(function(question) {
          var state = 'question';
          
          question.addEventListener('click', function() {
            var text = question.textContent;
            
            if (state === 'question') {
              question.textContent = text.replace('Question: ', 'Answer: ');
              state = 'answer';
            }
          });
          
          question.textContent = '?';
          state = 'question';
        });
      }
    });
  });
  
  // Function to shuffle an array
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    
    return array;
  }
  
