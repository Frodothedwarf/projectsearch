# Product search

From now, you can code this project in any JS/TS framework you prefer, but make sure to test your code as descripted in 4.   

The goal of the project is to create a product list viewer and gain some experience with angular. 
Mainly only components, the template engine, HTTP Client and reactiveX.
Angular is huge framework and for this project only a few fundamental features is needed. 
  
All data is loaded into the client from `products.json`. Meaning this project has no server part.

The project must be implemented using https://angular.io/.

**Those docs are useful**

1. https://angular.io/guide/architecture-components
1. https://angular.io/guide/setup-local
1. https://angular.io/guide/interpolation#template-expressions
1. https://angular.io/guide/pipes
1. https://angular.io/guide/http

**To do**

1. Clone this repo and create a branch with your name.
1. Initialize an angular project `ng new search` and create a component `ng g c product-search` and using the angular CLI
1. When done coding. Make sure you fulfil the requirements and make sure the project builds `ng build`.
1. Find a cool way to deliver the project


**Requirements**

1. The products must be listed. You can read a json file with `HttpClient get`
1. Pagination. Show, say 10, products per page. Hint: use `slice` pipe
1. Full text search. The user must be able to search for the products using full text. Input should be provided via a text input. Once a user starts typing the list of products should be filtered using full text search so he can easily find what he needs.
   1. This functionality must be done using https://www.learnrxjs.io/ which is included in angular. 
   1. Upon first search. Products should be loaded from products.json into the main memory. Subsequent search must not include this step. For this use the angular http client and read products.json which should be stored in the assets folder. This means no products are loaded nor shown before the first time the user starts typing.
   1. To relax the CPU the search must include debouncing. Meaning that nothing should happen unless the user has paused typing for at least, say 150 ms.
   1. The search should be freetext. The user should find "SRAM Power Pack PG-1050" by typing "Power SRAM". Test on this specific case.
   1. **Hint:** https://www.learnrxjs.io/learn-rxjs/recipes/type-ahead. However, you need to modify the pipe.


1.  Test your app functions correctly according to 3.ii by simulating a slow connection in Dev Tools -> Network -> Fast 3G.
    What happens if you type while `products.json` is loading.
   `exhaustMap` might help you solve any race condition issues. 
  
**Requirements fulfilled**
1. The products is fetched via ´HttpClient get´
1. The pagination has a backward and forwards button, and a indicator to what page you are currently at.
1. The full text search is working and implemented using rxjs, and are only fetching the products.json once, when the user attempts to make the first search. The debounce is set to 350ms, since I found that if it is 150ms it could begin to fetch results before typing is complete.
1. The app is working on Fast 3G and lower network bandwiths aswell, and it displays a message where it states it is currently fetching the data on slower connections.

**Extra questions, for extra fun**
1. Which data structure makes this search fast, like almost constant time. Show example?
1. It's friday night. How much beer do you drink?

**Fun questions answered**
1. I am not sure I fully understand this question, therefor I am going to explain what implementation I went with for filtering products. I made a list/array with the search term, splitted by ' ' and trimmed to get rid of whitespaces which could break the search I found. Next I created a pipe with the products loaded in, before this the code checks if the products are loaded, if it isn't it will fetch the products. Then I filtered the products and looped trough the search term list/array to check if any of these matched a title in the products. This was the solution I found worked best, proberly not the most optimized version, but since the requirement is to search in freetext and find products that are not exactly the search term this was the way I did it.
1. On a friday night it's around 9-10, that's a good amount for me ;)