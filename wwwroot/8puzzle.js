let inputStr;

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('submit').addEventListener('click', function () {
        inputStr = document.getElementById('inputStr').value;
        if (!inputStr) {
            alert('Please enter initial state.\nSuch as "1,2,3,4,5,6,7,8,0".');
            return;
        }
        inputStr = inputStr.replace(/[^0-9]/g, '');
        if (inputStr.length != 9) {
            alert("Initial state is supposed to present by 9 tiles.");
            return;
        }
        for (let i = 0; i < 9; i++) {
            if (inputStr.indexOf(i) == -1) {
                alert("Express tiles using [0-9].");
                return;
            }
        }
        go(inputStr);
    })
})

function go(inputStr) {
    m0 = new Matrix(3, 3, inputStr);
    
}

