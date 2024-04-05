import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { FoodList } from '../components/FoodList/FoodList';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <FoodList />
    </>
  );
}
