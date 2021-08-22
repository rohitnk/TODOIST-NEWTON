import React, { useState } from "react";
import "../App.scss";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import addDays from "date-fns/addDays";
import isToday from "date-fns/isToday";

const FORMAT = "dd/MM/yyyy";

function AddTasks({ onCancel, onAddTask }) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(null);

  function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }
  return (
    <div className={"add-task-dialog"}>
      <input
        defaultValue={task}
        onChange={(event) => {
          // console.log(task);
          setTask(event.target.value);
        }}
      />
      <div className={"add-task-action-container"}>
        <div className={"btns-container"}>
          <button
            disabled={!task}
            className={"add-button"}
            onClick={() => {
              setTask("");
              onCancel();
              onAddTask(task, date);
            }}
          >
            Add Task
          </button>
          <button
            className={"cancel-button"}
            onClick={() => {
              setTask("");
              onCancel();
            }}
          >
            Cancel
          </button>
        </div>
        <div className={"icon-container"}>
          <DayPickerInput
            onDayChange={(day) => setDate(day)}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
            formatDate={formatDate}
            format={FORMAT}
            dayPickerProps={{
              modifiers: {
                disabled: [{ before: new Date() }],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

const TASKS_HEADER_MAPPING = {
  INBOX: "Inbox",
  TODAY: "Today",
  NEXT_7: "Next 7 days",
};

const TaskItems = ({ selectTab, tasks, setTasks }) => {
  console.log(selectTab);
  if (selectTab === "NEXT_7") {
    return tasks
      .filter(
        (task) =>
          isAfter(task.date, new Date()) &&
          isBefore(task.date, addDays(new Date(), 7))
      )
      .map((task) => (
        <div className={"taskoutput"}>
          <span>{task.text}</span>
          <span> {dateFnsFormat(new Date(task.date), FORMAT)}</span>
        </div>
      ));
  }
  if (selectTab === "TODAY") {
    return tasks
      .filter((task) => isToday(task.date))
      .map((task) => (
        <div className={"taskoutput"}>
          <span>{task.text}</span>
          <span> {dateFnsFormat(new Date(task.date), FORMAT)}</span>
        </div>
      ));
  }
  return tasks.map((task) => (
    <div className={"taskoutput"}>
      <span>{task.text}</span>
      <span> {dateFnsFormat(new Date(task.date), FORMAT)}</span>
    </div>
  ));
};

const Task = ({ selectTab }) => {
  console.log();
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  function addNewTask(text, date) {
    const newTaskItem = { text, date: date || new Date() };
    setTasks([...tasks, newTaskItem]);
  }

  return (
    <div className={"tasks"}>
      <h1>{TASKS_HEADER_MAPPING[selectTab]}</h1>
      <div
        className={"add-task-btn"}
        onClick={() => setShowAddTask(!showAddTask)}
      >
        <span className={"plus"}>+</span>
        <span className={"add-task-text"}>Add task</span>
      </div>
      {showAddTask && (
        <AddTasks
          onAddTask={addNewTask}
          onCancel={() => setShowAddTask(false)}
        />
      )}

      {tasks.length > 0 ? (
        <TaskItems tasks={tasks} selectTab={selectTab} setTasks={setTasks} />
      ) : (
        <p>No tasks yet</p>
      )}
    </div>
  );
};

export default Task;
