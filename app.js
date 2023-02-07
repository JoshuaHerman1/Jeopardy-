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
            <h2>${category.title}</h2>
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
