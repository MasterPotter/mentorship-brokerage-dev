document.getElementById("sign-up-form").addEventListener("submit", function(event){
    event.preventDefault();
    var field1 = document.getElementById("password1").value;
    var field2 = document.getElementById("password2").value;
    var errorMessage = document.getElementById("errorMessageSignUp")
    errorMessage.textContent="";
    if (field1!=field2){
        errorMessage.textContent = "Please make sure your passwords match.";
        document.getElementById("errorMessageSignUp").scrollIntoView({behavior:"smooth", block:"center"})
    }
    else{
        if (field1.length < 8) {
            errorMessage.textContent="Please make sure your password is at least 8 characters long.";
            document.getElementById("errorMessageSignUp").scrollIntoView({behavior:"smooth", block:"center"})
        }
        else{
            var scriptURL = "https://script.google.com/macros/s/AKfycbziLBlXNk7zOgpy8K7HM3Vet3F1zgi3QlAqXetHDY9yQ00N6VeUHeBD7vOibaPYjHJu8w/exec";
            var formData = new FormData();
            formData.append("email",document.getElementById("email").value);
            formData.append("number",document.getElementById("number").value);
            formData.append("password1",document.getElementById("password1").value);
            formData.append("password2",document.getElementById("password2").value);
            formData.append("item1",document.getElementById("item1").value);
            formData.append("item2",document.getElementById("item2").value);
            formData.append("item3",document.getElementById("item3").value);
            formData.append("item4",document.getElementById("item4").value);
            formData.append("item5",document.getElementById("item5").value);
            formData.append("max-mentees",document.getElementById("max-mentees").value);
            formData.append("max-mentors",document.getElementById("max-mentors").value);
            fetch(scriptURL, {method: "POST", body:formData})
                .then(response=>alert("Thank you! Your data has been entered."))
                .then(()=>{window.location.href = "index.html";})
                .catch(error => console.error("Error!", error.message))
        }}
});