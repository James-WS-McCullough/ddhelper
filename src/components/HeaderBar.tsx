import {
  Box,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { D20Icon } from "../assets/D20icon";
import { useState } from "react";

export const HeaderBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState(
    searchParams.get("category") || "all"
  );

  const options = [
    { value: "all", label: "Home" },
    { value: "initiative", label: "Initiative" },
    { value: "deaththrowdisplay", label: "Death Throw Display" },
    { value: "playerconfig", label: "Player Config" },
    { value: "monsterconfig", label: "Monster Config" },
  ];

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    setSearchParams({ category: value });
  };

  return (
    <HStack
      width={"full"}
      backgroundColor={"green.800"}
      padding={2}
      spacing={2}
      h="60px"
      justifyContent={"space-between"}
    >
      <HStack>
        <D20Icon size={45} />
        <Heading>D&D HELPER</Heading>
      </HStack>
      <HStack>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            background={"teal.500"}
            _hover={{
              background: "teal.700",
              color: "white",
            }}
            _active={{
              background: "teal.700",
              color: "white",
            }}
          >
            {options.find((option) => option.value === selectedOption)?.label ||
              "Select Category"}
          </MenuButton>
          <MenuList background={"teal.700"}>
            {options.map((option) => (
              <MenuItem
                background={"teal.700"}
                _hover={{
                  background: "teal.600",
                  color: "white",
                }}
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
              >
                {option.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};
