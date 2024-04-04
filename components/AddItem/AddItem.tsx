import { Group, Button, TextInput, Input, Text, Textarea } from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export type InputForm = {
  name: string;
  desc: string;
  imgURL: string;
  rating: number;
};

export function AddItem({ callback }: any) {
  const schema = yup
    .object({
      name: yup.string().required(),
      desc: yup.string().required('description is a required field'),
      imgURL: yup.string().required('Image URL is a required field'),
      rating: yup.number().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<InputForm> = (data) => callback(data);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput label="Name" placeholder="" {...register('name')} />
        <Text c="red">{errors.name && errors.name.message}</Text>
        <Textarea label="Description" placeholder="" resize="vertical" {...register('desc')} />
        <Text c="red">{errors.desc && errors.desc.message}</Text>
        <TextInput label="Image URL" placeholder="" {...register('imgURL')} />
        <Text c="red">{errors.imgURL && errors.imgURL.message}</Text>
        <Text>Rating:</Text>
        <Input {...register('rating')} pointer component="select">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Input>
        <Group mt={10} justify="flex-end">
          <Button type="submit">Add Item</Button>
        </Group>
      </form>
    </>
  );
}
