# Ecommerce Automation Testing

A comprehensive test automation framework for [AutomationExercise.com](https://automationexercise.com), covering **UI** and **API** testing with Playwright and TypeScript.

---

## Test Coverage

| Type        | Tool                         | Pattern                     |
| ----------- | ---------------------------- | --------------------------- |
| UI Testing  | Playwright                   | Page Object Model (POM)     |
| API Testing | Playwright APIRequestContext | Request/Response validation |
| CI/CD       | GitHub Actions               | Auto-run on push/PR         |

---

## Project Structure

```
ecommerce-automation/
├── .github/workflows/     # CI/CD pipeline
├── data/                  # Test data (JSON)
├── fixtures/              # Custom Playwright fixtures
├── helpers/               # Helper functions
├── pom/                   # Page Object Model classes
├── tests/
│   ├── ui/                # UI test cases
│   └── api/               # API test cases
├── utils/                 # Utility functions
└── playwright.config.ts   # Playwright configuration
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v22.9.0
- npm v10.8.3

---

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/nhlamtan/ecommerce-automation.git
cd ecommerce-automation
```

**2. Install dependencies**

```bash
npm install
npx playwright install
```

---

## ▶️ Running Tests

```bash
# Run all tests
npx playwright test

# Run UI tests only
npx playwright test tests/ui

# Run API tests only
npx playwright test tests/api

# Run with UI mode (interactive)
npx playwright test --ui

# Run in headed mode (see browser)
npx playwright test --headed

# View HTML report
npx playwright show-report
```

---

## CI/CD

Tests run automatically via **GitHub Actions** on every push and pull request to `main`.

Check the latest run: [Actions tab](https://github.com/nhlamtan/ecommerce-automation/actions)

---

## Tech Stack

- **Language:** TypeScript
- **Framework:** Playwright
- **Pattern:** Page Object Model (POM)
- **CI/CD:** GitHub Actions
- **Target:** [automationexercise.com](https://automationexercise.com)

---

## Author

Nguyen Hoang Lam Tan
