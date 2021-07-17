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
  top: 35px;
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

const GoodResult = styled.p`
  color: #59a207;
`;

const OkResult = styled.p`
  color: #f6971e;
`;
const BadResult = styled.p`
  color: #fb4b45;
`;
const SkipCounterView = styled.span`
  font-size: 12px;
  color: black;
`;

type TaskWindowProps = {
  thatsAllFolks: boolean;
  currentExample: { id: number; rus: string; eng: string };
  onSkip(): void;
  wrongAnswers: number;
  skipCounter: number;
};

const NewTaskWindow: React.FC<TaskWindowProps> = ({
  thatsAllFolks,
  currentExample,
  onSkip,
  wrongAnswers,
  skipCounter,
}) => {
  const resultTab = (wrongAnswers: number) => {
    if (wrongAnswers === 0) {
      return (
        <GoodResult>
          Вы не допустили ни единой ошибки! Наши поздравления! <br></br>
          <SkipCounterView>
            Также вы пропустили {skipCounter} задач(у)
          </SkipCounterView>
        </GoodResult>
      );
    } else if (wrongAnswers === 1 || wrongAnswers === 2) {
      return (
        <OkResult>
          Количество ошибок: <strong>{wrongAnswers}</strong>! Это хороший
          результат! <br></br>
          <SkipCounterView>
            Также вы пропустили {skipCounter} задач(у)
          </SkipCounterView>
        </OkResult>
      );
    } else if (wrongAnswers >= 3) {
      return (
        <BadResult>
          Количество ошибок: <strong>{wrongAnswers}</strong>! Давайте попробуем
          ещё раз! <br></br>
          <SkipCounterView>
            Также вы пропустили {skipCounter} задач(у)
          </SkipCounterView>
        </BadResult>
      );
    }
  };

  return (
    <TaskWindow>
      {thatsAllFolks ? resultTab(wrongAnswers) : currentExample.rus}
      <ScipButton disabled={thatsAllFolks ? true : false} onClick={onSkip}>
        Skip
      </ScipButton>
    </TaskWindow>
  );
};

export default NewTaskWindow;
