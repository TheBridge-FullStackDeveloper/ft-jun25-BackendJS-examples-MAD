console.log("hola desde VanillaJS. Aquí va tu código para manipular el DOM de la web y para hacer llamadas a API");

document.getElementById("searchButton").addEventListener("click", async e => {
    const title = document.getElementById("productName").value;
    alert(title);
    try{
        const res = await fetch(`/api/books/${title}`); // Llamada a un endpoint de mi propia API
        const data = await res.json();
        alert(data);
        console.log(data);
        document.getElementById("result").innerHTML = JSON.stringify(data);
    }
    catch(error){
        console.log(error);
    }
})