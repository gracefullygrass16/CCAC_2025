document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.querySelector(".progress");
    const progressPercent = document.querySelector(".progress-percent");
    const questionContainer = document.querySelector(".quiz-questions");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");

    const choices = ["strongly-disagree", "disagree", "neutral", "agree", "strongly-agree"];
    const maxScore = 4; 
    const selections = {};

    const sensibilityQuestions = [
        "When discussing a project challenge, you focus on identifying practical solutions and actionable steps instead of engaging in lengthy theoretical discussions.",
        // "Before making key decisions, such as adjusting a team’s strategy, you actively consult with colleagues or stakeholders to gather diverse perspectives and ensure a well-rounded approach.",
        // "When pursuing a significant team goal, you break it down into clear, measurable milestones and regularly track progress to ensure the team stays on course.",
        // "Before responding in a conversation, you take the time to understand the other person’s perspective and emotions.",
        // "When faced with conflict, you focus on finding a fair resolution rather than reacting emotionally.",
        // "When giving feedback, you ensure it is clear, constructive, and aimed at helping the other person improve.",
        // "When project deadlines shift unexpectedly, you adjust your priorities and workflow without feeling overwhelmed.",
        // "In high-pressure situations, such as managing multiple urgent tasks at once, you stay focused and productive rather than feeling paralyzed by uncertainty.",
        // "When faced with a challenge that requires a new approach, such as a team strategy not working as planned, you are willing to experiment with alternative solutions instead of insisting on familiar methods.",
        // "When making decisions about team priorities or project direction, you refer to performance data and concrete facts rather than relying on emotional reactions or team sentiments.",
        // "You actively encourage discussions with team members who hold different viewpoints, using these debates to challenge your thinking and improve your leadership strategy.",
    ];

    const trustworthinessQuestions = [
        "When you realize you have made a mistake that others haven't noticed, you openly acknowledge it rather than hoping it goes unnoticed.",
        // "If a decision you made negatively impacts others, you take responsibility and communicate it instead of shifting blame.",
        // "You avoid exaggerating or twisting facts to make yourself or your work look better.",
        // "Your colleagues, peers, or teammates frequently confide in you with sensitive information or personal concerns.",
        // "People often rely on you to handle important responsibilities because they know you will follow through.",
        // "If an unexpected issue arises, you proactively update others rather than waiting until the last minute.",
        // "When a project or task under your leadership fails, you take ownership of what went wrong rather than deflecting blame onto others.",
        // "If a rule or guideline seems unfair, you voice your concerns through the proper channels rather than ignoring or bypassing it.",
        // "You proactively seek feedback on your performance and work to improve rather than becoming defensive.",
        // "When delegating a task, you provide clear expectations but allow the person to complete it in their own way.",
        // "If someone you trust makes a mistake, you give them a chance to correct it rather than assuming they are unreliable.",
        // "You are comfortable relying on others and do not feel the need to control every aspect of a project or task."
    ];

    const altruismQuestions = [
        "You regularly check in on your team members or peers to see how they are doing, both personally and professionally.",
        // "If you notice someone struggling, you offer assistance without waiting for them to ask.",
        // "You are willing to sacrifice personal recognition or rewards if it means benefiting the team as a whole.",
        // "You take on tasks that others may not want to do, as long as it benefits the team.",
        // "You believe a leader’s role is to enable and support others rather than to control or command them.",
        // "Rather than demanding high performance from others, you set an example by demonstrating it yourself.",
        // "When you achieve success, you share the credit with those who contributed instead of taking all the recognition.",
        // "You are open to learning from those who have less experience than you.",
        // "You can admit when you don’t know something and seek guidance from others without feeling insecure.",
        // "When making decisions, you prioritize what is best for the team over personal preferences.",
        // "You feel more satisfaction from seeing your team succeed than from individual achievements.",
        // "If a tough situation arises, you put the team's needs ahead of your own comfort or convenience."
    ];
    
    const resilienceQuestions = [
        "You are willing to make a decision that benefits the greater good, even if it upsets some people in the short term.",
        // "You stand by your principles, even when facing pressure to conform or compromise.",
        // "When making tough choices, you prioritize long-term impact over immediate approval.",
        // "When faced with a significant setback in a project, you encourage your team by highlighting potential solutions and focusing on the progress made, rather than dwelling on the problem.",
        // "During tough times or after failures, you maintain a positive outlook and reassure your team that they have the ability to overcome the challenges ahead.",
        // "You help your team members see the long-term benefits or lessons in difficult situations, motivating them to continue pushing forward despite immediate struggles.",
        // "You do not let criticism or failure discourage you from pursuing your goals.",
        // "You remain confident and determined even when facing significant resistance or hardship.",
        // "You take difficult feedback as a chance to improve rather than a personal attack.",
        // "You would rather attempt something challenging and risk failure than avoid trying at all.",
        // "When facing a tough task, you keep pushing forward even when progress is slow or difficult.",
        // "You embrace constructive criticism and setbacks as part of the learning process."
    ];
    
    const selfDisciplineQuestions = [
        "When faced with frustration or disappointment, you manage your emotions instead of reacting impulsively.",
        // "You do not let personal setbacks affect your ability to stay focused on your responsibilities.",
        // "You recognize when emotions are clouding your judgment and take steps to regain control before making decisions.",
        // "You maintain consistent routines and habits, even when motivation is low.",
        // "You lead by example, demonstrating the discipline you expect from others.",
        // "When enforcing discipline in a team or group, you do so fairly and consistently, without favoritism.",
        // "You stand by your values, even when doing so is inconvenient or difficult.",
        // "You refuse to cut corners or compromise on ethics, even if no one would notice.",
        // "You speak up when you see unethical behavior, even if it puts you in an uncomfortable position.",
        // "You hold yourself to high standards of behavior, even when no one is watching.",
        // "You are mindful of how your actions and words reflect on your team, organization, or community.",
        // "You act as a role model for others, demonstrating professionalism, respect, and integrity in all situations."
    ];

    let currentPage = 0;
    const pageSize = 5;
    const allQuestions = [...sensibilityQuestions, ...trustworthinessQuestions, ...altruismQuestions, ...selfDisciplineQuestions, ...resilienceQuestions];
    const totalQuestions = allQuestions.length;
    const totalPages = Math.ceil(totalQuestions / pageSize);

    function renderQuestions() {
        questionContainer.innerHTML = "";
        const start = currentPage * pageSize;
        const end = start + pageSize;
        const pageQuestions = allQuestions.slice(start, end);

        pageQuestions.forEach((questionText, index) => {
            const questionIndex = start + index;
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question", "unattempted");

            const questionDivText = document.createElement("div");
            questionDivText.textContent = questionText;
            questionDivText.classList.add("the-question-text");

            const answerOptions = document.createElement("div");
            answerOptions.classList.add("answer-options");

            choices.forEach((choice, choiceIndex) => {
                const option = document.createElement("span");
                option.classList.add("option", choice);
                option.setAttribute("tabindex", "0");

                option.addEventListener("click", () => handleSelection(option, questionDiv, questionIndex, choiceIndex));
                option.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        handleSelection(option, questionDiv, questionIndex, choiceIndex);
                    }
                });

                answerOptions.appendChild(option);
            });

            questionDiv.appendChild(questionDivText);
            questionDiv.appendChild(answerOptions);
            questionContainer.appendChild(questionDiv);
        });

        updateNextButton();
        updateSubmitButton();
    }

    //for scrolling effect
    function smoothScrollToElement(element, duration) {
        const start = window.scrollY;
        const headerOffset = 130;
        const target = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        const change = target - start;
        const startTime = performance.now();
    
        function animateScroll(timestamp) {
            const progress = (timestamp - startTime) / duration;
            if (progress < 1) {
                window.scrollTo(0, start + change * progress);
                requestAnimationFrame(animateScroll);
            } else {
                window.scrollTo(0, target);
            }
        }
    
        requestAnimationFrame(animateScroll);
    }
    

    function handleSelection(option, questionDiv, questionIndex, score) {
        questionDiv.classList.remove("unattempted");
        questionDiv.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
        option.classList.add("selected");
        selections[questionIndex] = score;
        updateProgress();
        updateNextButton();
        updateSubmitButton();

        //for scrolling effect
        const nextQuestion = questionDiv.nextElementSibling;
        if (nextQuestion) {
            smoothScrollToElement(nextQuestion, 500); // duration in milliseconds
        }
    }

    function updateProgress() {
        const progress = (Object.keys(selections).length / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
        progressPercent.textContent = `${Math.round(progress)}%`;
    }

    function updateNextButton() {
        const pageStart = currentPage * pageSize;
        const pageEnd = pageStart + pageSize;
        const answeredInPage = Object.keys(selections).filter(index => index >= pageStart && index < pageEnd).length;
        nextBtn.classList.toggle("hidden", !(answeredInPage === pageSize && currentPage < totalPages - 1));
    }

    function updateSubmitButton() {
        submitBtn.classList.toggle("hidden", Object.keys(selections).length !== totalQuestions);
    }

    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            renderQuestions();
        }
    });

    submitBtn.addEventListener("click", () => {
        console.log("Submit button clicked");  // Debugging log
        submitResults();
    });    

    const submitResults = async () => {
        let sensibilityScore = 0, trustworthinessScore = 0, altruismScore = 0, selfDisciplineScore = 0, resilienceScore = 0;

        const sensibilityEnd = sensibilityQuestions.length;
        const trustworthinessEnd = sensibilityEnd + trustworthinessQuestions.length;
        const altruismEnd = trustworthinessEnd + altruismQuestions.length;
        const selfDisciplineEnd = altruismEnd + selfDisciplineQuestions.length;
        const resilienceEnd = totalQuestions;

        Object.keys(selections).forEach(index => {
            const score = selections[index];
            if (index < sensibilityEnd) sensibilityScore += score;
            else if (index < trustworthinessEnd) trustworthinessScore += score;
            else if (index < altruismEnd) altruismScore += score;
            else if (index < selfDisciplineEnd) selfDisciplineScore += score;
            else if (index < resilienceEnd) resilienceScore += score;
        });

        const normalizedScores = [
            Math.round((sensibilityScore / (maxScore * sensibilityQuestions.length)) * 100),
            Math.round((trustworthinessScore / (maxScore * trustworthinessQuestions.length)) * 100),
            Math.round((altruismScore / (maxScore * altruismQuestions.length)) * 100),
            Math.round((selfDisciplineScore / (maxScore * selfDisciplineQuestions.length)) * 100),
            Math.round((resilienceScore / (maxScore * resilienceQuestions.length)) * 100)
        ];

        // Prepare the results payload
        const results = {
            selections: selections,
            normalized_scores: normalizedScores,
            collection_type: sessionStorage.getItem('reviewType') || 'self',
            reviewer_name: sessionStorage.getItem('reviewerName') || '',
            reviewee_name: sessionStorage.getItem('revieweeName') || 'Self',
            cca: sessionStorage.getItem('cca') || ''
        };

        fetch("/submit-results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(results)
        })

        // Note: the data structure sent to backend (json)

        // {
        //     "selections": {
        //         "0": 3,
        //         "1": 2,
        //         "2": 4,
        //         ...
        //     },
        //     "collection": "self",
        //     "normalized_scores": [75, 82, 64, 91, 73]
        // }

    
        .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         // Redirect to the results page with the scores
        //         const scores = normalizedScores.join(',');
        //         window.location.href = `/results?scores=${scores}`;
        //     } else {
        //         alert("An error occurred while submitting the quiz. Please try again.");
        //     }
        // })
        .then(data => {
            if (data.success) {
                // Now using the scores from server response
                window.location.href = `/results?id=${data.result_id}`;
            } else {
                alert("Submission failed: " + data.message);
            }
        })

        .catch(error => console.error("Error submitting quiz:", error));
    }

    renderQuestions();
});
