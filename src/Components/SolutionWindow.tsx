import React from "react";
import styled from "styled-components";

const SolutionWindow = styled.div`
  width: 360px;
  height: 125px;
  background-color: rgba(145, 255, 255, 0.6);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
  position: relative;
  box-sizing: border-box;
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
`;

type NewSolutionWindowProps = {
  dragOverHandler(event: React.DragEvent<Element>): void;
  dropHandler(event: React.DragEvent<Element>): void;
  wordSortHandler(event: React.DragEvent<Element>): void;
  dragOverWordHandler(event: React.DragEvent<Element>, sol: {}): void;
  resetHandler(): void;
  dragHandler(sol: {}): void;
  thatsAllFolks: boolean;
  solution: { value: string; id: number }[];
};

const NewSolutionWindow: React.FC<NewSolutionWindowProps> = ({
  dragOverHandler,
  dragOverWordHandler,
  dropHandler,
  wordSortHandler,
  resetHandler,
  dragHandler,
  thatsAllFolks,
  solution,
}) => {
  return (
    <SolutionWindow onDragOver={dragOverHandler} onDrop={dropHandler}>
      <ResetButton
        disabled={thatsAllFolks || solution.length === 0}
        onClick={resetHandler}
      >
        Reset
      </ResetButton>
      {solution.map((sol) => (
        <Words
          draggable={true}
          key={sol.id}
          onDrop={wordSortHandler}
          onDrag={() => dragHandler(sol)}
          onDragOver={(event) => dragOverWordHandler(event, sol)}
        >
          {sol.value}
        </Words>
      ))}
    </SolutionWindow>
  );
};

export default NewSolutionWindow;
