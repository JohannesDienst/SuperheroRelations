/// <reference path="./hero_db.ts" />

function getAsync<T>(): Promise<T>
{
  return Promise.resolve(
    $.getJSON("http://localhost:8089/heros")
  );
}

async function getAsyncExp() {
  let val = await getAsync<HeroDB>();
  appendHeros(val);
  return val;
}

function appendHeros(heros: HeroDB) {
  let tableBody = $(".table tbody");
  tableBody.find("tr").remove();
  heros.heros.forEach(
    (hero) => {
      tableBody.append(
        `<tr><td>${hero.id}</td><td>${hero.name}</td></tr>`
      )
    } 
  );
}

$( document ).ready(function() {
    console.log("Document ready");

    $("#get_async").on("click",
      () => {
        let promise = getAsync<HeroDB>();
        promise.then(appendHeros);
      }
    );
    $("#async_await").on("click", 
      () => {
        getAsyncExp();
      }
    );
});