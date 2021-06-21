import React from "react";
import styled from "styled-components";

const TaskWindow = styled.div`
  width: 360px;
  height: 100px;
  background-color: rgba(153, 255, 255, 0.774);
  margin: 10px auto;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10px;
  box-sizing: border-box;
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
`;

type TaskWindowProps = {
  thatsAllFolks: boolean;
  currentExample: { id: number; rus: string; eng: string };
  onSkip(): void;
};

const NewTaskWindow: React.FC<TaskWindowProps> = ({
  thatsAllFolks,
  currentExample,
  onSkip,
}) => {
  return (
    <TaskWindow>
      {thatsAllFolks ? (
        <p>Задания закончились! Спасибо за участие!</p>
      ) : (
        currentExample.rus
      )}
      <ScipButton disabled={thatsAllFolks ? true : false} onClick={onSkip}>
        Skip
      </ScipButton>
    </TaskWindow>
  );
};

export default NewTaskWindow;
