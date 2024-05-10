import { Button, Tab } from "@chakra-ui/react";

export default function SectionTab({ children, ...props }: any) {
  return (
    <Tab
      borderColor="gray.600"
      _selected={{
        bg: "gray.600",
        borderColor: "white",
      }}
      borderBottomColor="white"
      {...props}
    >
      {children}
    </Tab>
  );
}
