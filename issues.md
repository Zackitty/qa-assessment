# Title: All Routes Show All Tasks
## Severity: High
## Description:
Every route will display every task regardless if it's active or completed
Steps to reproduce:
1. Type 3 separate tasks into the input bar and hit enter after each to create them
2. Click 2 separate tasks to be completed.
3. Click button in the footer to change the route and notice they all  show the same tasks
## Proposed Solution:
Only the home route should show every task. The Active Route should only show active tasks and the Completed Route should only show completed tasks. Everytime the route is changed the value of the nowShowing key from the state will change. However, the shownTodos filter method from the render method of the TodoApp class component that filters what should be displayed currently only returns everything. By adding a switch similar to how the redux store works, we can filter by based on what the nowShowing key from the state is pointing to and show based on if the todo.completed is true or false or just showing them all. 

## How to test:
  Make sure you're running an http-server and have all your dependencies installed. Then install the cypress framework by running "yarn add cypress --dev" in the terminal of the root director of your project. This will install the cypress application. You then run "npx cypress open" to open the application. You can use the UI to click the "+New Spec File" button create a new file titled "qaassessment.spec.js" I wrote the following tests which will ensure expected behavior occurs by checking that upon creation of 3 tasks and toggling 2 to be complete, we will end up with all 3 tasks showing in the home route, the 1 active task showing in the Active route, and the 2 completed tasks showing in the completed route. It will accomplish that by first going to home route and adding 3 new tasks before every assertion. It will then test the assertion that the Ul with the class of todo-list has 3 children. It will then check under the context that two have been clicked. To accomplish that, before each of those assertions it will find an element that contains the text of two of the tasks we created. It will click on their checkbox and activate their event handlers that will give them a class of completed. It will then check each route to make sure they have their route has the appropriate amount of children.
```
  describe('QA Assessment', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/#/')
      cy.get('.new-todo')
      .type('hello')
      .type('{enter}')
      .type('world')
      .type('{enter}')
      .type('really though')
      .type('{enter}')
            })

    it('should have an UL with class of todo-list with 3 children', () => {
      cy.get('.todo-list').children().should('have.length', 3)
      })
    
    context('with 2 checked tasks', () => {
      beforeEach(() => {
        cy.contains('world')
        .parent()
        .find('input[type=checkbox]')
        .check()
  
        cy.contains('really')
          .parent()
          .find('input[type=checkbox]')
          .check()
                })
      it('should have a Ul with a class of todo-list with 3 children in the base route', () => {
        cy.visit('http://localhost:8080/#/')  
        cy.get('.todo-list').children().should('have.length', 3)
        })
      it(''should have a Ul with a class of todo-list with 2 children in the completed route', () => {
        cy.visit('http://localhost:8080/#/completed')  
        cy.get('.todo-list').children().should('have.length', 2)
        })
      it(''should have a Ul with a class of todo-list with 1 children in the active route'', () => {
        cy.visit('http://localhost:8080/#/active')  
        cy.get('.todo-list').children().should('have.length', 1)
        })     
      })
})
```


# Title: Completed Tasks won't clear out
## Severity: High
## Description:
Clicking the clear completed button currently does nothing to completed tasks.
Steps to reproduce:
1. Create any amount of tasks by typing into the input bar and pressing enter
2. Click on them to be completed
3. Press Clear Completed button in the footer and the tasks remain there
## Proposed Solution:
The clear completed button should get rid of all the tasks that have been marked as completed. I think by reinstantiating the todos to only todos that are currently active with a filter function that would only reproduce todos with a that have their completed key set to false. After that you should call the inform method from the todoModel object to update the application.

