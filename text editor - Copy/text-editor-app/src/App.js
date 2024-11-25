import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const App = () => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const editorRef = useRef();

  const calculateTextMetrics = () => {
    const text = editorRef.current.innerText || ""; // Get plain text from the editable div

    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);

    const visibleText = text.replace(/\s/g, ""); // Remove all spaces
    setCharCount(visibleText.length); // Set character count to the length of visible text

    const estimatedTime = words.length / 200;
    setReadingTime(estimatedTime.toFixed(2)); // Rounded to two decimal places
  };

  useEffect(() => {
    const editorElement = editorRef.current;
    const handleInput = () => calculateTextMetrics();
    editorElement.addEventListener("input", handleInput);

    return () => editorElement.removeEventListener("input", handleInput);
  }, []);

  const handleFormatting = (command) => {
    document.execCommand(command, false, null);
  };

  const toCamelCase = (text) => {
    return text
      .split(/\s+/)
      .map((word, index) => {
        if (index === 0) return word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('');
  };

  const toSnakeCase = (text) => {
    return text
      .split(/\s+/)
      .map(word => word.toLowerCase())
      .join('_');
  };

  const toPascalCase = (text) => {
    return text
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  };

  const handleCaseConversion = (format) => {
    const text = editorRef.current.innerText || "";
    let convertedText = "";

    switch (format) {
      case "camelCase":
        convertedText = toCamelCase(text);
        break;
      case "snake_case":
        convertedText = toSnakeCase(text);
        break;
      case "PascalCase":
        convertedText = toPascalCase(text);
        break;
      default:
        break;
    }

    // Directly update the editor with the formatted text
    editorRef.current.innerText = convertedText;
  };

  return (
    <div className="app">
      <header>
        <h1>Text Editor App</h1>
      </header>

      <div
        ref={editorRef}
        contentEditable
        className="editor"
        placeholder="Start typing here..."
      ></div>

      <div className="controls">
        <div className="formatting-buttons">
          <button onClick={() => handleFormatting("bold")} title="Bold">B</button>
          <button onClick={() => handleFormatting("italic")} title="Italic"><em>I</em></button>
          <button onClick={() => handleFormatting("underline")} title="Underline"><u>U</u></button>
        </div>

        <div className="case-conversion-buttons">
          <button onClick={() => handleCaseConversion("camelCase")}>camelCase</button>
          <button onClick={() => handleCaseConversion("snake_case")}>snake_case</button>
          <button onClick={() => handleCaseConversion("PascalCase")}>PascalCase</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat-item">
          <strong>Word Count:</strong> <span>{wordCount}</span>
        </div>
        <div className="stat-item">
          <strong>Character Count:</strong> <span>{charCount}</span>
        </div>
        <div className="stat-item">
          <strong>Estimated Reading Time:</strong> <span>{readingTime} min</span>
        </div>
      </div>
    </div>
  );
};

export default App;
