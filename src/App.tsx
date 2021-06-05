import React, { DragEvent, useEffect, useState } from "react";
import styled from "styled-components";

const AppWindow = styled.div`
  width: 400px;
  height: 500px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 50px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  text-align: center;
`;

const TaskWindow = styled.div`
  width: 360px;
  height: 150px;
  background-color: rgba(153, 255, 255, 0.774);
  margin: 10px auto;
  font-family: "TaskFont";
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
`;

const SolutionWindow = styled.div`
  width: 360px;
  height: 100px;
  background-color: rgba(206, 206, 206, 0.774);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
`;

const WordsWindow = styled.div`
  width: 360px;
  height: 100px;
  background-color: rgba(153, 197, 255, 0.774);
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
`;

const ConfirmButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: #ccc;
  margin: 0 10px;
  border-radius: 50px;
  outline: none;
  border: none;
  :hover {
    background-color: rgba(126, 186, 255, 0.774);
  }
  :active {
    background-color: rgba(96, 170, 255, 0.932);
  }
  font-family: "TaskFont";
`;

const Words = styled.div`
  width: 80px;
  height: 20px;
  background-color: #fff;
  display: inline-block;
  margin: 5px;
  cursor: grab;
  border-radius: 5px;
  text-align: center;
  :hover {
    box-shadow: 2px 2px 2px black;
  }
  font-family: "WordsFont";
`;

function App() {
  const [examples, setExamples] = useState([
    {
      id: 1,
      rus: "Вчера сегодня было завтра",
      eng: "Yesterday today was tomorrow",
    },
    {
      id: 2,
      rus: "Рафик сто процентов не виноват",
      eng: "Rafik is not one hundred percent to blame",
    },
    {
      id: 3,
      rus: "Безумно можно быть первым",
      eng: "Its crazy to be the first",
    },
    {
      id: 4,
      rus: "Весь мир в труху - но потом",
      eng: "The whole world is in dust - but then",
    },
    {
      id: 5,
      rus: "У меня плохое предчувствие об этом",
      eng: "I have a bad feeling about this",
    },
  ]);

  const [currentExample, setCurrentExample] = useState(
    examples[getRandomInt(examples.length)]
  );

  const [solution, setSolution] = useState<Array<string>>([]);

  const [hoveredWord, setHoveredWord] = useState<string>("");

  const [solutionWords, setSolutionWords] = useState<Array<string>>([]);

  const [currentWord, setCurrentWord] = useState<string>("");

  const [thatsAllFolks, setThatsAllFolks] = useState<boolean>(false);

  useEffect(() => {
    setSolutionWords(currentExample.eng.split(" "));
  }, [currentExample]);
  useEffect(() => {
    if (examples.length !== 0) {
      setCurrentExample(examples[getRandomInt(examples.length)]);
    } else {
      setThatsAllFolks(true);
    }
  }, [examples]);

  const dragStartHandler = (event: DragEvent, ex: string) => {
    setCurrentWord(ex);
  };

  const dragOverHandler = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const dragOverWordHandler = (event: DragEvent, sol: string) => {
    event.preventDefault();
    event.stopPropagation();
    setHoveredWord(sol);
  };

  const wordSortHandler = (event: DragEvent) => {
    if (solution.includes(currentWord)) {
      const currentIndex = solution.indexOf(currentWord);
      solution.splice(currentIndex, 1);
      const dropIndex = solution.indexOf(hoveredWord);
      solution.splice(dropIndex + 1, 0, currentWord);
      setSolution(
        solution.map((sol) => {
          return sol;
        })
      );
    } else {
    }
  };

  const dropHandler = (event: DragEvent) => {
    event.preventDefault();
    if (solution.filter((el) => el === currentWord).length !== 0) {
      return solution;
    }
    setSolution((prev) => [...prev, currentWord]);
    setSolutionWords((prev) => prev.filter((el) => el !== currentWord));
  };

  const backDropHandler = (event: DragEvent) => {
    event.preventDefault();
    if (solutionWords.filter((el) => el === currentWord).length !== 0) {
      return solution;
    }
    setSolution((prev) => prev.filter((el) => el !== currentWord));
    setSolutionWords((prev) => [...prev, currentWord]);
  };

  const checkSolution = () => {
    if (solution.length === 0) {
      alert("Для начала неплохо было бы хотя бы попытаться ответить!");
    } else if (solution.join(" ") === currentExample.eng) {
      let utterance = new SpeechSynthesisUtterance(currentExample.eng);
      speechSynthesis.speak(utterance);
      setExamples((prev) => prev.filter((ex) => ex.id !== currentExample.id));
      setSolution([]);
    } else {
      alert("Ответ неверный! Попробуй ещё разок!");
    }
  };

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  return (
    <AppWindow>
      <h3 style={{ fontFamily: "TaskFont" }}>Переведите данное предложение:</h3>
      <TaskWindow>
        {thatsAllFolks ? (
          <p>Задания закончились! Спасибо за участие!</p>
        ) : (
          currentExample.rus
        )}
      </TaskWindow>
      <SolutionWindow
        onDragOver={(event) => dragOverHandler(event)}
        onDrop={(event) => dropHandler(event)}
      >
        {solution.map((sol) => {
          return (
            <Words
              draggable={true}
              key={sol}
              onDragStart={(event) => dragStartHandler(event, sol)}
              onDragOver={(event) => dragOverWordHandler(event, sol)}
              onDrop={(event) => wordSortHandler(event)}
            >
              {sol}
            </Words>
          );
        })}
      </SolutionWindow>
      <WordsWindow
        onDragOver={(event) => dragOverHandler(event)}
        onDrop={(event) => backDropHandler(event)}
      >
        {solutionWords.sort().map((ex) => {
          return (
            <Words
              key={ex}
              draggable={true}
              onDragStart={(event) => dragStartHandler(event, ex)}
              // onDrop={(event) => dropHandler(event)}
            >
              {ex}
            </Words>
          );
        })}
      </WordsWindow>
      <ConfirmButton
        disabled={thatsAllFolks ? true : false}
        onClick={checkSolution}
      >
        Проверить
      </ConfirmButton>
    </AppWindow>
  );
}

export default App;
