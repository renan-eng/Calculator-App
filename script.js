class Calculator{
    constructor(prevOperTxtElem, currOperTxtElem)
    {
        this.prevOperTxtElem = prevOperTxtElem;
        this.currOperTxtElem = currOperTxtElem;       
        this.clear()
    }

    clear()
    {
        this.currOper = ''
        this.prevOper = ''
        this.operation = undefined
    }

    delete()
    {
        this.currOper = this.currOper.toString().slice(0, -1)
    }

    appendNumber(number)
    {
        if (number === '.' && this.currOper.includes('.')) return
        this.currOper = this.currOper.toString() + number.toString()
    }

    chooseOperation(operation)
    {
        if (this.currOper === '') return
        if (this.prevOper !== '')
        {
            this.compute()
        }
        this.operation = operation
        this.prevOper = this.currOper
        this.currOper = ''
    }

    compute()
    {
        let computation
        const prev = parseFloat(this.prevOper)
        const current = parseFloat(this.currOper)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation)
        {
            case '+': 
                computation = prev + current
                break
            case '-': 
                computation = prev - current
                break
            case '*': 
                computation = prev * current
                break
            case '÷': 
                computation = prev / current
                break
            default: 
                return
        }
        this.currOper = computation
        this.operation = undefined
        this.prevOper = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    
    updateDisplay()
    {
        this.currOperTxtElem.innerText = this.getDisplayNumber(this.currOper)
        if (this.operation != null)
        {
            this.prevOperTxtElem.innerText = `${this.getDisplayNumber(this.prevOper)} ${this.operation}`
        }
        else
        {
            this.prevOperTxtElem.innerText = ''
        }
        //this.prevOperTxtElem.innerText = this.prevOper        
    }
}


//query selector ALL irá selecionar todos os elementos com o atributo requisitado
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')

//query selector somente pega um elemento com o atributo requisitado
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOperTxtElem = document.querySelector('[data-prevOper]')
const currOperTxtElem = document.querySelector('[data-currOper]')

const calculator = new Calculator(prevOperTxtElem, currOperTxtElem)

//loop para os botões de número (1 2 3 4 5 6 7 8 9 0 .)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        //pega o numero pressionado e envia para a função appendNumber() e atualiza o display (updateDisplay)
        calculator.appendNumber(button.innerText) 
        calculator.updateDisplay()
    })
})

//loop para os botões de operação (÷ * - +)
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        //pega a operação pressionad e envia para a função chooseNumber() e atualiza o display
        calculator.chooseOperation(button.innerText) 
        calculator.updateDisplay()
    })
})

//loop para o botão de igual (=) => realiza todos os calculos chamando a função compute()
equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

//AC eventlistener
allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

//DEL eventlistener
deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})