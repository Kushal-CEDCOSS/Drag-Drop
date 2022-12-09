import { useEffect, useState } from "react";
import "./DragandDrop.css";

const DragandDrop = () => {
  const [inputFieldStates, setInputFieldStates] = useState({
    reviewButton: false,
    pendingButton: false,
    completedButton: false,
  });
  const [transaction, setTransaction] = useState({ content: "", from: "" });
  const [reviewArray, setReviewArray] = useState([]);
  const [pendingArray, setPendingArray] = useState([]);
  const [completedArray, setCompletedArray] = useState([]);
  const [flag, setFlag] = useState(false);
  const [universalPosition, setUniversalPosition] = useState("");

  const allowDrop = (ev) => {
    if (universalPosition !== "") return;
    ev.preventDefault();
  };

  const drag = (ev) => {
    if (universalPosition !== "") return;
    ev.dataTransfer.setData("text", ev.target.id);
    if (ev.target.classList.contains("reviewArea")) {
      setTransaction({
        content: ev.target.firstChild.textContent,
        from: "reviewArea",
      });
    } else if (ev.target.classList.contains("pendingArea")) {
      setTransaction({
        content: ev.target.firstChild.textContent,
        from: "pendingArea",
      });
    } else {
      setTransaction({
        content: ev.target.firstChild.textContent,
        from: "completedArea",
      });
    }
  };

  //   Function for Drop Check
  const drop = (ev) => {
    if (universalPosition !== "") return;
    ev.preventDefault();
    if (!ev.target.classList.contains(transaction.from)) {
      var data = ev.dataTransfer.getData("text");
      if (ev.target.classList.contains("reviewArea")) {
        setReviewArray([
          ...reviewArray,
          document.getElementById(data).firstChild.textContent,
        ]);
      } else if (ev.target.classList.contains("pendingArea")) {
        setPendingArray([
          ...pendingArray,
          document.getElementById(data).firstChild.textContent,
        ]);
      } else {
        setCompletedArray([
          ...completedArray,
          document.getElementById(data).firstChild.textContent,
        ]);
      }
      setFlag(!flag);
    }
  };

  //   Function to show/hide Input Fields
  const openField = (event, area) => {
    if (area === "review") {
      if (!inputFieldStates.reviewButton) {
        event.target.style.transform = "rotate(135deg)";
        document.getElementById("review_field").style.display = "block";
        setInputFieldStates({ ...inputFieldStates, reviewButton: true });
      } else {
        event.target.style.transform = "rotate(0deg)";
        document.getElementById("review_field").style.display = "none";
        setInputFieldStates({ ...inputFieldStates, reviewButton: false });
      }
    } else if (area === "pending") {
      if (!inputFieldStates.pendingButton) {
        event.target.style.transform = "rotate(135deg)";
        document.getElementById("pending_field").style.display = "block";
        setInputFieldStates({ ...inputFieldStates, pendingButton: true });
      } else {
        event.target.style.transform = "rotate(0deg)";
        document.getElementById("pending_field").style.display = "none";
        setInputFieldStates({ ...inputFieldStates, pendingButton: false });
      }
    } else {
      if (!inputFieldStates.completedButton) {
        event.target.style.transform = "rotate(135deg)";
        document.getElementById("completed_field").style.display = "block";
        setInputFieldStates({ ...inputFieldStates, completedButton: true });
      } else {
        event.target.style.transform = "rotate(0deg)";
        document.getElementById("completed_field").style.display = "none";
        setInputFieldStates({ ...inputFieldStates, completedButton: false });
      }
    }
  };

  // Function to add new task
  const handleTaskAddition = (e, arrayname, pos) => {
    if(e.target.value === "") return;
    if (e.key === "Enter") {
      if (arrayname === "review") {
        let temp = [...reviewArray];
        universalPosition === ""
          ? temp.splice(pos, 0, e.target.value)
          : (temp[universalPosition] = e.target.value);
        setReviewArray(temp);
      } else if (arrayname === "pending") {
        let temp = [...pendingArray];
        universalPosition === ""
          ? temp.splice(pos, 0, e.target.value)
          : (temp[universalPosition] = e.target.value);
        setPendingArray(temp);
      } else {
        let temp = [...completedArray];
        universalPosition === ""
          ? temp.splice(pos, 0, e.target.value)
          : (temp[universalPosition] = e.target.value);
        setCompletedArray(temp);
      }
      e.target.value = "";
      setUniversalPosition("");
    }
  };

  // Function to Edit an existing task
  const editTask = (arrayname, pos) => {
    if (arrayname === "review") {
      document.getElementById("review_field").value = reviewArray[pos];
      document.getElementById(
        "review_field"
      ).previousElementSibling.style.transform = "rotate(135deg)";
      document.getElementById("review_field").style.display = "block";
      setInputFieldStates({ ...inputFieldStates, reviewButton: true });
    } else if (arrayname === "pending") {
      document.getElementById("pending_field").value = pendingArray[pos];
      document.getElementById(
        "pending_field"
      ).previousElementSibling.style.transform = "rotate(135deg)";
      document.getElementById("pending_field").style.display = "block";
      setInputFieldStates({ ...inputFieldStates, pendingButton: true });
    } else {
      document.getElementById("completed_field").value = completedArray[pos];
      document.getElementById(
        "completed_field"
      ).previousElementSibling.style.transform = "rotate(135deg)";
      document.getElementById("completed_field").style.display = "block";
      setInputFieldStates({ ...inputFieldStates, completedButton: true });
    }
    setUniversalPosition(pos);
  };

  // Function to delete elements from array
  const deleteTask = (arrayname, pos) => {
    if (arrayname === "review") {
      setReviewArray(reviewArray.filter((item, index) => index !== pos));
    } else if (arrayname === "pending") {
      setPendingArray(pendingArray.filter((item, index) => index !== pos));
    } else {
      setCompletedArray(completedArray.filter((item, index) => index !== pos));
    }
  };

  useEffect(() => {
    if (transaction.content === "") return;

    if (transaction.from === "reviewArea") {
      setReviewArray(
        reviewArray.filter((item) => item !== transaction.content)
      );
    } else if (transaction.from === "pendingArea") {
      setPendingArray(
        pendingArray.filter((item) => item !== transaction.content)
      );
    } else {
      setCompletedArray(
        completedArray.filter((item) => item !== transaction.content)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);

  return (
    <div className="DragandDrop">
      <h1>Todo App</h1>
      <div className="row">
        <div
          className="review reviewArea"
          id="div1"
          onDrop={(event) => drop(event)}
          onDragOver={(event) => allowDrop(event)}
        >
          <h2 className="review__title reviewArea">Review</h2>
          <button
            className="add reviewArea"
            onClick={(e) => {
              openField(e, "review");
            }}
          >
            +
          </button>
          <input
            id="review_field"
            className="reviewArea"
            type="text"
            placeholder="Add a new task here"
            onKeyDown={(e) =>
              handleTaskAddition(e, "review", reviewArray.length)
            }
          />
          {reviewArray.map((item, index) => (
            <div
              key={index}
              id={`review${index}`}
              className="list-item review__child reviewArea"
              draggable="true"
              onDragStart={(event) => drag(event)}
            >
              <p className="reviewArea" id={`review${index}`}>
                {item}
              </p>
              <i
                title={`Edit task ${item}`}
                className="fa-solid fa-pencil reviewArea"
                onClick={() => editTask("review", index)}
              ></i>
              <i
                title={`Delete task ${item}`}
                onClick={() => {
                  deleteTask("review", index);
                }}
                className="fa-solid fa-trash-can reviewArea"
              ></i>
            </div>
          ))}
        </div>

        <div
          className="pending pendingArea"
          id="div2"
          onDrop={(event) => drop(event)}
          onDragOver={(event) => allowDrop(event)}
        >
          <h2 className="pending__title pendingArea">Pending</h2>
          <button
            className="add pendingArea"
            onClick={(e) => {
              openField(e, "pending");
            }}
          >
            +
          </button>
          <input
            className="pendingArea"
            type="text"
            placeholder="Add a new task here"
            id="pending_field"
            onKeyDown={(e) =>
              handleTaskAddition(e, "pending", pendingArray.length)
            }
          />
          {pendingArray.map((item, index) => (
            <div
              key={index}
              id={`pending${index}`}
              className="list-item pending__child pendingArea"
              draggable="true"
              onDragStart={(event) => drag(event)}
            >
              <p className="pendingArea" id={`pending${index}`}>
                {item}
              </p>
              <i
                title={`Edit task ${item}`}
                className="fa-solid fa-pencil pendingArea"
                onClick={() => editTask("pending", index)}
              ></i>
              <i
                title={`Delete task ${item}`}
                onClick={() => {
                  deleteTask("pending", index);
                }}
                className="fa-solid fa-trash-can pendingArea"
              ></i>
            </div>
          ))}
        </div>

        <div
          className="completed completedArea"
          id="div2"
          onDrop={(event) => drop(event)}
          onDragOver={(event) => allowDrop(event)}
        >
          <h2 className="completed__title completedArea">Completed</h2>
          <button
            className="add completedArea"
            onClick={(e) => {
              openField(e, "completed");
            }}
          >
            +
          </button>
          <input
            className="completedArea"
            id="completed_field"
            type="text"
            placeholder="Add a new task here"
            onKeyDown={(e) =>
              handleTaskAddition(e, "completed", completedArray.length)
            }
          />
          {completedArray.map((item, index) => (
            <div
              key={index}
              id={`completed${index}`}
              className="list-item completed__child completedArea"
              draggable="true"
              onDragStart={(event) => drag(event)}
            >
              <p className="completedArea" id={`completed${index}`}>
                {item}
              </p>
              <i
                title={`Edit task ${item}`}
                className="fa-solid fa-pencil completedArea"
                onClick={() => editTask("completed", index)}
              ></i>
              <i
                title={`Delete task ${item}`}
                onClick={() => {
                  deleteTask("completed", index);
                }}
                className="fa-solid fa-trash-can completedArea"
              ></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragandDrop;
