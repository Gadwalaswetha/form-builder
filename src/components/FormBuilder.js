import React, { useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"; // For drag-and-drop

function FormBuilder() {
  const [formTitle, setFormTitle] = useState("");

  const [headerImage, setHeaderImage] = useState("");

  const [questions, setQuestions] = useState([]);

  // Add a new question

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,

      { type: "", content: "", options: [], answer: "", category: "" },
    ]);
  };

  // Handle changes in the input fields for questions

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];

    updatedQuestions[index][field] = value;

    setQuestions(updatedQuestions);
  };

  // Drag-and-drop handler for categorized questions

  const onDragEnd = (result, index) => {
    if (!result.destination) return;

    const updatedQuestions = [...questions];

    const [removed] = updatedQuestions[index].options.splice(
      result.source.index,

      1
    );

    updatedQuestions[index].options.splice(
      result.destination.index,

      0,

      removed
    );

    setQuestions(updatedQuestions);
  };

  const handleSaveForm = () => {
    console.log("Form Title:", formTitle);

    console.log("Header Image URL:", headerImage);

    console.log("Questions:", questions);
  };

  return (
    <div className="form-builder">
      <h1>Form Builder</h1>

      <input
        type="text"
        placeholder="Enter Form Title"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
      />

      <input
        type="url"
        placeholder="Enter Header Image URL"
        value={headerImage}
        onChange={(e) => setHeaderImage(e.target.value)}
      />

      {headerImage && (
        <img src={headerImage} alt="Header" className="header-image-preview" />
      )}

      {questions.map((question, index) => (
        <div key={index} className="question-card">
          <input
            type="text"
            placeholder="Enter Question"
            value={question.content}
            onChange={(e) =>
              handleQuestionChange(index, "content", e.target.value)
            }
          />

          <select
            value={question.type}
            onChange={(e) =>
              handleQuestionChange(index, "type", e.target.value)
            }
          >
            <option value="">Select Question Type</option>

            <option value="Categorize">Categorize</option>

            <option value="Cloze">Cloze</option>

            <option value="Comprehension">Comprehension</option>
          </select>

          {/* Handling Categorized Questions */}

          {question.type === "Categorize" && (
            <div>
              <input
                type="text"
                placeholder="Enter Category"
                value={question.category}
                onChange={(e) =>
                  handleQuestionChange(index, "category", e.target.value)
                }
              />

              <DragDropContext onDragEnd={(result) => onDragEnd(result, index)}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        display: "flex",

                        flexDirection: "column",

                        padding: "10px",
                      }}
                    >
                      {question.options.map((option, i) => (
                        <Draggable key={i} draggableId={String(i)} index={i}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                padding: "10px",

                                border: "1px solid #ccc",

                                margin: "5px 0",

                                ...provided.draggableProps.style,
                              }}
                            >
                              {option}
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          )}

          {/* Handling Cloze (Fill-in-the-Blank) Questions */}

          {question.type === "Cloze" && (
            <div>
              <textarea
                placeholder="Enter Text with Blanks"
                value={question.content}
                onChange={(e) =>
                  handleQuestionChange(index, "content", e.target.value)
                }
              />
            </div>
          )}

          {/* Handling Comprehension Questions */}

          {question.type === "Comprehension" && (
            <div>
              <textarea
                placeholder="Enter Paragraph"
                value={question.content}
                onChange={(e) =>
                  handleQuestionChange(index, "content", e.target.value)
                }
              />

              <input
                type="text"
                placeholder="MCQ Option"
                value={question.answer}
                onChange={(e) =>
                  handleQuestionChange(index, "answer", e.target.value)
                }
              />
            </div>
          )}
        </div>
      ))}

      <button onClick={handleAddQuestion}>Add Question</button>

      <button onClick={handleSaveForm}>Save Form</button>
    </div>
  );
}

export default FormBuilder;
