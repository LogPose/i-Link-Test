import React, { ChangeEvent, DragEvent, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useQuery } from "urql";
import NewAddNewExampleWindow from "./Components/AddNewExampleWindow";
import NewSolutionWindow from "./Components/SolutionWindow";
import NewTaskWindow from "./Components/TaskWindow";
import NewWordsWindow from "./Components/WordsWindow";

const AppWindow = styled.div`
  width: 400px;
  height: 500px;
  background-color: #fff;
  margin-top: 20px;
  margin-left: 50%;
  left: -200px;
  border-radius: 50px;
  position: relative;
  box-sizing: border-box;
  text-align: center;
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

const animationForAnswerWindow = keyframes`
from {
  opacity: 0;
  margin-top: -150px;
}
to {
  opacity: 0;
  margin-top: 150px;
}
50% {
  opacity: 1;
  margin-top: 10px;
}
`;

const NoAnswerWindow = styled.div`
  width: 300px;
  height: 100px;
  background-color: rgba(66, 226, 213, 0.8);
  font-size: 15px;
  color: #fff;
  display: flex;
  margin-top: 10px;
  left: 50px;
  z-index: 2;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  border-radius: 40px;
  position: absolute;
  animation: ${animationForAnswerWindow} 3s forwards;
  opacity: 0;
`;

const WrongAnswerWindow = styled(NoAnswerWindow)`
  background-color: rgba(206, 76, 76, 0.8);
  color: rgb(110, 11, 11);
  font-size: 15px;
`;

const CorrectAnswerWindow = styled(NoAnswerWindow)`
  background-color: rgba(75, 221, 55, 0.8);
  color: rgb(18, 94, 8);
