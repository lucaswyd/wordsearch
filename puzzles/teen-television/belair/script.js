        $(document).ready(function() {
            // Word list
            var words = [
                'Fresh',
                'Prince',
                'Bel-Air',
                'Banks',
                'Carlton',
                'Hillary',
                'Philip',
                'Ashley',
                'Vivian',
                'Geoffrey',
                'Nicky',
                'Jazzy Jeff',
                'Will Smith',
                'Mansion',
                'Pool House'
            ];

            // Word search puzzle generator function
            function generateWordSearch(words) {
                // Shuffle the words randomly
                words = shuffle(words);

                // Word search grid size
                var gridSize = 12;

                // Generate the grid
                var grid = generateGrid(gridSize);

                // Place the words in the grid
                placeWords(grid, words);

                // Display the grid on the page
                displayGrid(grid);
            }

            // Function to shuffle an array
            function shuffle(array) {
                var currentIndex = array.length,
                    temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // Swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;
            }

            // Function to generate an empty grid
            function generateGrid(size) {
                var grid = [];
                for (var i = 0; i < size; i++) {
                    grid[i] = [];
                    for (var j = 0; j < size; j++) {
                        grid[i][j] = '';
                    }
                }
                return grid;
            }

            // Function to place words in the grid
            function placeWords(grid, words) {
                var gridSize = grid.length;
                var directions = [
                    [0, 1],  // Right
                    [1, 0],  // Down
                    [0, -1], // Left
                    [-1, 0], // Up
                    [1, 1],  // Diagonal down-right
                    [-1, -1],// Diagonal up-left
                    [1, -1], // Diagonal down-left
                    [-1, 1]  // Diagonal up-right
                ];

                for (var i = 0; i < words.length; i++) {
                    var word = words[i];
                    var placed = false;

                    while (!placed) {
                        var direction = directions[Math.floor(Math.random() * directions.length)];
                        var row = Math.floor(Math.random() * gridSize);
                        var col = Math.floor(Math.random() * gridSize);
                        var wordFits = true;

                        if (grid[row][col] === '') {
                            for (var j = 0; j < word.length; j++) {
                                var newRow = row + j * direction[0];
                                var newCol = col + j * direction[1];

                                if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                                    if (grid[newRow][newCol] === '' || grid[newRow][newCol] === word[j]) {
                                        continue;
                                    } else {
                                        wordFits = false;
                                        break;
                                    }
                                } else {
                                    wordFits = false;
                                    break;
                                }
                            }

                            if (wordFits) {
                                for (var k = 0; k < word.length; k++) {
                                    var newRow = row + k * direction[0];
                                    var newCol = col + k * direction[1];
                                    grid[newRow][newCol] = word[k];
                                }
                                placed = true;
                            }
                        }
                    }
                }
            }

            // Function to display the grid on the page
            function displayGrid(grid) {
                var gridSize = grid.length;
                var wordsearchBoard = $('#wordsearch-board');
                wordsearchBoard.empty();

                for (var i = 0; i < gridSize; i++) {
                    var row = $('<div class="wordsearch-row"></div>');
                    for (var j = 0; j < gridSize; j++) {
                        var cell = $('<div class="wordsearch-cell"></div>');
                        cell.text(grid[i][j]);
                        row.append(cell);
                    }
                    wordsearchBoard.append(row);
                }
            }

            // Generate the word search puzzle
            generateWordSearch(words);
        });
