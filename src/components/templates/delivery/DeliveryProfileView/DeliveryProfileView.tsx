import { DeliveryDashboardLayout } from "@/components/organisms/DeliveryDashboardLayout/DeliveryDashboardLayout";
import { PersonalSection } from "@/components/organisms/PersonalSection/PersonalSection";
import {
  Button,
  Container,
  IconProps,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagLeftIcon,
  useMultiStyleConfig,
  useTab,
  useToken,
} from "@chakra-ui/react";
import { HomeIcon } from "lucide-react";
import { HTMLProps, forwardRef, useCallback, useState } from "react";

enum TAB_LIST {
  PERSONAL = "PERSONAL",
  SETTINGS = "SETTINGS",
}

type Tabs = {
  key: TAB_LIST;
  label: string;
  icon?: (props: IconProps) => JSX.Element;
  content: (props: { setTabByKey: (tabKey: TAB_LIST) => void }) => JSX.Element;
}[];

const tabs: Tabs = [
  {
    key: TAB_LIST.PERSONAL,
    label: "Personal",
    content: ({}) => <PersonalSection />,
  },
  {
    key: TAB_LIST.SETTINGS,
    label: "Settings",
    content: ({}) => <>s</>,
  },
];

export function DeliveryProfileView() {
  const { tabIndex, setTabByKey, setTabByIndex, visibleTabs } = useTabIndex({
    tabs,
  });

  return (
    <DeliveryDashboardLayout>
      <Container>
        <Tabs
          index={tabIndex}
          onChange={(index) => setTabByIndex(index)}
          isLazy
          variant="unstyled"
        >
          <TabList
            gap={3}
            py={6}
            mb={4}
            overflow={"auto"}
            // position={"sticky"}
            // top={{ base: 104, md: 124 }}
            zIndex={1}
          >
            {visibleTabs.map(({ label, icon }) => (
              <CustomTab key={label}>
                {icon && <TagLeftIcon as={HomeIcon} />}
                {label}
              </CustomTab>
            ))}
          </TabList>
          <TabPanels>
            {visibleTabs.map(({ label, content }) => (
              <TabPanel padding={0} key={label}>
                {content({
                  setTabByKey,
                })}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Container>
    </DeliveryDashboardLayout>
  );
}

// eslint-disable-next-line react/display-name
const CustomTab = forwardRef<HTMLElement, HTMLProps<HTMLElement>>(
  (props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = tabProps["aria-selected"];
    const styles = useMultiStyleConfig("Tabs", tabProps);
    const gray400 = useToken("colors", "gray.400");

    return (
      <Button
        __css={styles.tab}
        {...tabProps}
        padding={0}
        borderBottom={"none"}
      >
        <Tag
          size="lg"
          variant={isSelected ? "solid" : "outline"}
          px={3}
          py={1.5}
          background={isSelected ? "gray.600" : "white"}
          fontWeight={isSelected ? 700 : 500}
          color={isSelected ? "white" : "gray.400"}
          boxShadow={isSelected ? "none" : `inset 0 0 0 1px ${gray400}`}
          lineHeight={6}
          alignItems={"center"}
          width={"max-content"}
        >
          {tabProps.children}
        </Tag>
      </Button>
    );
  }
);

function useTabIndex({ tabs }: { tabs: Tabs }) {
  const [tabIndex, setIndex] = useState<number>(0);

  const visibleTabs = tabs;

  const setTabByKey = useCallback(
    (tabKey: TAB_LIST) => {
      const index = tabs.findIndex(({ key }) => key === tabKey);
      setIndex(index);
    },
    [tabs]
  );

  const setTabByIndex = (index: number) => {
    const tabKey = visibleTabs[index].key;
    setIndex(index);
  };

  return { tabIndex, setTabByKey, setTabByIndex, visibleTabs } as const;
}
