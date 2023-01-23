

const calcular = (n1, operator, n2) => {
    const primeiroNumero = parseFloat(n1)
    const segundoNumero = parseFloat(n2)

    if (operator === 'add') return primeiroNumero + segundoNumero
    if (operator === 'subtract') return primeiroNumero - segundoNumero
    if (operator === 'multiply') return primeiroNumero * segundoNumero
    if (operator === 'divide') return primeiroNumero / segundoNumero
}

const buttonTip = button => {
    const{action} = button.dataset
    if (!action) return 'number'
    if('add' || 
    'subtract' || 
    'multiply' || 
    'divide')
    return 'operator'
    return action
}

const resultado = (button, displayNum, state) => {
    const buttonConteudo = button.textContent
    const btnType = buttonTip(button)
    const {
        firstValue,
        operator,
        modValue,
        previousKeyType
        } = state


    if (btnType === 'number'){
        return displayNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
            ? buttonConteudo
            : displayNum + buttonConteudo
    }

    if (btnType === 'decimal') {
        if (!displayNum.includes('.'))
        return displayNum + '.'
        if (previousKeyType === 'operator' || previousKeyType === 'calculate')
        return '0.'
        return displayNum
    }

    if (btnType === 'operator') {
        return firstValue && operator && previousKeyType !== 'operator' &&
        previousKeyType && 'calculate'
        ? calculate(firstValue, operator, displayNum)
        : displayNum
    }

    if (btnType === 'clear') return 0

    if (btnType === 'calculate') {
        return firstValue
        ? previousKeyType === 'calculate'
        ? calculate(displayNum, operator, modValue)
        : calculate(firstValue, operator, displayNum)
        : displayNum
    }
}

const updateCalculatorState = (key, calculator, calculatedValue, displayNum) => {
    const keyType = getKeyType(key)
    const {
    firstValue,
    operator,
    modValue,
    previousKeyType
    } = calculator.dataset

    calculator.dataset.previousKeyType = keyType

    if (keyType === 'operator') {
        calculator.dataset.operator = key.dataset.action
        calculator.dataset.previousKeyType = firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate'
        ? calculatedValue
        : displayNum
    }

    if (keyType === 'calculate') {
        calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
        ? modValue
        : displayNum
    }

    if (keyType === 'clear' && key.textContent === 'AC'){
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
    }
}

const updateVisualState = (key, calculator) => {
    const keyType = getKeyType(key)

    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

    if (keyType === 'operator')
    key.classList.add('is-depressed')

    if (keyType === 'clear' && key.textContent !== 'AC')
    key.textContent = 'AC'

    if (keyType !== 'clear'){
        const clearButton = calculator.querySelector('[data-action="clear"]')
        clearButton.textContent = 'CE'
    }
}

const calculator = document.querySelector('.calculator')
const display = document.querySelector('.visor')
const button = document.querySelector('.botoes')

button.addEventListener('click', e => {
    if (!e.target.matches('button')) return
    const key = e.target
    const displayNum = display.textContent
    const resultString = createResultString(key, displayNum, calculator.dataset)

    display.textcontent = resultStringupdateCalculatorState(key, calculator, resultString, displayNum)
    updateVisualState(key, calculator)
})