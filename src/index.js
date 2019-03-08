const dotenv = require('dotenv');
const createRunner = require('horsey-sauce');
const tap = require('simple-tap-parser');

function parseTap(output) {
  const parser = new tap.Parser(output);

  const stats = {
    output,
    tests: parser.getTestCount(),
    passed: parser.getValidCount(),
    failed: parser.getFailedCount(),
    errors: [],
  };

  // failures, add them to the errors array
  if (stats.failed > 0) {
    stats.errors = parser.tests.reduce((acc, t) => {
      // filter valid results, map line value on invalid results
      if (t.isValid()) return acc;
      const { line, details } = t;
      return acc.concat({ details, line: line.string });
    }, []);
  }

  return stats;
}

function getSauceCredentials(sauce) {
  if (sauce) {
    const { user: SAUCE_USER, key: SAUCE_KEY } = sauce;
    return { SAUCE_USER, SAUCE_KEY };
  }

  const { SAUCE_USER, SAUCE_KEY } = process.env;
  return { SAUCE_USER, SAUCE_KEY };
}

function validateSauceCredentials(SAUCE_USER, SAUCE_KEY) {
  // check that the sauce credentials are defined
  if (!SAUCE_USER || !SAUCE_KEY) {
    const errMessage = `You must include your sauce credentials. Do one of the following:

  - Pass in sauce.user and sauce.key as options
  - Set SAUCE_USER and SAUCE_KEY environment variables
  - Add SAUCE_USER and SAUCE_KEY to a .env file at the root`;

    throw new Error(errMessage);
  }
}

function gravyTap(src, options = {}) {
  dotenv.config();

  const { capabilities, sauce, rejectOnErrors = true } = options;

  const { SAUCE_USER, SAUCE_KEY } = getSauceCredentials(sauce);
  validateSauceCredentials(SAUCE_USER, SAUCE_KEY);

  function browserRunner(browser, helpers, cb) {
    helpers.getUncaughtErrors((err, errors) => {
      // pass failure along
      if (err) {
        cb(err);
        return;
      }

      // if there were uncaught errors, fail
      if (rejectOnErrors && errors) {
        cb(new Error(errors));
        return;
      }

      // return console output
      helpers.getConsoleOutput(cb);
    });
  }

  const runner = createRunner(SAUCE_USER, SAUCE_KEY);

  return runner
    .run(src, browserRunner, capabilities)
    .then(output => {
      const stats = parseTap(output);
      return runner.close().then(() => stats);
    })
    .catch(err => {
      try {
        // sometimes the close call can throw, but we don't care...
        runner.close();
      } catch (e) {} // eslint-disable-line no-empty
      throw err;
    });
}

module.exports = gravyTap;
