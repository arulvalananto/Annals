function passwordStrengthChecker(val) {
  let percentage = 0;

  if (val.match(/[A-Z]/)) {
    percentage += 25;
  }
  if (val.match(/[0-9]/)) {
    percentage += 15;
  }

  if (val.length > 8) {
    percentage += 40;
  }

  if (val.match(/[-!$%@^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
    percentage += 20;
  }

  return percentage;
}

module.exports = passwordStrengthChecker;
