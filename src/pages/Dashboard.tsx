import React, { useState } from "react";
import { useLeads, Lead } from "../hooks/useLeads";
import { useTranslation } from "../hooks/useTranslation";
import LeadFilters from "../components/LeadFilters";
import LeadList from "../components/LeadList";
import LeadDetailPanel from "../components/LeadDetailPanel";
import OpportunitiesTable from "../components/OpportunitiesTable";
import LanguageSelector from "../components/LanguageSelector";

export default function Dashboard() {
  const { t } = useTranslation();
  const { 
    leads, 
    opportunities,
    loading, 
    error,
    filters,
    setFilters,
    updateLead,
    convertToOpportunity,
    getUniqueStatuses,
    getUniqueSources
  } = useLeads();
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      source: '',
      sortBy: 'score',
      sortOrder: 'desc'
    });
  };

  const handleUpdateLead = async (id: number, updates: Partial<Lead>) => {
    try {
      await updateLead(id, updates);
    } catch (error) {
      // Error is already handled in the component
      throw error;
    }
  };

  const handleConvertToOpportunity = async (lead: Lead, amount?: number) => {
    try {
      await convertToOpportunity(lead, amount);
    } catch (error) {
      // Error is already handled in the hook
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-auto sm:h-16 py-4 sm:py-0">
            <div className="mb-2 sm:mb-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('header.title')}</h1>
              <p className="text-sm text-gray-500">{t('header.subtitle')}</p>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <div className="text-sm text-gray-500">
                {t('leads.count', { count: leads.length })} • {t('opportunities.count', { count: opportunities.length })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Filters */}
          <LeadFilters
            filters={filters}
            onFiltersChange={setFilters}
            statusOptions={getUniqueStatuses()}
            sourceOptions={getUniqueSources()}
            onClearFilters={handleClearFilters}
          />

          {/* Leads List */}
          <LeadList
            leads={leads}
            loading={loading}
            error={error}
            onSelect={setSelectedLead}
          />

          {/* Opportunities */}
          <OpportunitiesTable opportunities={opportunities} />
        </div>
      </main>

      {/* Lead Detail Panel */}
      <LeadDetailPanel
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdateLead={handleUpdateLead}
        onConvertToOpportunity={handleConvertToOpportunity}
        statusOptions={getUniqueStatuses()}
      />
    </div>
  );
}