`;

function App() {
  const ExampleQuery = `
                          query {
                                sentenceAll {
                                  ru
                                  en
                                }
                            }
                          `;

  const [result, reexecuteQuery] = useQuery({
    query: ExampleQuery,
  });

  const { data, fetching } = result;

  const [examples, setExamples] = useState([
    {
      id: 1,
      rus: "",
      eng: "",
    },
  ]);

  const [currentExample, setCurrentExample] = useState<{
    id: number;
    rus: string;
    eng: string;
  }>({ id: 0, rus: "", eng: "" });

  const [answerStatus, setAnswerStatus] = useState<string>("");

  const [solution, setSolution] = useState<{ value: string; id: number }[]>([]);

  const [hoveredWord, setHoveredWord] = useState<{ value: string; id: number }>(
    { value: "", id: 0 }
  );

  const [solutionWords, setSolutionWords] = useState<
    { value: string; id: number }[]
  >([]);

  const [currentWord, setCurrentWord] = useState<{ value: string; id: number }>(
    { value: "", id: 0 }
  );

  const [thatsAllFolks, setThatsAllFolks] = useState<boolean>(false);

  const [newTermRus, setNewTermRus] = useState<string>("");

  const [newTermEng, setNewTermEng] = useState<string>("");

  const [counter, setCounter] = useState<number>(100);

  const [visible, setVisible] = useState<boolean>(false);

  const [mistake, setMistake] = useState<boolean>(false);

  const [wrongAnswers, setWrongAnswers] = useState<number>(0);

  const [skipCounter, setSkipCounter] = useState<number>(0);

  useEffect(() => {
    if (!fetching) {
      let idCount = 2;
      const testExamples = data.sentenceAll.map(
        (el: { ru: string; en: string }) => {
          return { id: idCount++, rus: el.ru, eng: el.en };
        }
      );
      setExamples(testExamples);
    }
  }, [fetching]);

  useEffect(() => {
    if (examples.length !== 0) {
      setCurrentExample(examples[Math.floor(Math.random() * examples.length)]);
    } else {
      setThatsAllFolks(true);
      setSolutionWords([]);
    }
  }, [examples]);
  useEffect(() => {
    let count = 1000;
    const uniqueIdCounter = () => {
      count = count + 1;
      return count;
    };
    setSolutionWords(
      currentExample.eng
        .split(" ")
        .map((el) => {
          return { value: el, id: uniqueIdCounter() };
        })
        .sort(function compareFunction(a, b) {
          if (a.value < b.value) {
            return -1;
          }
          if (a.value > b.value) {
            return 1;
          }
          return 0;
        })
    );
  }, [currentExample]);
  useEffect(() => {
    setTimeout(() => {
      setCounter((prev) => (prev = prev + 1));
    }, 1000);
  }, [solutionWords]);

  const dragHandler = (word: { value: string; id: number }) => {
    setCurrentWord(word);
  };

  const dragOverHandler = (event: DragEvent) => {
    event.preventDefault();
  };

  const dragOverWordHandler = (
    event: React.DragEvent<Element>,
    sol: { id: number; value: string }
  ) => {
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
      let hoveredWordIndex = solutionWords.indexOf(hoveredWord);
      if (!solutionWords.includes(hoveredWord)) {
        setSolutionWords((prev) => [...prev, currentWord]);
      } else {
        setSolutionWords((prev) => [
          ...prev.slice(0, hoveredWordIndex + 1),
          currentWord,
          ...prev.slice(hoveredWordIndex + 1, prev.length),
        ]);
      }
      setTimeout(() => {
        setSolutionWords((prev) =>
          prev.sort(function compareFunction(a, b) {
            if (a.value < b.value) {
              return -1;
            }
            if (a.value > b.value) {
              return 1;
            }
            return 0;
          })
        );
      }, 500);
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
      let hoveredWordIndex = solutionWords.indexOf(hoveredWord);
      if (!solutionWords.includes(hoveredWord)) {
        setSolutionWords((prev) => [...prev, currentWord]);
      } else {
        setSolutionWords((prev) => [
          ...prev.slice(0, hoveredWordIndex + 1),
          currentWord,
          ...prev.slice(hoveredWordIndex + 1, prev.length),
        ]);
      }

      setTimeout(() => {
        setSolutionWords((prev) =>
          prev.sort(function compareFunction(a, b) {
            if (a.value < b.value) {
              return -1;
            }
            if (a.value > b.value) {
              return 1;
            }
            return 0;
          })
        );
      }, 500);
    }
  };

  const checkSolution = () => {
    if (solution.length === 0) {
      setAnswerStatus("no");
      setTimeout(() => {
        setAnswerStatus("");
      }, 3000);
    } else if (
      solution
        .map((el) => {
          return el.value;
        })
        .join(" ")
        .toString() === currentExample.eng
    ) {
      let utterance = new SpeechSynthesisUtterance(currentExample.eng);
      let voices = window.speechSynthesis.getVoices();
      utterance.voice = voices[2];
      speechSynthesis.speak(utterance);
      setExamples((prev) => prev.filter((ex) => ex.id !== currentExample.id));
      setSolution([]);
      setAnswerStatus("correct");
      setTimeout(() => {
        setAnswerStatus("");
      }, 3000);
    } else {
      setAnswerStatus("wrong");
      setWrongAnswers((prev) => prev + 1);
      setTimeout(() => {
        setAnswerStatus("");
      }, 3000);
    }
  };

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
      setMistake(true);
      setTimeout(() => {
        setMistake(false);
      }, 1000);
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
    setSkipCounter((prev) => prev + 1);
    setExamples((prev) => prev.filter((ex) => ex.id !== currentExample.id));
    setSolution([]);
  };

  const resetHandler = () => {
    setSolution([]);
    setSolutionWords(
      currentExample.eng
        .split(" ")
        .map((el) => {
          return { value: el, id: currentExample.eng.split(" ").indexOf(el) };
        })
        .sort(function compareFunction(a, b) {
          if (a.value < b.value) {
            return -1;
          }
          if (a.value > b.value) {
            return 1;
          }
          return 0;
        })
    );
  };

  const visibleHandler = () => {
    setVisible(true);
  };

  const answerSwitch = (answerStatus: string) => {
    switch (answerStatus) {
      case "no":
        return (
          <NoAnswerWindow>
            <h1>Пожалуйста, составьте ответ!</h1>
          </NoAnswerWindow>
        );
      case "wrong":
        return (
          <WrongAnswerWindow>
            <h1>Ответ неверный! Попробуйте ещё раз!</h1>
          </WrongAnswerWindow>
        );
      case "correct":
        return (
          <CorrectAnswerWindow>
            <h1>Ответ правильный! Отлично!</h1>
          </CorrectAnswerWindow>
        );
    }
  };

  return (
    <AppWindow>
      {visible ? (
        <NewAddNewExampleWindow
          mistake={mistake}
          newTermEng={newTermEng}
          newTermRus={newTermRus}
          termRusHandler={termRusHandler}
          termEngHandler={termEngHandler}
          addNewExample={addNewExample}
          cancelAddingNewExample={cancelAddingNewExample}
        />
      ) : null}
      <h3>Переведите данное предложение:</h3>
      <NewTaskWindow
        onSkip={skipHandler}
        currentExample={currentExample}
        thatsAllFolks={thatsAllFolks}
        wrongAnswers={wrongAnswers}
        skipCounter={skipCounter}
      />
      {answerSwitch(answerStatus)}
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
        dragOverWordHandler={dragOverWordHandler}
      />
      <ConfirmButton
        disabled={thatsAllFolks || answerStatus.length !== 0}
        onClick={checkSolution}
      >
        Проверить
      </ConfirmButton>
      <AddNewExampleButton onClick={visibleHandler}>
        Добавить пример
      </AddNewExampleButton>
    </AppWindow>
  );
}

export default App;
