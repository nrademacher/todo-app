import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import ToDo from './ToDo';

const App = () => {
  const [key, setKey] = useState('all');
  const active = useRef([]);
  const [activeState, setActiveState] = useState(active.current);
  const completed = useRef([]);
  const [completedState, setCompletedState] = useState([]);
  const all = useRef([]);
  const [allState, setAllState] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (reactLocalStorage.getObject('todos').current) {
      all.current = reactLocalStorage.getObject('todos').current;
      setAllState(all.current);
      active.current = all.current.filter((todos) => !todos.checked);
      setActiveState(active.current);
      completed.current = all.current.filter((todos) => todos.checked);
      setCompletedState(completed.current);
    }
  }, []);

  useEffect(() => {
    reactLocalStorage.setObject('todos', all);
  }, [all.current]);

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodoObj = {
      id: Math.floor(Math.random() * 9999),
      label: newTodo,
      checked: false,
    };

    active.current = [...active.current, newTodoObj];
    all.current = [...all.current, newTodoObj];

    setAllState(all.current);
    setActiveState(active.current);
    setNewTodo('');
    reactLocalStorage.setObject('todos', all);
  };

  const handleDeleteComplete = () => {
    all.current = all.current.filter((todos) => !todos.checked);
    setAllState(all.current);
    completed.current = [];
    setCompletedState(completed.current);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <Row>
        <h1 className="mt-2 mb-4">#todo</h1>
      </Row>
      <Row>
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab eventKey="all" title="All">
            <Form
              className="d-flex my-4"
              inline
              onSubmit={(e) => handleSubmit(e)}
            >
              <Form.Control
                value={newTodo}
                onChange={(e) => handleChange(e)}
                className="me-2"
                placeholder="Add todo"
              />
              <Button type="submit">Submit</Button>
            </Form>
            {allState.length
              ? allState.map((todo) => (
                  <ToDo
                    setAllState={setAllState}
                    setActiveState={setActiveState}
                    setCompletedState={setCompletedState}
                    key={todo.id}
                    id={todo.id}
                    all={all}
                    allState={allState}
                    active={active}
                    completed={completed}
                    text={todo.label}
                    checkStatus={todo.checked}
                  />
                ))
              : null}
          </Tab>
          <Tab eventKey="active" title="Active">
            <Form
              className="d-flex my-4"
              inline
              onSubmit={(e) => handleSubmit(e)}
            >
              <Form.Control
                value={newTodo}
                onChange={(e) => handleChange(e)}
                className="me-2"
                placeholder="Add todo"
              />
              <Button type="submit">Submit</Button>
            </Form>
            {activeState.length
              ? activeState.map((todo) => (
                  <ToDo
                    setAllState={setAllState}
                    setActiveState={setActiveState}
                    setCompletedState={setCompletedState}
                    key={todo.id}
                    id={todo.id}
                    all={all}
                    allState={allState}
                    active={active}
                    completed={completed}
                    text={todo.label}
                    checkStatus={todo.checked}
                  />
                ))
              : null}
          </Tab>
          <Tab
            className="container-fluid d-flex justify-content-between flex-column mt-4"
            eventKey="completed"
            title="Completed"
          >
            <Row className="mb-4">
              {completedState.length
                ? completedState.map((todo) => (
                    <ToDo
                      setAllState={setAllState}
                      setActiveState={setActiveState}
                      setCompletedState={setCompletedState}
                      key={todo.id}
                      id={todo.id}
                      all={all}
                      allState={allState}
                      active={active}
                      completed={completed}
                      text={todo.label}
                      checkStatus={todo.checked}
                    />
                  ))
                : null}
            </Row>
            {completedState.length ? (
              <Row>
                <Button
                  onClick={handleDeleteComplete}
                  variant="danger"
                  className="d-flex align-items-center"
                  style={{
                    width: 'max-content',
                    margin: '6rem auto',
                    fontSize: '1.25em',
                    fontWeight: '500',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-1"
                    style={{ height: '1em', width: '1em' }}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete all
                </Button>
              </Row>
            ) : null}
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};

export default App;
