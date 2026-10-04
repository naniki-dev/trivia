// ---------------------------------------------------------------
// type 'choice': needs `options` (array) and `answer` (one of them)
// type 'text':   `answer` can be a string or an array of accepted
//                answers. Capitalisation and extra spaces are ignored.
// explanation:   optional "teacher's note" shown after answering
// ---------------------------------------------------------------
const questions = [
    {
        type: 'choice',
        question: 'Which party won the 1948 general election and began introducing apartheid?',
        options: ['National Party', 'United Party', 'Labour Party', 'Liberal Party'],
        answer: 'National Party',
        explanation: 'Under D.F. Malan, the National Party began passing apartheid laws, including the Population Registration Act and the Group Areas Act in 1950.'
    },
    {
        type: 'text',
        question: 'What was the name of the document adopted at the Congress of the People in Kliptown in 1955?',
        answer: ['Freedom Charter', 'The Freedom Charter'],
        explanation: 'Adopted on 26 June 1955, the Freedom Charter set out a vision of a non-racial, democratic South Africa and guided the liberation movement for decades.'
    },
    {
        type: 'choice',
        question: 'In which year did the Sharpeville massacre take place?',
        options: ['1948', '1955', '1960', '1976'],
        answer: '1960',
        explanation: 'On 21 March 1960, police opened fire on a pass-law protest and killed 69 people. The ANC and PAC were banned soon afterwards.'
    },
    {
        type: 'text',
        question: 'Which trial ended in 1964 with Nelson Mandela and seven others sentenced to life imprisonment?',
        answer: ['Rivonia Trial', 'The Rivonia Trial', 'Rivonia'],
        explanation: 'Named after the Rivonia suburb where leaders were arrested at Liliesleaf Farm in 1963. Mandela used his statement from the dock to explain the ideals he was prepared to die for.'
    },
    {
        type: 'choice',
        question: 'What sparked the Soweto uprising of 16 June 1976?',
        options: ['Pass laws', 'Forced removals', 'Rising bus fares', 'The use of Afrikaans as a language of instruction'],
        answer: 'The use of Afrikaans as a language of instruction',
        explanation: 'Thousands of learners marched against being taught in Afrikaans. Police opened fire, and a schoolboy, Hector Pieterson, became the best-known victim. 16 June is now Youth Day.'
    },
    {
        type: 'text',
        question: 'Who led the Black Consciousness Movement and died in police detention in September 1977?',
        answer: ['Steve Biko', 'Bantu Steve Biko', 'Biko'],
        explanation: 'His death in custody on 12 September 1977 drew worldwide condemnation and increased pressure on the apartheid government.'
    },
    {
        type: 'choice',
        question: 'Which broad anti-apartheid front was launched in 1983?',
        options: ['COSATU', 'Black Sash', 'United Democratic Front', 'Pan Africanist Congress'],
        answer: 'United Democratic Front',
        explanation: 'The UDF brought together hundreds of civic, youth, church and labour organisations, and led resistance to the 1983 tricameral constitution.'
    },
    {
        type: 'choice',
        question: 'In which year was Nelson Mandela released from prison?',
        options: ['1989', '1990', '1991', '1994'],
        answer: '1990',
        explanation: 'F.W. de Klerk announced the unbanning of the ANC, PAC and SACP on 2 February 1990. Mandela walked out of Victor Verster Prison on 11 February after 27 years.'
    },
    {
        type: 'text',
        question: 'Name the negotiating forum, launched in December 1991 in Kempton Park, that began talks on a democratic South Africa. (Hint: it is an acronym.)',
        answer: ['CODESA', 'Convention for a Democratic South Africa'],
        explanation: 'The Convention for a Democratic South Africa brought the government, the ANC and other parties together. Negotiations continued in later forums and led to the interim constitution.'
    },
    {
        type: 'choice',
        question: 'Who shared the 1993 Nobel Peace Prize for ending apartheid peacefully?',
        options: ['Mandela and Tambo', 'Mandela and Buthelezi', 'Desmond Tutu and F.W. de Klerk', 'Nelson Mandela and F.W. de Klerk'],
        answer: 'Nelson Mandela and F.W. de Klerk',
        explanation: 'The prize recognised their work in dismantling apartheid and laying the foundations for a democratic South Africa. Desmond Tutu won his own Nobel Peace Prize in 1984.'
    },
    {
        type: 'text',
        question: 'What public holiday, celebrated every 27 April, marks South Africa\'s first democratic election?',
        answer: ['Freedom Day', 'Freedom day'],
        explanation: 'On 27 April 1994, South Africans of all races voted in a national election for the first time. Mandela was inaugurated as president on 10 May 1994.'
    }
];

const area = document.querySelector('#question-area');
const results = document.querySelector('#results');
const progressLabel = document.querySelector('#progress-label');
const progress = document.querySelector('#progress');
const progressFill = document.querySelector('#progress-fill');

let current = 0;
let score = 0;

