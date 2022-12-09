import React, { useState } from "react";


const CountOfWords = () => {
    const [text,setText] = useState("");
    const [message,setMessage] = useState(false);

  const showResult = () => {
    let res = "";
    let current = "";
    for (let i = 0; i < text.length - 1; i++) {
      let count = 1;
      for (let j = i + 1; j <= text.length - 1; j++) {
        if (text.charAt(i) === text.charAt(j)) {
          count++;
        } else {
          break;
        }
      }
      if (current !== text.charAt(i)) {
        res += text.charAt(i) + count;
      }
      current = text.charAt(i);
    }
    console.log(res);
    setMessage(true);
  }
  return (
    <div>
        <input type="text" placeholder="Enter text" onChange={e => {setMessage(false);setText(e.target.value)}} />
        <button onClick={showResult}>Show Result</button>
        {message && <p>Please check the console for output!</p>}
    </div>
  );
};

export default CountOfWords;
