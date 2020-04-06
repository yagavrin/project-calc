let btnStart = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName ('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    chooseExpenses = document.getElementsByClassName('expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],

    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

    let money, time;

    let appData = {
        budget: money, 
        timeData: time, 
        expenses : {}, 
        optionalExpenses : {}, 
        income : [], 
        savings : false,};

    btnStart.addEventListener('click', function () {                             //подстановка даты, бюджета
        time = prompt('Введите дату в формате YYYY-MM-DD', '');
        money = +prompt('Ваш бюджет на месяц?', '');
        
        while (isNaN(money)|| money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed(1);
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
    });

    let sumExpenses = 0;
    expensesItemBtn.addEventListener('click', function() {
        for (let i = 0; i < chooseExpenses.length; i++) {
            let a = chooseExpenses[i].value,
                b = chooseExpenses[++i].value;
    
            if ((typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
                appData.expenses[a] = b;
                sumExpenses += +b;
            } else {
                i = i - 1;
            }
            expensesValue.textContent = sumExpenses;
        }
    });

    optionalExpensesBtn.addEventListener('click', function() {
        for (let i = 0; i < optionalexpensesItem.length; i++) {
            let opt = optionalexpensesItem[i].value;
            // if ( typeof(optExpensesItem)==='string' && typeof(optExpensesItem) != null && optExpensesItem.length < 50) {
            //     console.log ("done");
                appData.optionalExpenses[i] = opt;
            // } else {                            
            //     console.log ("bad result");
            //     i--;
            // }
            optionalexpensesValue.textContent += appData.optionalExpenses[i] + ', ';
        }
        
    });

    countBtn.addEventListener('click', function(){
        console.log(daybudgetValue);
        if (appData.budget != undefined) {
            appData.moneyPerDay = ((appData.budget - sumExpenses)/ 30).toFixed(2);
            daybudgetValue.textContent = appData.moneyPerDay;
            if (appData.moneyPerDay < 100) {
                levelValue.textContent = "Это минимальный уровень достатка!";
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Это средний уровень достатка!";
            } else if (appData.moneyPerDay > 2000) {
                levelValue.textContent = "Это высокий уровень достатка!";
            } else {
                levelValue.textContent = "Произошла ошибка";
            }
        } else {
            alert('Начните с кнопки "Начать расчет"');
        }
    });

    chooseIncome.addEventListener('change', function() {
        let items = chooseIncome.value;
        appData.income = items.split(", ");
        incomeValue.textContent = appData.income;
    });

    checkSavings.addEventListener('click', function() {
        if (appData.savings == true) {
            appData.savings = false;
        } else {
            appData.savings = true;
        }
    });

    chooseSum.addEventListener('input', function() {
        if (appData.savings == true) {
            let sum = +chooseSum.value,
                percent = +choosePercent.value;
            appData.monthIncome = (sum/100/12*percent).toFixed(2);
            appData.yearIncome = (sum/100*percent).toFixed(2);

            monthSavingsValue.textContent = appData.monthIncome;
            yearSavingsValue.textContent = appData.yearIncome;
        }
    });

    choosePercent.addEventListener('input', function() {
        if (appData.savings == true) {
            let sum = +chooseSum.value,
                percent = +choosePercent.value;
            appData.monthIncome = (sum/100/12*percent).toFixed(2);
            appData.yearIncome = (sum/100*percent).toFixed(2);

            monthSavingsValue.textContent = appData.monthIncome;
            yearSavingsValue.textContent = appData.yearIncome;
        }
    });

