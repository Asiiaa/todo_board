import { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
      fetch(`https://641edf1df228f1a83eab85eb.mockapi.io/todos`)
      .then(res => res.json())
      .then((data) => {
      setTodo(data)
    })
    }, []);

    function dragStartHandler(e, a, item) {
      setCurrentBoard(a)
      setCurrentItem(item)
    }

    function dragEndHandler(e) {
      e.target.style.boxShadow = 'none'
    }

    function dragLeaveHandler(e) {
      e.target.style.boxShadow = 'none'
    }

    function dragOverHandler(e) {
      e.preventDefault()
      if(e.target.className === 'item'){
        e.target.style.boxShadow = '0 4px 3xp green'
      }
    }

    function dropHandler(e, a, item) {
      e.preventDefault()
      const currentIndex = currentBoard.items.indexOf(currentItem)
      currentBoard.items.splice(currentIndex, 1)

      const dropIndex = a.items.indexOf(item)
      a.items.splice(dropIndex+1, 0, currentItem)
      setTodo(todo.map(b => {
        if(b.id === a.id) {
          return a
        }
        if(b.id === currentBoard.id) {
          return currentBoard
        }
        return b
      }))
    }

    function dropCardHandler(e, a) {
      a.items.push(currentItem)
      const currentIndex = currentBoard.items.indexOf(currentItem)
      currentBoard.items.splice(currentIndex, 1)
      setTodo(todo.map(b => {
        if(b.id === a.id) {
          return a
        }
        if(b.id === currentBoard.id) {
          return currentBoard
        }
        return b
      }))
    }
    
  return (
    <div className="App">
      {todo.map(a => 
        <div
         onDragOver={(e) => dragOverHandler(e)}
         onDrop={(e) => dropCardHandler(e, a)}
         key={Math.random()} 
         className="board"
         >
          <div className="board__title">{a.title}</div>
          {a.items.map(item =>
            <div 
            onDragStart={(e) => dragStartHandler(e, a, item)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, a, item)}
            draggable={true} 
            className="item"
            key={item.id}>
              {item.title}
            </div>)}
        </div>)}
    </div>
  );
}

export default App;
