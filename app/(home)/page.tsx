import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import { getDashboard } from "../_data/get-dashboard";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import LastTransactions from "./_components/last-transactions";
import ExpensesPerCategory from "./_components/expenses-per-category";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM"); // Verifica se o mês é inválido

  if (monthIsInvalid) {
    // Pega o mês atual corretamente
    const currentMonth = new Date().getMonth() + 1; // O mês vai de 0 a 11, então +1
    const formattedMonth = String(currentMonth).padStart(2, "0"); // Formata para dois dígitos, ex: "04"

    // Se o parâmetro `month` não for válido, redireciona para o mês atual
    redirect(`?month=${formattedMonth}`);
  }

  const dashboard = await getDashboard(month);

  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <TimeSelect />
          </div>
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
