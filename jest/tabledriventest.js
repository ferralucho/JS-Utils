const cases = [
  ["user@email.com", true],
  ["user-1@email.com", true],
  ["@email.com", false],
  ["user@", false],
  ["useremail.com", false],
]

test.each(cases)("validateEmail(%s) should be %s", (email, expected) => {
  expect(validateEmail(email)).toEqual(expected);
});
