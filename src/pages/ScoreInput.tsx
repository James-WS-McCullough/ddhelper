import React, { useState } from 'react';
import { Box, Text, Button, VStack, HStack, Input } from '@chakra-ui/react';

const ScoreItem = ({ name, successes, failures, onUpdateSuccess, onUpdateFailure, onRemove }) => (
  <HStack spacing={5} alignItems="center">
    <Text>{name}</Text>
    <Button 
      onClick={() => onUpdateSuccess(successes + 1)} 
      isDisabled={successes >= 3}
      colorScheme="green"
    >
      {successes}
    </Button>
    <Button 
      onClick={() => onUpdateFailure(failures + 1)} 
      isDisabled={failures >= 3}
      colorScheme="red"
    >
      {failures}
    </Button>
    <Button onClick={onRemove} colorScheme="gray" size="sm">Remove</Button>
  </HStack>
);

const ScoreInput = ({scores, setScores}) => {
  const [name, setName] = useState("");

  const handleAdd = () => {
    setScores([...scores, { name, successes: 0, failures: 0 }]);
    setName("");
  };

  const handleRemove = (index) => {
    const updatedScores = [...scores];
    updatedScores.splice(index, 1);
    setScores(updatedScores);
  };

  const updateSuccess = (index, value) => {
    const updatedScores = [...scores];
    updatedScores[index].successes = Math.min(3, value);
    setScores(updatedScores);
  };

  const updateFailure = (index, value) => {
    const updatedScores = [...scores];
    updatedScores[index].failures = Math.min(3, value);
    setScores(updatedScores);
  };

  return (
    <VStack spacing={5}>
      <HStack spacing={5}>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <Button onClick={handleAdd} isDisabled={!name}>Add</Button>
      </HStack>
      {scores.map((score, index) => (
        <ScoreItem 
          key={index} 
          {...score} 
          onUpdateSuccess={(value) => updateSuccess(index, value)}
          onUpdateFailure={(value) => updateFailure(index, value)}
          onRemove={() => handleRemove(index)}
        />
      ))}
    </VStack>
  );
};

export default ScoreInput;
