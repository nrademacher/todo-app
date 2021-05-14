import React, { useState } from 'react';
import { FormCheck } from 'react-bootstrap';

const ToDo = ({
  setAllState,
  setActiveState,
  setCompletedState,
  text,
  id,
  all,
  active,
  completed,
  checkStatus,
}) => {
  const [isChecked, setIsChecked] = useState(checkStatus);

  const handleChecked = () => {
    if (!isChecked) {
      active.current = active.current.filter((todos) => todos.id !== id);
      completed.current = [
        ...completed.current,
        { id: id + 1, label: text, checked: true },
      ];
      setIsChecked((prev) => !prev);
    } else {
      completed.current = completed.current.filter((todos) => todos.id !== id);
      active.current = [
        ...active.current,
        { id: id + 1, label: text, checked: false },
      ];
      setIsChecked((prev) => !prev);
    }
    setActiveState(active.current);
    setCompletedState(completed.current);
    all.current = [...active.current, ...completed.current];
    setAllState(all.current);
  };

  const handleDeleteComplete = () => {
    completed.current = completed.current.filter((todos) => todos.id !== id);
    setCompletedState(completed.current);
    all.current = all.current.filter((todos) => todos.id !== id);
    setAllState(all.current);
  };

  return (
    <div className="d-flex justify-content-between">
      <FormCheck
        id={id}
        label={text}
        checked={checkStatus}
        onChange={handleChecked}
        className="mb-2 justify-self-start"
      />
      {checkStatus && (
        <div role="delete button" onClick={handleDeleteComplete}>
          <svg
            className="justify-self-end"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '1.5em',
              height: '1.5em',
              color: 'lightgray',
              cursor: 'pointer',
            }}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ToDo;
