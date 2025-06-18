const API_KEY = "https://script.google.com/macros/s/AKfycbziLBlXNk7zOgpy8K7HM3Vet3F1zgi3QlAqXetHDY9yQ00N6VeUHeBD7vOibaPYjHJu8w/exec";
const SPREADSHEET_ID = "1LKUh_Ei0H6JXQLAPXBrz3JfJEZYB-AUvXkul-ZRiQVI";
const RANGE = "Database!A:C";
function loadClient(){
    gapi.client.setApiKey(API_KEY);
    return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4");
}

async function fetchSheetData(){
    const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId:SPREADSHEET_ID,range:RANGE
    });
    return response.result.values;
}
async function validateCredentials(email,pw){
    const data = await fetchSheetData();
    for (let row of data){
        const storedUsername=row[0];
        const storedPassword=row[2];
        if (email==storedUsername && pw==storedPassword) return true;
    }return false;
}
document.getElementById("login-form").addEventListener("submit", function(event){
    event.preventDefault();
    const username=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const isValid = await validateCredentials(username, password);
    if (isValid) window.location.href="signed-in.html";
    else {errorMessage.textContent="Email or password is invalid."; document.getElementById("errorMessageSignIn").scrollIntoView({behavior:"smooth", block:"center"});}
});
gapi.load("client", loadClient);