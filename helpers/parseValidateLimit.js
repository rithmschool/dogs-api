function parseValidateLimit(limitStr) {
  if (isNaN(limitStr)) {
    return null;
  }
  return +limitStr;
}

function whoGivesAHoot() {
  console.log('wut');
}

module.exports = parseValidateLimit;
