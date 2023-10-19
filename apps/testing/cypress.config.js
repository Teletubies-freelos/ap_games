const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    execTimeout: 10*10**3,
    taskTimeout: 10*10**3,
    responseTimeout: 10*10**3,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
