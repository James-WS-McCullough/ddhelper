import React, { useState, useEffect } from "react";
import { HStack, Input, Select, IconButton, Text } from "@chakra-ui/react";
import { diceArray, diceOptions, diceTypesEnums } from "../types/dndTypes";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

type DiceComponentProps = {
  onChange: (dice: diceArray) => void;
};

const DiceComponent = ({ onChange }: DiceComponentProps) => {
  const [diceList, setDiceList] = useState([{ diceNumber: 1, diceType: "d6" }]);
  const [modifier, setModifier] = useState(0);

  useEffect(() => {
    onChange(diceList);
  }, [diceList, modifier]);

  const handleDiceChange = (index: number, field: string, value: any) => {
    setDiceList((diceList) =>
      diceList.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addDiceEntry = () => {
    setDiceList((diceList) => [...diceList, { diceNumber: 1, diceType: "d6" }]);
  };

  const removeDiceEntry = (index: number) => {
    setDiceList((diceList) => diceList.filter((_, idx) => idx !== index));
  };

  const calculateMin = () => {
    let min = 0;
    diceList.forEach((dice) => {
      min += dice.diceNumber;
    });
    min += modifier;
    return min;
  };

  const calculateAverage = () => {
    let average = 0;
    diceList.forEach((dice) => {
      average += (dice.diceNumber * (parseInt(dice.diceType.slice(1)) + 1)) / 2;
    });
    average += modifier;
    return average;
  };

  const calculateMax = () => {
    let max = 0;
    diceList.forEach((dice) => {
      max += dice.diceNumber * parseInt(dice.diceType.slice(1));
    });
    max += modifier;
    return max;
  };

  return (
    <HStack>
      {diceList.map((dice, index) => (
        <HStack key={index}>
          <Input
            width="50px"
            value={dice.diceNumber}
            onChange={(e) =>
              handleDiceChange(index, "diceNumber", parseInt(e.target.value))
            }
            type="number"
            min={0}
          />
          <Select
            width="80px"
            value={dice.diceType}
            onChange={(e) =>
              handleDiceChange(index, "diceType", e.target.value)
            }
          >
            {diceTypesEnums.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Text>+</Text>
        </HStack>
      ))}
      <Input
        width="70px"
        value={modifier}
        onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
        type="number"
      />
      <IconButton
        onClick={addDiceEntry}
        colorScheme="green"
        aria-label="Add Dice"
        icon={<AddIcon />}
      />
      {diceList.length > 0 && (
        <IconButton
          onClick={() => removeDiceEntry(diceList.length - 1)}
          colorScheme="red"
          aria-label="Remove Dice"
          icon={<MinusIcon />}
        />
      )}
      <Text fontStyle="italic" whiteSpace="nowrap" color={"gray.500"}>
        {" "}
        ({calculateMin()}, {calculateAverage()}, {calculateMax()})
      </Text>
    </HStack>
  );
};

export default DiceComponent;
