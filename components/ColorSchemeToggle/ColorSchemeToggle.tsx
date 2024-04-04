import { ActionIcon, Affix, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <ActionIcon
        variant="outline"
        color={dark ? 'yellow' : 'blue'}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
        h="2.5rem"
        w="2.5rem"
      >
        {dark ? <IconSun size="1.5rem" /> : <IconMoonStars size="1.5rem" />}
      </ActionIcon>
    </Affix>
  );
}
