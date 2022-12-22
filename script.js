const numbers = Array.from(document.querySelectorAll('.number'))
const operators = Array.from(document.querySelectorAll('.operation'))
const equals = document.getElementById('equals')
const backspaceButton = document.getElementById('backspace')
const allClearButton = document.getElementById('all-clear')
let previousText = document.getElementById('previous')
let currentText = document.getElementById('current')
let current = ''
let previous = ''
let currentOperation = ''


//clear and backspace functionality

allClearButton.addEventListener('click', () => {
    current = ''
    previous = ''
    currentOperation = ''
    updateDisplay()
})

function backspaceCurrent (){
    if(currentText.textContent){
        current = currentText.textContent.slice(0,-1)
        updateDisplay()
        } return
}

backspaceButton.addEventListener('click', () => {
    backspaceCurrent()
})

// listeners for the number pad with '.'

numbers.forEach(number =>{
    number.addEventListener('click', (n) => {
        switch(n.target.textContent){
            default:
                current = parseFloat(current.toString() + n.target.textContent.toString())
                updateDisplay()
                break
            case '.':
                current = current.toString()        
                if(current.includes(".")) {
                    return 
                } else {
                    current += "."
                    updateDisplay()
                }
        }
    })
})

// updates display 

function updateDisplay (){
    currentText.textContent = current
    previousText.textContent = `${previous}` + `${currentOperation}`
}

//operation function that sets decimal places to 5

function operation(o, a, b){
    let answer
    switch(o){
        case '+' :
            answer = parseFloat(a) + parseFloat(b)
            return parseFloat(answer.toFixed(5))
            
        case '*':
            answer = parseFloat(a) * parseFloat(b)
            return parseFloat(answer.toFixed(5))
            
        case '/':
            answer = parseFloat(a) / parseFloat(b)
            return parseFloat(answer.toFixed(5))
        
        case '-':
            answer = parseFloat(a) - parseFloat(b)
            return parseFloat(answer.toFixed(5))
        
    }
}

//operation inner function
function innerOperation (maybeOperator){
if(current == ''){
    currentOperation = maybeOperator
    updateDisplay()
} else if(previous == ''){
    currentOperation = maybeOperator
    updateCurrentValue()
    updateDisplay()
}
 else {  
    current = operation(currentOperation, previous, current)
    updateDisplay()
    updateCurrentValue()          
    currentOperation = maybeOperator
    
}
}

//equal function 
function equalFunction() {
    if(previous && currentOperation && current != ''){           
        current = operation(currentOperation, previous, current)
        updateDisplay()
        updateCurrentValue()
    }
}


// event listener and functionality for key press 

document.addEventListener("keydown", (event) => {
    let operatorList = ["*","+","-","/",]
    let number = parseInt(event.key)
    let maybeOperator = event.key.toString()

    if (number >= 0 && number <= 9){
            current = current.toString() + number.toString()
            updateDisplay();
    } else if (event.key == "Backspace") {
        backspaceCurrent()
    } else if (operatorList.indexOf(maybeOperator) != -1){
        innerOperation(maybeOperator)        
    } else if (maybeOperator == '=' || maybeOperator == 'Enter'){        
        equalFunction()}})

//updates previous and current values

function updateCurrentValue(){
    previous = current
    current = ''
}

//operator keys and running total functionality

operators.forEach(operator => {
    operator.addEventListener('click', (o) => {
       if(current == ''){
            currentOperation = operator.textContent
            updateDisplay()
        } else { 
        
        if(previous == ''){
            currentOperation = operator.textContent
            updateCurrentValue()
            updateDisplay()
            
        } else {
        
            current = operation(currentOperation, previous, current)
            updateDisplay()
            updateCurrentValue()          
            currentOperation = operator.textContent           
    }
}
    
    
    })})

//equals listener with operation functionality 

    equals.addEventListener('click', () => {
        equalFunction()
    })
    