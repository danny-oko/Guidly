import { getDashboardData } from '../../lib/services/university.service';
import DashboardContent from './DashboardContent';

export default async function DashboardHome() {
  const { userName, universities } = await getDashboardData();

  return <DashboardContent userName={userName} universities={universities} />;
}
