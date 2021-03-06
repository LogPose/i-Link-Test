import React, { ChangeEvent } from "react";
import styled from "styled-components";

const AddNewExampleWindow = styled.div`
  width: 400px;
  height: 500px;
  background-color: rgb(147, 255, 156);
  z-index: 2;
  margin-left: 50%;
  left: -200px;
  box-shadow: 0px 0px 20px rgb(27, 138, 92);
  border-radius: 30px;
  position: absolute;
  box-sizing: border-box;
`;

const NewTextArea = styled.textarea`
  width: 350px;
  height: 170px;
  resize: none;
  outline: none;
  border: 2px rgba(7, 116, 31, 0.9) solid;
  margin-top: 20px;
`;

const ConfirmNewExampleButton = styled.button`
  width: 180px;
  height: 50px;
  background-color: #ccc;
  margin: 10px;
  border-radius: 50px;
  outline: none;
  border: none;
  :hover {
    background-color: rgba(103, 236, 91, 0.801);
  }
  :active {
    background-color: rgba(43, 211, 28, 0.801);
  }
`;

const DeclineNewExampleButton = styled.button`
  width: 180px;
  height: 50px;
  background-color: #ccc;
  margin: 10px;
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

type AddNewExampleWindowProps = {
  mistake: boolean;
  newTermRus: string;
  newTermEng: string;
  termRusHandler(event: ChangeEvent): void;
  termEngHandler(event: ChangeEvent): void;
  addNewExample(): void;
  cancelAddingNewExample(): void;
};

const NewAddNewExampleWindow: React.FC<AddNewExampleWindowProps> = ({
  newTermRus,
  newTermEng,
  mistake,
  termEngHandler,
  termRusHandler,
  addNewExample,
  cancelAddingNewExample,
}) => {
  return (
    <AddNewExampleWindow>
      <NewTextArea
        value={newTermRus}
        onChange={termRusHandler}
        maxLength={150}
        placeholder="Введите предложение на русском (не более 150 символов)"
      ></NewTextArea>
      <NewTextArea
        value={newTermEng}
        onChange={termEngHandler}
        maxLength={150}
        placeholder="Введите перевод (желательно точный) предложения на английском (не более 150 символов)"
      ></NewTextArea>
      <ConfirmNewExampleButton onClick={addNewExample}>
        {mistake ? "Заполните поля!" : "Добавить"}
      </ConfirmNewExampleButton>
      <DeclineNewExampleButton onClick={cancelAddingNewExample}>
        Отмена
      </DeclineNewExampleButton>
    </AddNewExampleWindow>
  );
};

export default NewAddNewExampleWindow;
