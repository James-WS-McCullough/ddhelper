import { Button, ModalContent } from "@chakra-ui/react";

export default function DarkModalContent({ children, ...props }: any) {
  return (
    <ModalContent bg="gray.800" textColor="white" {...props}>
      {children}
    </ModalContent>
  );
}
