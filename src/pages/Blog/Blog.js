import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const Blog = () => {
  const { title } = useContext(AuthContext);
  title("Blog");
  return (
    <div className="">
      <div className="collapse w-full md:w-1/2 mx-auto">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          1. What are the different ways to manage a state in a React
          application?
        </div>
        <div className="collapse-content pl-10">
          <p>
            The Four Kinds of React State to Manage When we talk about state in
            our applications, it’s important to be clear about what types of
            state actually matter.
          </p>
          <p className="pt-3">
            There are four main types of state you need to properly manage in
            your React apps:
          </p>
          <ul className="pt-3">
            <li>1. Local state</li>
            <li>2. Global state</li>
            <li>3. Server state</li>
            <li>4. URL state</li>
          </ul>
        </div>
      </div>

      <div className="collapse w-full md:w-1/2 mx-auto">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          2. How does prototypical inheritance work?
        </div>
        <div className="collapse-content pl-10">
          <p className="pt-3">
            The Prototypal Inheritance is a feature in javascript used to add
            methods and properties in objects.{" "}
          </p>
          <p className="pt-3">
            It is a method by which an object can inherit the properties and
            methods of another object.{" "}
          </p>
          <p className="pt-3">
            Traditionally, in order to get and set the [[Prototype]] of an
            object,
          </p>
          <p className="pt-3">
            we use Object.getPrototypeOf and Object.setPrototypeOf.
          </p>
        </div>
      </div>

      <div className="collapse w-full md:w-1/2 mx-auto">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          3. What is a unit test? Why should we write unit tests?
        </div>
        <div className="collapse-content pl-10">
          <p className="pt-3">
            A unit test is a way of testing a unit - the smallest piece of code
            that can be logically isolated in a system.{" "}
          </p>
          <p className="pt-3">
            In most programming languages, that is a function, a subroutine, a
            method or property. The isolated part of the definition is
            important.
          </p>
          <p className="pt-3">
            They enable you to catch bugs early in the development process.
            Automated unit tests help a great deal with regression testing. They
            detect code smells in your codebase. For example, if you're having a
            hard time writing unit tests for a piece of code, it might be a sign
            that your function is too complex.
          </p>
        </div>
      </div>

      <div className="collapse w-full md:w-1/2 mx-auto">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          4. React vs. Angular vs. Vue?
        </div>
        <div className="collapse-content pl-10">
          <p className="pt-3">
            Vue provides higher customizability and hence is easier to learn
            than Angular or React. Further, Vue has an overlap with Angular and
            React with respect to their functionality like the use of
            components. Hence, the transition to Vue from either of the two is
            an easy option
          </p>
          <p className="pt-3">React:</p>
          <p className="">
            React offers a Getting Started guide that should help one set up
            React in about an hour. The documentation is thorough and complete,
            with solutions to common issues already present on Stack Overflow.
            React is not a complete framework and advanced features require the
            use of third-party libraries. This makes the learning curve of the
            core framework not so steep but depends on the path you take with
            additional functionality. However, learning to use React does not
            necessarily mean that you are using the best practices.
          </p>
          <p className="pt-3">Angular:</p>
          <p className="">
            Angular has a steep learning curve, considering it is a complete
            solution, and mastering Angular requires you to learn associated
            concepts like TypeScript and MVC. Even though it takes time to learn
            Angular, the investment pays dividends in terms of understanding how
            the front end works.
          </p>
          <p className="pt-3">Vue:</p>
          <p className="">
            Vue provides higher customizability and hence is easier to learn
            than Angular or React. Further, Vue has an overlap with Angular and
            React with respect to their functionality like the use of
            components. Hence, the transition to Vue from either of the two is
            an easy option. However, simplicity and flexibility of Vue is a
            double-edged sword — it allows poor code, making it difficult to
            debug and test.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