## How to test:
    Make sure you're running an http-server and have all your dependencies installed. Then install the cypress library by running "yarn add cypress --dev" in the terminal of the root director of your project. This will install the cypress application. You then run "npx cypress open" to open the application. You can use the UI to click the "+New Spec File" button create a new file titled "qaassessment.spec.js" I wrote the following tests which will ensure expected behavior occurs by checking that by creating of 3 tasks and toggling 2 to be complete. After that it will click the clear completed and check that each route has the appropriate number of tasks shown. To acoomplish this I used the beforeEach hook I created earlier that would visit the base route and find the input box with a class of new-todo and enter 3 new tasks. I reused more logic while checking the context that with 2 completed tasks and 1 active task, I would press the completed button. I call the before each hook to find an element that contains the text of two of the tasks we created and click their checkbox. I would then find the button with class of clear completed and click it. After that I would check assertons that both the Active and Base routes had a UL with the class of todo-list with 1 child while the completed route had a UL with the class of todo-list with 0 children.

```
describe('QA Assessment', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#/')
    cy.get('.new-todo')
    .type('hello')
    .type('{enter}')
    .type('world')
    .type('{enter}')
    .type('really though')
    .type('{enter}')
            })

    context('the clear complete button is pressed with 2 completed tasks and 1 active', () => {
        beforeEach(() => {
          cy.contains('world')
          .parent()
          .find('input[type=checkbox]')
          .check()
    
          cy.contains('really')
            .parent()
            .find('input[type=checkbox]')
            .check()

          cy.get("button.clear-completed")
            .click()
                  })
               it('should have a Ul with class of class of todo-list with 1 child in the base route', () => {
                cy.visit('http://localhost:8080/#/')
                cy.get('.todo-list').children().should('have.length', 1)
                })
              it('should have a Ul with class of class of todo-list with 1 child in the active route', () => {
                cy.visit('http://localhost:8080/#/active')
                cy.get('.todo-list').children().should('have.length', 1)
                })
              it('should have a Ul with class of class of todo-list with 0 children in the active route', () => {
                cy.visit('http://localhost:8080/#/completed')
                cy.get('.todo-list').children().should('have.length', 0)
                })
            })
  })
```

# Title: Edit Feature not functional
## Severity: Medium
## Description:
Double clicking on a task currently does not allow you to edit a task.
Steps to reproduce:
1. Write a task in the input bar and press enter
2. Double Click on the task's title and nothing appears
## Proposed Solution:
Double clicking should allow you to edit the title of your task. Because there's already a handle edit method on the todoItem class component, we can call that by placing it on a double click event handler for the ToDo title label in the render function of the toDoItem component. 



# Title: Item text currently displaying Active Items regardless of count
## Severity: Low
## Description:
The text displaying the item count currently statically pluralizes every count even if it's a single active task.
Steps to reproduce:
1. Create any amount of tasks by typing into the input bar and pressing enter
3. Notice that the word remainds "Items" regardless if there's single or multiple items
## Proposed Solution:
The text for items should only be pluralized if there are multiple items included. Currently there is just static text in the span with the class of todo-count in the render function of the footer class component that says items. Luckily we have a plural method in the app.Utils javascript file that we can put our current count as the first argument and the word 'item' as  second argument. We can then save it as a variable that we can then return displayed interpolated in the to-count span.

# Title: Input accepting empty tasks
## Severity: Medium
## Description:
Entering a task with no description will currently be displayed and causes the button to delete tasks to bleed into other tasks.
Reproduce by following these steps:
1. Click on the input bar and press enter without typing
2. The task should appear with no title
## Proposed Solution:
Pressing enter with an empty task should produce no new task. In the handleNewToDoKeyDown method of the TodoApp class component, we can can ask for existence of the val variable before calling addTodo method from the TodoModel object.  

# Title: Footer displays without tasks
## Severity: Low
## Description:
Footer displays despite having no active tasks
Steps to reproduce:
1. Delete any tasks already displayed
2. The footer will continue to display under the input bar despite any tasks currently logged in.

## Proposed Solution:
The footer should only be displayed when there's active or completed tasks in the todos property. If we check for existent of either active or complete todo's so that the logic works regardless of the route theyr're on before assigning the footer variable, we should be able to ensure it's only displayed when any todos are present on any of the routes.