let string = "";
isLocked = false;
buttons = document.querySelectorAll(".button")
Array.from(buttons).forEach((button)=> {
    button.addEventListener('click', (e)=>{
        let buttonText = e.target.innerHTML;
        console.log(buttonText)
        if (buttonText == "=") {
            string = eval(string)
            document.querySelector('input').value = string;
        }else if (buttonText == "C") {
            string = "";
            document.querySelector('input').value = string;
        }else if (buttonText == "%") {
            string = string / 100;
            document.querySelector('input').value = string;
        }else if (buttonText == "←" ) {
            string = string.slice(0, -1);
            document.querySelector('input').value = string;
        }else if (buttonText == "L") {
            isLocked = !isLocked
            if (isLocked) {
                document.querySelector('input').value = "Calculator Locked!";
                document.querySelector('input').style.background = "#ff4d4d";
                document.querySelector('input').disabled = true;
            }else {
                document.querySelector('input').value = "Calculator Unlocked!";
                document.querySelector('input').style.background = "#FFFFFF";
                document.querySelector('input').disabled = false

                setTimeout(() => {
                    if (!isLocked) {
                        document.querySelector('input').value = "";
                    }
                }, 1500);
            }
        }else{
            string = string + buttonText
            document.querySelector('input').value = string;
        }
    })
});