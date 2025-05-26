---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 100
title: Puppeteer for UI testing

status: accepted
date: 2025-05-25
decision-makers: Roy, Kumiko, Sam, Ulziikhutag
consulted: All team members
informed: All team members
---

# Use of Puppeteer for front-end development and automated testing

## Context and Problem Statement

As the project involves developing and maintaining a dynamic front-end interface, ensuring consistent UI behavior and validating user flows across updates is essential. Manual testing has proven time-consuming and error-prone, especially for repetitive actions like button clicks, form submissions, and navigation between views. To address this, the project requires a solution that can automate front-end interactions in a reliable, maintainable, and developer-friendly way while integrating smoothly with the existing development workflow.

## Decision Drivers

* The project requires reliable end-to-end testing for critical user flows.
* Tests need to run in headless mode for faster CI/CD integration.
* Puppeteer offers a simple API that improves developer productivity.
* The tool supports modern, dynamic web applications.
* A standard tool is needed to align frontend and QA testing practices.

## Considered Options

* Puppeteer
* Selenium WebDriver 
* WebdriverIO
* Cypress

## Decision Outcome

Chosen option: Puppeteer, because it provides a reliable and developer-friendly solution for end-to-end testing, integrates seamlessly with CI/CD workflows, and supports modern JavaScript applications. It addresses key decision drivers such as test automation efficiency, headless browser execution, and ease of debugging. Among the considered tools, Puppeteer offers the best balance of simplicity, performance, and community support for our project's needs.

### Consequences

* Good, Speeds up testing through headless browser automation.
* Good, Easy to write and maintain scripts using a familiar JavaScript API.
* Good, Integrates well with modern front-end stacks and CI/CD pipelines.
* Bad, Can be fragile with dynamic UIs if not carefully scripted.
* Bad, Lacks built-in test runner or assertions; needs integration with other libraries (e.g., Jest, Mocha).
* Bad, Slower than unit tests and may add overhead to CI runs.

### Confirmation

Compliance with this ADR will be confirmed through code reviews and regular test execution in the CI/CD pipeline. Automated test suites written with Puppeteer will be reviewed to ensure they align with best practices for end-to-end testing and accurately reflect intended user flows. Successful integration of these tests into the deployment workflow, along with consistent pass rates and debugging support, will validate that the decision is correctly implemented.

## Pros and Cons of the Options

### Selenium WebDriver 

* Good, Works with many programming languages (Java, Python, C#, JavaScript, etc.).
* Good, Suitable for complex test scenarios, including multi-tab and multi-window interactions.
* Neutral, Requires integration with third-party tools (e.g., TestNG, JUnit, Allure) for a complete testing framework.
* Bad, Debugging is harder due to less developer-friendly APIs.

### WebdriverIO

* Good, Built-in test runner with first-class support for Mocha, Jasmine, and Cucumber.
* Good, Supports both WebDriver and DevTools protocols, offering flexibility.
* Neutral, Built-in features (e.g., wait commands, retry logic) reduce flakiness, but require some learning to use effectively.
* Bad, Complex configurations may lead to mismanagement in large teams without standardized practices.

## More Information

* [Puppeteer docs](https://pptr.dev/)
* Uses the Chrome DevTools Protocol to control the browser.
* Ideal for automating browser tasks like form submissions, screenshots, and testing.
* Lightweight and easy to set up for JavaScript/Node.js projects.