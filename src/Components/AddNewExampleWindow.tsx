import React, { ChangeEvent } from "react";
import styled from "styled-components";

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

type AddNewExampleWindowProps = {
  visible: boolean;
  newTermRus: string;
  newTermEng: string;
  termRusHandler(event: ChangeEvent): void;
  termEngHandler(event: ChangeEvent): void;
  addNewExample(): void;
  cancelAddingNewExample(): void;
};

const NewAddNewExampleWindow: React.FC<AddNewExampleWindowProps> = ({
  visible,
  newTermRus,
  newTermEng,
  termEngHandler,
  termRusHandler,
  addNewExample,
  cancelAddingNewExample,
}) => {
  return (
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
      <ConfirmNewExampleButton onClick={() => addNewExample()}>
        Подтвердить
      </ConfirmNewExampleButton>
      <DeclineNewExampleButton onClick={() => cancelAddingNewExample()}>
        Отмена
      </DeclineNewExampleButton>
    </AddNewExampleWindow>
  );
};

export default NewAddNewExampleWindow;
