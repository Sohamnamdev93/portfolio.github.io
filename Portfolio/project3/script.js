let string = "";
let buttons = document.querySelectorAll('.button');
Array.from(buttons).forEach((button)=>{
    button.addEventListener('click',(e)=>{
        console.log(e.target)
        String = String + e.target.innerHTML;
        document.querySelector('input').value = string;
    })
})