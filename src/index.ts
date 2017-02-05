/// <reference path="./hero_db.ts" />

import Promise from "ts-promise";

function getAsync<T>(): Promise<T>
{
  return Promise.resolve(
    $.getJSON("http://localhost:8089/heros")
  );
}

// TODO async/await version
$( document ).ready(function() {
    console.log("Document ready");

    let promise = getAsync<HeroDB>();
    promise.then((data) => console.log(data));
});