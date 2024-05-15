import { Button, HStack, IconButton } from "@chakra-ui/react";
import { D20OutlineIcon } from "../assets/D20OutlineIcon";
import { toastARoll } from "../generics/dndHelpers";
import { TwoD20OutlineIcon } from "../assets/TwoD20OutlineIcon";

type RollButtonsProps = {
  toast: any;
  modifier: number;
  size?: "sm" | "md" | "lg" | "xl";
};

export default function RollButtons({
  toast,
  modifier,
  size,
}: RollButtonsProps) {
  return (
    <HStack spacing={1} justifyContent="center" mt="3">
      <IconButton
        icon={<D20OutlineIcon color="white" />}
        aria-label="Attack"
        size={size}
        colorScheme="blue"
        onClick={() => {
          toastARoll({
            toast,
            modifier,
            rollType: "stright",
          });
        }}
      />
      <IconButton
        icon={<TwoD20OutlineIcon color="white" />}
        aria-label="Attack with Advantage"
        size={size}
        colorScheme="green"
        onClick={() => {
          toastARoll({
            toast,
            modifier,
            rollType: "advantage",
          });
        }}
      />
      <IconButton
        icon={<TwoD20OutlineIcon color="white" />}
        aria-label="Attack with Disadvantage"
        size={size}
        colorScheme="red"
        onClick={() => {
          toastARoll({
            toast,
            modifier,
            rollType: "disadvantage",
          });
        }}
      />
    </HStack>
  );
}
