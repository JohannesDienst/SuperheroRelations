

function getAsync() {
  console.log("getAsync");
}

async function getAsyncExp() {
  console.log("getAsyncExp");
}

$( document ).ready(function() {
    console.log("ready!");

    $("#get_async").on("click", getAsync);
    $("#async_await").on("click", getAsyncExp);
});