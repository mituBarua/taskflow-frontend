import { Toaster } from "sonner";

import AppLayout from "./components/layout/AppLayout";
import TasksPage from "./pages/TasksPage";

export default function App() {
  return (
    <>
      <AppLayout>
        <TasksPage />
      </AppLayout>

      <Toaster
        position="bottom-right"
        richColors
        closeButton
      />
    </>
  );
}