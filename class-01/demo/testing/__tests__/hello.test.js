"use strict";

// Require the module we're testing
const hello = require("../src/hello.js");

// decribe (test group name, () => { test group body });
// // This is a keyword we use to define
// // a test. We're saying that we're
// // describing how a module should behave
describe("Hello", () => {
  // it (test name, () => { test body, expected result })
  // // this is a statement that "should" be
  // // true in our module. Jest will run through
  // // these "it" statements and find out if
  // // the statement "is" true
  it("requires one param", () => {
    let message = hello.sayHello();

    // expect(item).toXXXX();
    // // The it statement always ends in what
    // // result you expect from the previous actions.
    // // expect has a lot of different functions,
    // // toBeNull() is just one of them
    expect(message).toBeNull();
  });

  it("only allows one param", () => {
    let message = hello.sayHello("john", "cathy");
    expect(message).toBeNull();
  });

  it("does not allow numeric values", () => {
    let message = hello.sayHello(1);
    expect(message).toBeNull();
  });

  it("does not allow arrays as a param", () => {
    let message = hello.sayHello([]);
    expect(message).toBeNull();
  });

  it("does not allow objects as a param", () => {
    let message = hello.sayHello({});
    expect(message).toBeNull();
  });

  it("works when given a word", () => {
    var message = hello.sayHello("John");
    var expectedOutput = "Hello, John";
    expect(message).toEqual(expectedOutput);
  });
});
