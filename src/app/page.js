"use client";
import React from "react";

import Form from "@/components/Form";
import Header from "@/components/Header";
import TODOHero from "@/components/TODOHero";
import TODOList from "@/components/TODOList";

function Home() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    window.globalSetData = function (newData) {
      console.log("New data arrived with " + newData.length + " item(s)");
      setTodos(newData);
      return "null";
    };

    console.log("Start loading...");
    HybridWebView.InvokeDotNet("StartTaskLoading");
  }, []);

  React.useEffect(() => {
    console.log("Setting todos in storage");
    window.HybridWebView.InvokeDotNet("SetTodos", [todos]);
  }, [todos]);

  const todos_completed = todos.filter(
    (todo) => todo.is_completed == true
  ).length;
  const total_todos = todos.length;

  return (
    <div className="wrapper">
      <Header />
      <TODOHero todos_completed={todos_completed} total_todos={total_todos} />
      <Form todos={todos} setTodos={setTodos} />
      <TODOList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default Home;
