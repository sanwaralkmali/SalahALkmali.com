let game_container = document.getElementById("game-container");

document.getElementById('millionaire-game-btn').addEventListener('click', function () {
    document.getElementById('text001').style.display = 'block';
});

document.getElementById('quizizz-game-btn').addEventListener('click', function () {
    document.getElementById('text002').style.display = 'block';
});

document.getElementById('close-memory-game').addEventListener('click', function () {
    location.reload();
});

let memory_game_btn = document.getElementById('memory-game-btn');
memory_game_btn.addEventListener('click', function () {
    game_container.classList.toggle('hide');
    document.getElementById('games-card').classList.toggle('hide');
    document.getElementById('loader').classList.toggle('hide');
    setTimeout(function () {
        document.getElementById('loader').classList.toggle('hide');
        document.getElementById('memory-game').classList.toggle('hide');
    }, 1500);
});

function updateTopics() {
    const grade = document.getElementById("grades").value;
    const topics = document.getElementById("topics");
    if (grade) {
        topics.disabled = false;
        const topicsByGrade = {
            1: ["Numbers to 20", "Shapes and Space", "Addition", "Subtraction", "Time", "Money", "Measurement", "Patterns"],

            2: ["Counting in groups", "Counting in 10s", "Addition", "Subtraction", "Pattern", "Lines", "Tens & Ones",
                "Place Value", "Measurement", "Geometry"
            ],

            3: ["Multiplication", "Division", "Fractions", "Addition & Subtraction (larger numbers)", "Geometry", "Measurement",
                "Time", "Money", "Data & Graphs"
            ],

            4: ["Multi-digit Multiplication", "Long Division", "Fractions", "Decimals", "Geometry", "Measurement", "Data & Graphs",
                "Patterns"
            ],

            5: ["Fractions (addition, subtraction, multiplication, division)", "Decimals", "Percentage", "Geometry", "Volume",
                "Measurement", "Data & Graphs", "Problem Solving"
            ],

            6: ["Ratios and Proportional Relationships", "Integers", "Fractions & Decimals", "Geometry", "Statistics",
                "Algebraic Expressions", "Equations and Inequalities"
            ],

            7: ["Proportional Reasoning", "Integers", "Algebraic Expressions & Equations", "Geometry", "Fractions, Decimals, & Percents",
                "Probability & Statistics", "Rational Numbers"
            ],

            8: ["Linear Equations & Functions", "Systems of Linear Equations", "Exponents & Scientific Notation", "Geometry",
                "Irrational Numbers", "Pythagorean Theorem", "Transformations"
            ],

            9: ["Algebra I", "Linear Equations & Inequalities", "Systems of Equations & Inequalities", "Polynomials", "Factoring",
                "Quadratic Functions & Equations", "Radical Expressions"
            ],

            10: ["Geometry", "Congruence & Similarity", "Circles", "Coordinate Geometry", "Trigonometry", "Three-Dimensional Geometry",
                "Geometric Constructions"
            ],

            11: ["Algebra II", "Functions", "Polynomial & Rational Functions", "Exponential & Logarithmic Functions",
                "Trigonometric Functions", "Probability & Statistics", "Sequences & Series"
            ],

            12: ["Pre-Calculus" ,"Complex Number Arithmetic", "Linear, quadratic, and polynomial equations, and systems of equations", "Rational Functions", "Exponential & Logarithmic Functions",
                "Trigonometric Functions", "Inequalities & Systems of Inequalities", "Limits & Continuity", "Differentiation (rules, techniques, and applications)", "Integration (rules, techniques, and applications)"
            ],
        };

        topics.innerHTML = '<option value="">Select a topic</option>';

        for (const topic of topicsByGrade[grade] || []) {
            const option = document.createElement("option");
            option.value = option.textContent = topic;
            topics.appendChild(option);
        }
    } else {
        topics.disabled = true;
        topics.innerHTML = '<option value="">Select a topic</option>';
    }
}


document.getElementById("grades").addEventListener("change", updateTopics);