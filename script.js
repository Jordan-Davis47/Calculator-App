const calculator = document.querySelector('.calculator')
const keys = document.querySelectorAll('.key');
const keypad = document.querySelector('.keys');
let screen = document.querySelector('.numbers-input');
const calcTop = document.querySelector('.screen');
const body = document.querySelector('body');
const h1 = document.querySelector('h1');
const themeSwitchOne = document.querySelector('.one');
const themeSwitchTwo = document.querySelector('.two');
const themeSwitchThree = document.querySelector('.three');

function themeSwitch(theme) { 
    body.className = ''
    body.className = theme;
    h1.className = '';
    h1.className = `${theme}-font`
    h1.nextElementSibling.className = '';
    h1.nextElementSibling.className = `${theme}-font`;
    keypad.className = '';
    keypad.classList.add('keys')
    keypad.classList.add(`${theme}-keys`);
    calcTop.className = '';
    calcTop.classList.add('screen');
    calcTop.classList.add(`${theme}-keys`);
}

themeSwitchOne.addEventListener('click', () => { 
    themeSwitch('dark');
}) 

themeSwitchTwo.addEventListener('click', () => { 
    themeSwitch('light');
}) 

themeSwitchThree.addEventListener('click', () => { 
    themeSwitch('library');
}) 



let n1 = '';
let n2 = '';
let op = '';
let { firstNum, secondNum, modValue, previousKeyType, operator } = calculator.dataset;

function calculate(firstSum, operator, secondSum) { 

    const n1 = parseFloat(firstSum);
    const n2 = parseFloat(secondSum);
    if (operator === 'add') { return (n1 + n2).toLocaleString() }   
    if (operator === 'minus') { return (n1 - n2).toLocaleString() }
    if (operator === 'multiply') { return (n1 * n2).toLocaleString() }
    if (operator === 'divide') { return (n1 / n2).toLocaleString() }   
}

function removeClass(target, classString) { 
    Array.from(target.parentNode.children)
            .forEach(key => key.classList.remove(classString));
}


// event listener for the calculator
keypad.addEventListener('click', (e) => { 
    const button = e.target;
    const number = button.textContent;
    let action = button.dataset.action;
    // if a number key is pressed
    if (button.classList.contains('number')) {
        if (screen.textContent === '0' || previousKeyType === 'equals' || previousKeyType === 'operator') {
            if (screen.textContent !== '0.') { 
                screen.textContent = '';
            }
            screen.textContent += number;
        } else {
            screen.textContent += number;
        }
        previousKeyType = 'number'

        if (firstNum && secondNum && operator ) { 
            
            secondNum = screen.textContent;
            n2 = secondNum;
        }
    }  
    // if the decimal button was pressed
    if (button.classList.contains('decimal')) { 
        // stop extra decimals from being created
        if (!screen.textContent.includes('.') || previousKeyType === 'operator')
            if (previousKeyType === 'operator') {
                screen.textContent = '0.';
            } else if (previousKeyType === 'operator' || previousKeyType === 'equals') {
                screen.textContent = '0.';
            } else { 
                screen.textContent += '.'
            }
        previousKeyType = 'decimal'
    }
    // if an operator button is clicked
       if (button.dataset.action) { 
           
           if (!firstNum) {
               firstNum = screen.textContent;
               n1 = firstNum;
               screen.textContent = '';
           }  else if (firstNum && !secondNum) { 
               secondNum = screen.textContent;
               n2 = secondNum;
               screen.textContent = '';

           }

           if (previousKeyType === 'equals') { 
               firstNum = screen.textContent;
               n1 = firstNum;
           }
           
           if (firstNum &&
               secondNum &&
               operator &&
               previousKeyType !== 'operator' &&
               previousKeyType !== 'equals') { 
            
               let answer = calculate(n1, op, n2);
               screen.textContent = answer;
               firstNum = answer;
               modValue = secondNum;
               secondNum = ''
               n1 = firstNum;
               n2 = '';
           }
           
        removeClass(button, 'pressed')
        button.classList.add('pressed')
        previousKeyType = 'operator';
        operator = action;
        op = operator;
    }
    // if equals is pressed
    if (button.classList.contains('equals')) { 
        removeClass(button, 'pressed');

        if (previousKeyType === 'equals') { 
            firstNum = screen.textContent;
            n1 = firstNum;
            screen.textContent = calculate(n1, op, n2);
        }

        if (!secondNum) { 
            secondNum = screen.textContent;
            n2 = secondNum;
        }
            
        if (firstNum) {
            let answer = calculate(n1, op, n2)
            screen.textContent = answer;
        }

        if (previousKeyType === 'operator') { 
            secondNum = firstNum;
            n2 = secondNum;
            screen.textContent = calculate(n1,op,n2)
        }

        modValue = secondNum;
        previousKeyType = 'equals'
    }
    // if reset is pressed reset all variables/numbers/screen
    if (button.classList.contains('reset')) { 
        removeClass(button, 'pressed');
        n1 = '';
        n2 = '';
        op = '';
        screen.textContent = '';
        previousKeyType = '';
        operator = '';
        firstNum = '';
        secondNum = '';
        screen.textContent = '0';
    }
    // if delete is pressed clear the current screen
    if (button.classList.contains('delete')) { 
        screen.textContent = '';
        previousKeyType = 'delete'
    }
})


