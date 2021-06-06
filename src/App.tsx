import React, { ChangeEvent, DragEvent, useEffect, useState } from "react";
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
  position: relative;
`;

const TaskWindow = styled.div`
  width: 360px;
  height: 100px;
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
  height: 125px;
  background-color: rgba(137, 220, 224, 0.568);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
  position: relative;
`;

const WordsWindow = styled.div`
  width: 360px;
  height: 125px;
  background-color: rgba(153, 197, 255, 0.774);
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
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

const Words = styled.div`
  position: relative;
  width: 80px;
  height: 20px;
  background-color: #fff;
  display: inline-block;
  margin: 5px;
  cursor: grab;
  border-radius: 5px;
  text-align: center;
  :hover {
    background-color: rgba(119, 239, 255, 0.651);
  }
  :active {
    background-color: rgba(1, 225, 255, 0.651);
  }
  font-family: "WordsFont";
`;

const AddNewExampleWindow = styled.div`
  width: 380px;
  height: 480px;
  background-color: rgb(147, 255, 156);
  z-index: 2;
  margin-top: 10px;
  margin-left: 10px;
  box-shadow: 0px 0px 20px rgba(27, 138, 92, 1);
  border-radius: 30px;
  position: absolute;
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

const NewTextArea = styled.textarea`
  width: 350px;
  height: 170px;
  resize: none;
  outline: none;
  border: 2px rgba(7, 116, 31, 0.904) solid;
  margin-top: 20px;
  margin-left: 10px;
  font-family: "TaskFont";
`;

const ConfirmNewExampleButton = styled.button`
  width: 180px;
  height: 50px;
  background-color: #ccc;
  margin: 5px;
  border-radius: 50px;
  outline: none;
  border: none;
  :hover {
    background-color: rgba(103, 236, 91, 0.801);
  }
  :active {
    background-color: rgba(43, 211, 28, 0.801);
  }
  font-family: "TaskFont";
`;

const DeclineNewExampleButton = styled.button`
  width: 180px;
  height: 50px;
  background-color: #ccc;
  margin: 5px;
  border-radius: 50px;
  outline: none;
  border: none;
  :hover {
    background-color: rgba(240, 87, 87, 0.801);
  }
  :active {
    background-color: rgba(221, 25, 25, 0.801);
  }
  font-family: "TaskFont";
`;

const ScipButton = styled.button`
  position: absolute;
  width: 50px;
  height: 20px;
  background-color: rgba(143, 79, 79, 0.329);
  top: 55px;
  right: 5px;
  border-radius: 50px;
  outline: none;
  border: none;
  :hover {
    background-color: rgba(240, 87, 87, 0.801);
  }
  :active {
    background-color: rgba(221, 25, 25, 0.801);
  }
  font-family: "TaskFont";
`;

const ResetButton = styled.button`
  position: absolute;
  width: 50px;
  height: 20px;
  background-color: rgba(143, 79, 79, 0.329);
  top: -5px;
  right: -15px;
  border-radius: 50px;
  outline: none;
  border: none;
  :hover {
    background-color: rgba(240, 87, 87, 0.801);
  }
  :active {
    background-color: rgba(221, 25, 25, 0.801);
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
      rus: "Гена Букин наш герой, Гена Букин чемпион",
      eng: "Gena Bukin is our hero, Gena Bukin is a champion",
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

  // const dragStartHandler = (ex: string) => {
  //   setCurrentWord(ex)
  // };

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

  const AddNewExample = () => {
    setCounter((prev) => prev + 1);
    if (newTermRus.length === 0 || newTermEng.length === 0) {
      alert("Сначала введите предложения в соответствующие поля!");
    }
    if (newTermRus.length !== 0 && newTermEng.length !== 0) {
      let newExample = { id: counter, rus: newTermRus, eng: newTermEng };
      setExamples((prev) => [...prev, newExample]);
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
      <AddNewExampleWindow
        style={visible ? { display: "block" } : { display: "none" }}
      >
        <NewTextArea
          value={newTermRus}
          onChange={(event) => termRusHandler(event)}
          maxLength={150}
          placeholder="Введите предложение на русском (не более 150 символов)"
        ></NewTextArea>
        <NewTextArea
          value={newTermEng}
          onChange={(event) => termEngHandler(event)}
          maxLength={150}
          placeholder="Введите перевод (желательно точный) предложения на английском (не более 150 символов)"
        ></NewTextArea>
        <ConfirmNewExampleButton onClick={() => AddNewExample()}>
          Подтвердить
        </ConfirmNewExampleButton>
        <DeclineNewExampleButton onClick={() => cancelAddingNewExample()}>
          Отмена
        </DeclineNewExampleButton>
      </AddNewExampleWindow>
      <AppWindow>
        <h3 style={{ fontFamily: "TaskFont" }}>
          Переведите данное предложение:
        </h3>
        <TaskWindow>
          {thatsAllFolks ? (
            <p>Задания закончились! Спасибо за участие!</p>
          ) : (
            currentExample.rus
          )}
          <ScipButton
            disabled={thatsAllFolks ? true : false}
            onClick={() => skipHandler()}
          >
            Skip
          </ScipButton>
        </TaskWindow>
        <SolutionWindow
          onDragOver={(event) => dragOverHandler(event)}
          onDrop={(event) => dropHandler(event)}
        >
          <ResetButton
            disabled={thatsAllFolks || solution.length === 0 ? true : false}
            onClick={() => resetHandler()}
          >
            Reset
          </ResetButton>
          {solution.map((sol) => {
            return (
              <Words
                draggable={true}
                key={Math.random()}
                // onDragStart={() => dragStartHandler(sol)}
                onDragOver={(event) => dragOverWordHandler(event, sol)}
                onDrop={(event) => wordSortHandler(event)}
                onDrag={() => dragHandler(sol)}
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
                key={Math.random()}
                draggable={true}
                // onDragStart={() => dragStartHandler(ex)}\
                onDrag={() => dragHandler(ex)}
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
        <AddNewExampleButton onClick={() => setVisible(true)}>
          Добавить пример
        </AddNewExampleButton>
      </AppWindow>
    </div>
  );
}

export default App;
