import { Opportunity } from '../hooks/useLeads';
import { Card, Badge, EmptyState } from './ui';

interface Props {
  opportunities: Opportunity[];
}

const getStageVariant = (stage: string) => {
  switch (stage.toLowerCase()) {
    case 'prospecting':
      return 'info';
    case 'qualification':
      return 'warning';
    case 'proposal':
      return 'default';
    case 'negotiation':
      return 'warning';
    case 'closed-won':
      return 'success';
    case 'closed-lost':
      return 'danger';
    default:
      return 'default';
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

export default function OpportunitiesTable({ opportunities }: Props) {
  if (opportunities.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          title="Nenhuma oportunidade criada"
          description="Converta leads em oportunidades para começar a acompanhar o pipeline de vendas."
        />
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Oportunidades</h2>
        <span className="text-sm text-gray-500">{opportunities.length} oportunidade{opportunities.length !== 1 ? 's' : ''}</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Nome</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Estágio</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Valor</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Conta</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Criado em</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {opportunities.map((opp) => (
              <tr key={opp.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-4 px-4">
                  <div className="font-medium text-gray-900">{opp.name}</div>
                </td>
                <td className="py-4 px-4">
                  <Badge variant={getStageVariant(opp.stage)}>
                    {opp.stage}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-900">
                    {opp.amount ? formatCurrency(opp.amount) : '-'}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-600">{opp.accountName}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-500 text-sm">
                    {formatDate(opp.createdAt)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}