# Simple github actions selenium automate testing

Typescript, jest, selenium automate testing demonstration

# Requirements

- NodeJS
- NPM
- Docker

# Test cases

- Google search e2e `google-selenium-test.test.ts`

# Run locally

1. Run the selenium webdriver chrome using docker `docker run -d -p 4444:4444 selenium/standalone-chrome`
2. Install packages `npm i`
3. Run the e2e tests `npm run test:selenium`