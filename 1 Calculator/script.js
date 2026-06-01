let string = "";
let memory = 0;
let buttons = document.querySelectorAll(".button");
Array.from(buttons).forEach((button)=>{
    button.addEventListener('click', (e)=>{
        let buttonText = e.target.innerHTML;
        if (buttonText == "=") {
            string = eval(string);
            document.querySelector('input').value = string;
        }else if (buttonText == "C") {
            string = "";
            document.querySelector('input').value = string;
        }else if (buttonText == "M+") {
            if (string !== "") {
                memory = memory + parseFloat(eval(string));
                string = "";
                document.querySelector('input').value = "M+";
            }
        }else if (buttonText == "M-") {
            if (string !== "") {
                memory = memory - parseFloat(eval(string));
                string = "";
                document.querySelector('input').value = "M-";
            }
        }else if (buttonText == "MR") {
            string = memory.toString();
            document.querySelector('input').value = string;
        }else if (buttonText == "MC") {
            if (memory != 0) {                
                memory = "";
                document.querySelector('input').value = "Memory Cleared";
            }
        }else if (buttonText == "%") {
            if (string !== "") {
                string = string / 100
                document.querySelector('input').value = string;
            }   
        }else{
        console.log(e.target)
        string = string + buttonText;
        document.querySelector('input').value = string;
        }
    });
});
const themeBtn = document.querySelector('#theme-btn');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Optional: Button ka text change karne ke liye
    if(document.body.classList.contains('dark-theme')){
        themeBtn.innerHTML = "Light Mode";
    } else {
        themeBtn.innerHTML = "Dark Mode";
    }
});