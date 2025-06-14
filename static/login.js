const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const error_message = document.getElementById('error-message')
form.addEventListener('submit', (e) => {
    let errors = []

    if(firstname_input){
        //if the page has firstname input its a singup page
    errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value)
    }
    else{
        //if its email first input then we are in login page
        errors = getLoginFormErrors(email_input.value, password_input.value)
    }
    //prevents the submission in the inputs are blank and pushes out an error
    if(errors.length > 0){
        e.preventDefault()
        error_message.innerText = errors.join(". ")
    }
})
//Login page error list
function getLoginFormErrors(email, password){
    let errors = []

    if(email === '' || email == null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if(password === '' || password == null){
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}
//sign up page error list
function getSignupFormErrors(firstname, email, password){
    let errors = []
//DOM interaction 1
    if(firstname === '' || firstname == null){
        errors.push('Firstname is required')
        firstname_input.parentElement.classList.add('incorrect')
    }
//DOM interaction 2
    if(email === '' || email == null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
//DOM interaction 3
    if(password === '' || password == null){
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }
 //DOM interaction 4   //makes passwords be at least 8 characters if not pushes out an error
    if(password.length < 8){
        errors.push('Password must have at leats 8 characters')
        password_input.parentElement.classList.add('incorrect')
    }


    return errors;
}
                                                                //just a filter to watch if input isnt there then ignore it
const allInputs = [firstname_input, email_input, password_input].filter(input => input != null)
//adds an event listeners to see if the user has put anything into the incorrect boxes
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = ''
            
        }
    })

})

