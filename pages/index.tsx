import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { FoodList } from '@/components/FoodList/Foodlist';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <FoodList />
    </>
  );
}
