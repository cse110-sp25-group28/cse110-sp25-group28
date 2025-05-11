---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 100
title: Use Jest as a Unit-Testing Framework.

status: accepted
date: 2025-05-11
decision-makers: Roy, Kumiko, Sam, Ulziikhutag
consulted: All team members
informed: All team members
---

# Adopt JSDoc for Documentation of JavaScript Code

## Context and Problem Statement

As software developers, it is essential we maintain a robust software base that is reliable, maintainable, and well-tested. This involves adopting testing tools that allow us to catch and prevent bugs, and verify functionality in our codebase. Using Jest helps achieve this by providing a fast, flexible, and developer-friendly testing framework that integrates well with JavaScript projects.

## Decision Drivers

* Fast and parallel test execution
* Strong community support and active maintenance
* Familiarity and prior experience with Jest
* Small learning curve

## Considered Options

* Jest
* Mocha

## Decision Outcome

We chose to use Jest as our unit testing framework based on our in-class experience with it. Jest offers a simple yet powerful testing environment that aligns well with the needs of the software we are building. Its ease of use, built-in features, and familiarity made it a practical and efficient choice for our team.

### Consequences

* Good, because it simplifies setup for unit and component testing
* Good, because it includes many built-in features, reducing dependency on multiple testing tools
* Good, because small learning curve for developers, as Jest was taught in class.
* Bad, because increased dependency on Node.js, not supporting real-browser experiences.

### Confirmation

This decision will be confirmed by:
* Installation of Jest, and presence of it in package.json
* We will include a folder named test in our repository, which will contain all our testing files.
* Presence of Jest's built-in functions in the testing environment, such as: test(), expect(), and toBe()

## Pros and Cons of the Options

### Mocha

* Good, because it is a mature and widely adopted testing framework
* Good, because it's lightweight and flexible, especially for Node.js-based applications
* Bad, because it requires additional installation of external libraries (e.g., Chai, Sinon, and nyc etc.)
* Bad, because increased complexity compared to Jest
* Bad, because it presents a steeper learning curve for developers unfamiliar with its ecosystem.


## More Information

* [Jest homepage](https://jestjs.io/)
* [Introduction to Jest](https://jestjs.io/docs/getting-started)
* We’ve already implemented some unit-testing with Jest