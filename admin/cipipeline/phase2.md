# Phase 2 Pipeline Status

## Overview

After our first phase, we began expanding our pipeline to be more extensive and useful for our growing project. This included improving upon each existing GitHub Action as well as adding more checks. Furthermore, our workflow for when it comes to making changes and deploying has become more streamlined.

## What’s new

### Qltycode

- We added qltycode as a 3rd party tool for our repo to automatically enforce code quality every 24 hours
- This helps us gauge the readability and quality of our code to make everything more organized

### Puppeteer

- We implemented e2e testing with puppeteer to test out more comprehensive features like navigation and button clicking
- Runs automatically on every push and pull to ensure the core functionalities are working

## What's improved

- We updated JSDoc to automatically report the docs in the docs/ folder on every push and pull
- We added substantial unit tests to test individual fragments of our application for new features
- We have agreed on a set coding style to be used throughout our project

## In Progress

### Always adding more tests

- Since our project is still in progress, we will need to accomodate for the growing amount of features with more tests
- This includes both Jest and Puppeteer to test out small and large areas of the app

## Conclusion

We are proud of how our pipeline has come along, and we expect it to only become more thorough and useful to us as we implement more features.