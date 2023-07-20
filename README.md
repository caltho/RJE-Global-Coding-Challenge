# coding-task-2023
Coding task for RJE Global's software engineering recruitment 2023

To run, open the project up in stackblitz, allow it to install dependencies, then type 'node app.js' in the terminal.

The project converts the equipment_list.csv file to a json array, validates the contents against a predefined set of validation maps and returns an array of error message json objects to the client.

Complete the following tasks:

1. Extend functionality of the validateColumns() function in validators.js to register a new error if an unknown field is present in the equipment list.

2. Why are all the errors on line 2? Find the bug and fix.

3. Update the validation strings on the "Subsystem" and "PLU" fields so that an error is registerd when an '&' symbol is present.

4. Add some HTML and CSS to the response object so that the errors list is more human readable.

** Feel free to refactor existing code to simplify, make it more readable or to fit in with your solution **

Bonus Task:
Rewrite this program using a front end tech such as Angular, React, or what ever your favourite framework is. This can be a minimal single page where the user clicks a "Validate" button, and the validataoin errors are displayed to the browser window.

To submit your solution, either send me a link to a new gitub repo, or you can simply zip up the source code and email to taison.eady@rjeglobal.com
