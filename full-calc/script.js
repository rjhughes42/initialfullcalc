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

backspaceButton.addEventListener('click', () => {
    if(currentText.textContent){
    current = currentText.textContent.slice(0,-1)
    updateDisplay()
    } return
})

// listeners for the number pad with '.'

numbers.map(number =>{
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
    tertiary = ''
}

//operation function that sets decimal places to 5

function operation(o, a, b){
    let answer
    switch(o){
        case '+' :
            answer = parseFloat(a) + parseFloat(b)
            return parseFloat(answer.toFixed(5))
            break
        case '*':
            answer = parseFloat(a) * parseFloat(b)
            return parseFloat(answer.toFixed(5))
            break
        case '/':
            answer = parseFloat(a) / parseFloat(b)
            return parseFloat(answer.toFixed(5))
            break
        case '-':
            answer = parseFloat(a) - parseFloat(b)
            return parseFloat(answer.toFixed(5))
            break
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
        if(currentText.textContent){
            current = currentText.textContent.slice(0,-1)
            updateDisplay()
            } return
    } else if (operatorList.indexOf(maybeOperator) != -1){
        if(current == ''){
            currentOperation = maybeOperator
            updateDisplay()
        } else { 
        
        if(previous == ''){
            currentOperation = maybeOperator
            previous = current
            current = ''
            updateDisplay()
            
        } else {
        
            current = operation(currentOperation, previous, current)
            updateDisplay()
            previous = current
            current = ''            
            currentOperation = maybeOperator
    } 
}
    } else if (maybeOperator == '=' || maybeOperator == 'Enter'){        
        if(previous && currentOperation){
            if(current != ''){
            current = operation(currentOperation, previous, current)
            updateDisplay()
            previous = current
            current = ''
            } return
    } return
}
    })


//operator keys and running total functionality

operators.map(operator => {
    operator.addEventListener('click', (o) => {
       if(current == ''){
            currentOperation = operator.textContent
            updateDisplay()
        } else { 
        
        if(previous == ''){
            currentOperation = operator.textContent
            previous = current
            current = ''
            updateDisplay()
            
        } else {
        
            current = operation(currentOperation, previous, current)
            updateDisplay()
            previous = current
            current = ''            
            currentOperation = operator.textContent           
    }
}
    
    
    })})

//equals listener with operation functionality 

    equals.addEventListener('click', () => {
        if(current != ''){
        if(previous && currentOperation){
        current = operation(currentOperation, previous, current)
        updateDisplay()
        previous = current
        current = ''

        } return
        } return
    })
    