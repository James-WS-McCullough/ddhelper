import { Button, HStack } from "@chakra-ui/react";

type FormBottomBarProps = {
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  deleteEnabled?: boolean;
  saveEnabled?: boolean;
};

export default function FormBottomBar({
  onSave,
  onCancel,
  onDelete,
  deleteEnabled = false,
  saveEnabled = true,
}: FormBottomBarProps) {
  return (
    <HStack
      mt={4}
      mb={2}
      width="100%"
      justifyContent={deleteEnabled ? "space-between" : "end"}
    >
      {deleteEnabled && (
        <Button colorScheme="red" onClick={onDelete}>
          Delete
        </Button>
      )}
      <HStack>
        <Button colorScheme="blue" onClick={onSave} disabled={!saveEnabled}>
          Save
        </Button>

        <Button colorScheme="pink" onClick={onCancel}>
          Cancel
        </Button>
      </HStack>
    </HStack>
  );
}
