import React, { ChangeEvent, DragEvent, useEffect, useState } from "react";
import styled from "styled-components";
import NewAddNewExampleWindow from "./Components/AddNewExampleWindow";
import NewSolutionWindow from "./Components/SolutionWindow";
import NewTaskWindow from "./Components/TaskWindow";
import NewWordsWindow from "./Components/WordsWindow";

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
  position: relative;
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

const AddNewExampleButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: #ccc;
  margin: 0 10px;
  border-radius: 50px;
  outline: none;
  border: none;
  :hover {
    background-color: rgba(255, 253, 117, 0.726);
  }
  :active {
    background-color: rgba(255, 251, 23, 0.726);
  }
  font-family: "TaskFont";
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
    {
      id: 6,
      rus: "А потом назвали меня как тот самолёт, который был турецкий",
      eng: "And then they named me like that plane, which was Turkish",
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

  const [newTermRus, setNewTermRus] = useState<string>("");
  const [newTermEng, setNewTermEng] = useState<string>("");

  const [counter, setCounter] = useState<number>(100);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setSolutionWords(currentExample.eng.split(" "));
  }, [currentExample]);
  useEffect(() => {
    if (examples.length !== 0) {
      setCurrentExample(examples[getRandomInt(examples.length)]);
    } else {
      setThatsAllFolks(true);
      setSolutionWords([]);
    }
  }, [examples]);

  const dragHandler = (word: string) => {
    setCurrentWord(word);
  };

  const dragOverHandler = (event: DragEvent) => {
    event.preventDefault();
  };

  const dragOverWordHandler = (event: DragEvent, sol: string) => {
    event.preventDefault();
    event.stopPropagation();
    setHoveredWord(sol);
  };

  const wordSortHandler = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
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
    event.stopPropagation();
    event.preventDefault();
    if (solution.includes(currentWord) && solutionWords.includes(currentWord)) {
      setSolution((prev) => [...prev, currentWord]);
      let currentWordIndex = solutionWords.indexOf(currentWord);
      setSolutionWords((prev) => [
        ...prev.slice(0, currentWordIndex),
        ...prev.slice(currentWordIndex + 1, prev.length),
      ]);
    } else if (
      solution.includes(currentWord) &&
      !solutionWords.includes(currentWord)
    ) {
      return solution;
    } else {
      setSolution((prev) => [...prev, currentWord]);
      let currentWordIndex = solutionWords.indexOf(currentWord);
      setSolutionWords((prev) => [
        ...prev.slice(0, currentWordIndex),
        ...prev.slice(currentWordIndex + 1, prev.length),
      ]);
    }
  };

  const backDropHandler = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (solutionWords.includes(currentWord) && solution.includes(currentWord)) {
      let currentWordIndex = solution.indexOf(currentWord);
      setSolution((prev) => [
        ...prev.slice(0, currentWordIndex),
        ...prev.slice(currentWordIndex + 1, prev.length),
      ]);
      setSolutionWords((prev) => [...prev, currentWord]);
    } else if (
      solutionWords.includes(currentWord) &&
      !solution.includes(currentWord)
    ) {
      return solutionWords;
    } else {
      let currentWordIndex = solution.indexOf(currentWord);
      setSolution((prev) => [
        ...prev.slice(0, currentWordIndex),
        ...prev.slice(currentWordIndex + 1, prev.length),
      ]);
      setSolutionWords((prev) => [...prev, currentWord]);
    }
  };

  const checkSolution = () => {
    if (solution.length === 0) {
      alert("Для начала неплохо было бы хотя бы попытаться ответить!");
    } else if (solution.join(" ") === currentExample.eng) {
      let utterance = new SpeechSynthesisUtterance(currentExample.eng);
      let voices = window.speechSynthesis.getVoices();
      utterance.voice = voices[2];
      speechSynthesis.speak(utterance);
      setExamples((prev) => prev.filter((ex) => ex.id !== currentExample.id));
      setSolution([]);
      alert("Ответ правильный! Отличная работа!");
    } else {
      alert("Ответ неверный! Попробуй ещё разок!");
    }
  };

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const termRusHandler = (event: ChangeEvent) => {
    let target = event.target as HTMLInputElement;
    setNewTermRus(target.value);
  };

  const termEngHandler = (event: ChangeEvent) => {
    let target = event.target as HTMLInputElement;
    setNewTermEng(target.value);
  };

  const addNewExample = () => {
    setCounter((prev) => prev + 1);
    if (newTermRus.length === 0 || newTermEng.length === 0) {
      alert("Сначала введите предложения в соответствующие поля!");
    }
    if (newTermRus.length !== 0 && newTermEng.length !== 0) {
      let newExample = { id: counter, rus: newTermRus, eng: newTermEng };
      setExamples((prev) => [...prev, newExample]);
      setSolution([]);
      setVisible(false);
      setNewTermEng("");
      setNewTermRus("");
      setThatsAllFolks(false);
    }
  };

  const cancelAddingNewExample = () => {
    setVisible(false);
    setNewTermEng("");
    setNewTermRus("");
  };

  const skipHandler = () => {
    setExamples((prev) => prev.filter((ex) => ex.id !== currentExample.id));
    setSolution([]);
  };

  const resetHandler = () => {
    setSolution([]);
    setSolutionWords(currentExample.eng.split(" "));
  };

  return (
    <div>
      <NewAddNewExampleWindow
        visible={visible}
        newTermEng={newTermEng}
        newTermRus={newTermRus}
        termRusHandler={termRusHandler}
        termEngHandler={termEngHandler}
        addNewExample={addNewExample}
        cancelAddingNewExample={cancelAddingNewExample}
      />
      <AppWindow>
        <h3 style={{ fontFamily: "TaskFont" }}>
          Переведите данное предложение:
        </h3>
        <NewTaskWindow
          onSkip={skipHandler}
          currentExample={currentExample}
          thatsAllFolks={thatsAllFolks}
        />
        <NewSolutionWindow
          thatsAllFolks={thatsAllFolks}
          solution={solution}
          resetHandler={resetHandler}
          dragHandler={dragHandler}
          dragOverHandler={dragOverHandler}
          dragOverWordHandler={dragOverWordHandler}
          dropHandler={dropHandler}
          wordSortHandler={wordSortHandler}
        />
        <NewWordsWindow
          solutionWords={solutionWords}
          dragHandler={dragHandler}
          dragOverHandler={dragOverHandler}
          backDropHandler={backDropHandler}
        />
        <ConfirmButton
          disabled={thatsAllFolks ? true : false}
          onClick={checkSolution}
        >
          Проверить
        </ConfirmButton>
        <AddNewExampleButton onClick={() => setVisible(true)}>
          Добавить пример
        </AddNewExampleButton>
      </AppWindow>
    </div>
  );
}

export default App;
