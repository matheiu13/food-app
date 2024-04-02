import { Group, Button, TextInput, Input, Text, Textarea } from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';

interface InpForm {
  name: string;
  desc: string;
  imgURL: string;
  rating: string;
}

export function AddItem() {
  const { register, handleSubmit } = useForm<InpForm>();
  const onSubmit: SubmitHandler<InpForm> = (data) => alert(JSON.stringify(data));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput label="Name" placeholder="" {...register('name')} />
        <Textarea label="Description" placeholder="" resize="vertical" {...register('desc')} />
        <TextInput label="Image URL" placeholder="" {...register('imgURL')} />
        <Text>Rating:</Text>
        <Input {...register('rating')} pointer component="select">
          <option value="1">0</option>
          <option value="2">1</option>
          <option value="2">2</option>
          <option value="2">3</option>
          <option value="2">4</option>
          <option value="2">5</option>
        </Input>

        <Group mt={10} justify="flex-end">
          <Button type="submit">Add Item</Button>
        </Group>
      </form>
    </>
  );
}
