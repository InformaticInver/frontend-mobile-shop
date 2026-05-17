import { Outlet } from 'react-router-dom';
import { Header } from '@/shared/components/Header/Header';
import styles from './AppLayout.module.css';

export function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
