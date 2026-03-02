import { loadChanges, applyChanges} from "./store.js";

console.log('Hello World!');
async function init() {
    console.log("script is running");
  await loadChanges();
  await applyChanges();
};

init();
