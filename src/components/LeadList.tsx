import { Lead } from "../hooks/useLeads";
import { Card, Badge, LoadingSpinner, EmptyState } from './ui';

interface Props {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  onSelect: (lead: Lead) => void;
}

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'new':
      return 'info';
    case 'contacted':
      return 'warning';
    case 'qualified':
      return 'success';
    default:
      return 'default';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-blue-600';
  if (score >= 70) return 'text-yellow-600';
  return 'text-red-600';
};

export default function LeadList({ leads, loading, error, onSelect }: Props) {
  if (loading) {
    return (
      <Card className="flex items-center justify-center py-12">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-500">Carregando leads...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <EmptyState
          icon={
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          }
          title="Erro ao carregar leads"
          description={error}
        />
      </Card>
    );
  }

  if (leads.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          title="Nenhum lead encontrado"
          description="Tente ajustar os filtros para encontrar mais leads."
        />
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Leads</h2>
        <span className="text-sm text-gray-500">{leads.length} lead{leads.length !== 1 ? 's' : ''}</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Nome</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 hidden sm:table-cell">Empresa</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 hidden md:table-cell">Email</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 hidden lg:table-cell">Origem</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Score</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => onSelect(lead)}
                className="cursor-pointer hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="py-4 px-4">
                  <div className="font-medium text-gray-900">{lead.name}</div>
                  <div className="text-sm text-gray-500 sm:hidden">{lead.company}</div>
                </td>
                <td className="py-4 px-4 hidden sm:table-cell">
                  <div className="text-gray-600">{lead.company}</div>
                </td>
                <td className="py-4 px-4 hidden md:table-cell">
                  <div className="text-gray-600">{lead.email}</div>
                </td>
                <td className="py-4 px-4 hidden lg:table-cell">
                  <div className="text-gray-600">{lead.source}</div>
                </td>
                <td className="py-4 px-4">
                  <div className={`font-semibold ${getScoreColor(lead.score)}`}>
                    {lead.score}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge variant={getStatusVariant(lead.status)}>
                    {lead.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}