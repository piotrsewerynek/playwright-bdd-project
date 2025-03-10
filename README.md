# Playwright BDD Project

## 📌 Project Description

**Playwright/Typescript** project for end-to-end web application testing. By using the BDD approach, tests are readable and easy to manage.

## 🛠️ Technologies
- [Playwright](https://playwright.dev/) – Browser automation
- [Playwright-BDD](https://vitalets.github.io/playwright-bdd/#/) – Behavior-Driven Development (BDD)
- [TypeScript](https://www.typescriptlang.org/) – Statically-typed JavaScript

## 📂 Project Structure
```
playwright-bdd-project/tests
│-- features/            # Cucumber feature files (.feature)
│-- page-objects/        # Page Object Model (POM)
│-- steps/               # Cucumber step definitions
│-- utils/               # Test helpers
│-- playwright.config.ts # Playwright configuration
│-- package.json         # npm dependencies
|-- .env                 # environment variables
```

## 🚀 Installation & Running Tests

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/piotrsewerynek/playwright-bdd-project.git
cd playwright-bdd-project
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Install Playwright Browsers
```sh
npx playwright install
```

### 4️⃣ Run Tests
#### Run all tests:
```sh
npm test  ("npx bddgen && npx playwright test --ui")
```

## 📊 Test Reports
This project generates detailed test reports using **Cucumber HTML Reports** and **Allure Reports**.

### 📝 Cucumber HTML Report
Generated after execution in ***test-results*** directory

### 📈 Generate Allure Report
Generated after execution in ***allure-results*** directory

## 🛠 Playwright Configuration
Playwright configuration is located in `playwright.config.ts`, where you can define:
- Default browser (`chromium`, `firefox`, `webkit`)
- Test timeouts
- Test environments

## 🛠 .env Configuration
Configuration is located in `.env`, where you can define:
- slowMo
- headless mode

## 🏆 Author
Project created by [Piotr Sewerynek](https://github.com/piotrsewerynek).

## 📜 License
This project is released under the MIT License.

