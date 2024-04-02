import {
  ActionIcon,
  Card,
  Container,
  Flex,
  Grid,
  Image,
  Modal,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { IconArrowsDownUp, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { food } from '../../constants/foodlist.js';
import { AddItem } from '../AddItem/AddItem';

export function FoodList() {
  const [opened, { open, close }] = useDisclosure(false);
  const [, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(food);
  const handleChangeQuery = (e: React.ChangeEvent<any>): void => {
    const { value } = e.target;
    setQuery(value);
    filterData(value);
  };

  const filterData = (query: string) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const filteredData = food.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <>
      <Container p={0} pt="5vh">
        <Flex w="full" gap={5} align="center">
          <TextInput w="100%" onChange={handleChangeQuery} placeholder="Search for an item" />
          <ActionIcon size={32} radius="sm" variant="filled">
            <IconArrowsDownUp style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size={32} radius="sm" variant="filled" onClick={open}>
            <IconPlus style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Flex>
        <br />
        <Grid p={1}>
          {filteredData.map((f) => (
            <Grid.Col span={4}>
              <Card shadow="sm" padding="sm" radius="md" miw="20vh" withBorder>
                <Card.Section mb={10}>
                  <Image h={200} w="full" fit="cover" src={f.imgURL} />
                </Card.Section>
                <Text size="xl" fw={700}>
                  {f.name}
                </Text>
                <Text size="sm" mb={10}>
                  {f.desc}
                </Text>
                <Text>Rating: {f.rating}/5</Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
      <Modal opened={opened} onClose={close} title="Add a new Food Item" centered>
        <AddItem />
      </Modal>
    </>
  );
}