// Create an element with an optional class and text
function make(tag, className, text) {
    let element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

function normalise(text) {
    return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

function acceptedAnswers(question) {
    return [].concat(question.answer);
}

function setFeedback(feedback, type, message) {
    feedback.className = 'feedback ' + type;
    feedback.textContent = message;
}

function updateProgress(position) {
    progressLabel.textContent = 'Question ' + position + ' of ' + questions.length;
    progress.setAttribute('aria-valuemax', questions.length);
    progress.setAttribute('aria-valuenow', position);
    progressFill.style.width = (position / questions.length * 100) + '%';
}

// After answering: show the teacher's note (if any) and the Next button
function finishQuestion(question, explanation, next) {
    if (question.explanation) {
        explanation.replaceChildren(make('strong', '', 'Teacher\'s note: '), document.createTextNode(question.explanation));
        explanation.hidden = false;
    }
    next.hidden = false;
    next.focus();
}

// Build and show one question
function showQuestion(index) {
    current = index;
    let question = questions[index];

    area.hidden = false;
    results.hidden = true;
    area.replaceChildren();
    updateProgress(index + 1);

    let feedback = make('p', 'feedback');
    feedback.setAttribute('aria-live', 'polite');

    let explanation = make('div', 'explanation');
    explanation.hidden = true;

    let next = make('button', 'next', index === questions.length - 1 ? 'See results' : 'Next question');
    next.type = 'button';
    next.hidden = true;
    next.addEventListener('click', nextQuestion);

    area.append(make('h2', '', question.question));

    if (question.type === 'choice') {
        let options = make('div', 'options');
        question.options.forEach(function (text) {
            let button = make('button', 'option', text);
            button.type = 'button';
            button.addEventListener('click', function () {
                checkMultiChoice(question, button, options, feedback, explanation, next);
            });
            options.append(button);
        });
        area.append(options, feedback, explanation, next);
        options.querySelector('.option').focus();
    }
    else {
        let row = make('div', 'answer-row');
        let input = make('input');
        input.type = 'text';
        input.placeholder = 'Type your answer';
        input.autocomplete = 'off';
        input.setAttribute('aria-label', 'Your answer');

        let check = make('button', 'check', 'Check answer');
        check.type = 'button';

        function submit() {
            checkFreeResponse(question, input, check, feedback, explanation, next);
        }
        check.addEventListener('click', submit);
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                submit();
            }
        });
        input.addEventListener('input', function () {
            setFeedback(feedback, '', '');
        });

        row.append(input, check);
        area.append(row, feedback, explanation, next);
        input.focus();
    }
}

function checkMultiChoice(question, button, options, feedback, explanation, next) {
    let correct = normalise(button.textContent) === normalise(question.answer);

    if (correct) {
        button.classList.add('correct');
        setFeedback(feedback, 'correct', 'Correct!');
        score++;
    }
    else {
        button.classList.add('incorrect');
        setFeedback(feedback, 'incorrect', 'Incorrect. The answer was ' + question.answer + '.');
        options.querySelectorAll('.option').forEach(function (b) {
            if (normalise(b.textContent) === normalise(question.answer)) {
                b.classList.add('correct');
            }
        });
    }

    // Lock the question so it can only be answered once
    options.querySelectorAll('.option').forEach(function (b) {
        b.disabled = true;
    });
    finishQuestion(question, explanation, next);
}

function checkFreeResponse(question, input, check, feedback, explanation, next) {
    let answer = normalise(input.value);

    // Ask for an answer before checking
    if (answer === '') {
        setFeedback(feedback, 'warning', 'Type an answer first.');
        input.focus();
        return;
    }

    let accepted = acceptedAnswers(question).map(normalise);

    if (accepted.includes(answer)) {
        input.classList.add('correct');
        setFeedback(feedback, 'correct', 'Correct!');
        score++;
    }
    else {
        input.classList.add('incorrect');
        setFeedback(feedback, 'incorrect', 'Incorrect. The answer was ' + acceptedAnswers(question)[0] + '.');
    }

    // Lock the question so it can only be answered once
    input.disabled = true;
    check.disabled = true;
    finishQuestion(question, explanation, next);
}

function nextQuestion() {
    if (current < questions.length - 1) {
        showQuestion(current + 1);
    }
    else {
        showResults();
    }
}

function showResults() {
    area.hidden = true;
    results.hidden = false;
    progressLabel.textContent = 'Done';
    progress.setAttribute('aria-valuenow', questions.length);
    progressFill.style.width = '100%';

    document.querySelector('#score').textContent = score + ' / ' + questions.length;

    let note = 'Good effort. Give it another go?';
    if (score === questions.length) {
        note = 'Perfect score!';
    }
    else if (score === 0) {
        note = 'Not this time. Give it another go?';
    }
    document.querySelector('#score-note').textContent = note;
    results.querySelector('.restart').focus();
}

function restart() {
    score = 0;
    showQuestion(0);
}

document.addEventListener('DOMContentLoaded', function () {
    results.querySelector('.restart').addEventListener('click', restart);
    showQuestion(0);
});