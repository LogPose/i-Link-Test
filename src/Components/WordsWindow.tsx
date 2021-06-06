import React from "react";
import styled from "styled-components";

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

type newWordsWindowProps = {
  dragOverHandler(event: React.DragEvent<Element>): void;
  backDropHandler(event: React.DragEvent<Element>): void;
  dragHandler(ex: string): void;
  solutionWords: string[];
};

const NewWordsWindow: React.FC<newWordsWindowProps> = ({
  dragHandler,
  dragOverHandler,
  backDropHandler,
  solutionWords,
}) => {
  return (
    <WordsWindow
      onDragOver={(event) => dragOverHandler(event)}
      onDrop={(event) => backDropHandler(event)}
    >
      {solutionWords.sort().map((ex) => {
        return (
          <Words
            key={Math.random()}
            draggable={true}
            onDrag={() => dragHandler(ex)}
          >
            {ex}
          </Words>
        );
      })}
    </WordsWindow>
  );
};

export default NewWordsWindow;
