import { TabPanel } from "@chakra-ui/react";

export default function ScrollableTabPanel({ children, ...props }: any) {
  return (
    <TabPanel maxHeight="100%" height="100%" overflow="auto" {...props}>
      {children}
    </TabPanel>
  );
}
