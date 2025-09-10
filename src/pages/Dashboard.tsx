import { useState, useRef } from "react";
import { useLeads, Lead } from "../hooks/useLeads";
import { useTranslation } from "../hooks/useTranslation";
import LeadFilters from "../components/LeadFilters";
import LeadList from "../components/LeadList";
import LeadDetailPanel from "../components/LeadDetailPanel";
import OpportunitiesTable from "../components/OpportunitiesTable";
import LanguageSelector from "../components/LanguageSelector";
import { Toast } from "../components/ui";

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
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [toastTitle, setToastTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [highlightedLeadId, setHighlightedLeadId] = useState<number | null>(null);
  const opportunitiesRef = useRef<HTMLDivElement>(null);
  const leadsRef = useRef<HTMLDivElement>(null);

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
      
      setSelectedLead(null);
      
      setToastType('success');
      setToastTitle(t('notifications.leadUpdated.title'));
      setToastMessage(t('notifications.leadUpdated.message'));
      setShowToast(true);
      
      setHighlightedLeadId(id);
      
      setTimeout(() => {
        if (leadsRef.current) {
          leadsRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 1000);
      
      setTimeout(() => {
        setHighlightedLeadId(null);
      }, 3000);
      
    } catch (error) {
      throw error;
    }
  };

  const handleConvertToOpportunity = async (lead: Lead, amount?: number) => {
    try {
      await convertToOpportunity(lead, amount);
      
      setToastType('success');
      setToastTitle(t('notifications.leadConverted.title'));
      setToastMessage(t('notifications.leadConverted.message'));
      setShowToast(true);
      
      setTimeout(() => {
        if (opportunitiesRef.current) {
          opportunitiesRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 1000);
      
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-8 sm:py-12">
            <div className="mb-6 sm:mb-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                {t('header.title')}
              </h1>
              <p className="text-lg text-blue-100 font-medium">
                {t('header.subtitle')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <LanguageSelector />
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                <div className="flex items-center space-x-4 text-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-200">{leads.length}</div>
                    <div className="text-sm text-blue-100">{t('leads.count', { count: leads.length })}</div>
                  </div>
                  <div className="w-px h-8 bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-200">{opportunities.length}</div>
                    <div className="text-sm text-green-100">{t('opportunities.count', { count: opportunities.length })}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Sidebar - Filters */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  Filtros
                </h2>
                <LeadFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  statusOptions={getUniqueStatuses()}
                  sourceOptions={getUniqueSources()}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="xl:col-span-4 space-y-8">
            {/* Leads Section */}
            <div ref={leadsRef} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-2xl">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Leads
                </h2>
              </div>
              <div className="p-4">
                <LeadList
                  leads={leads}
                  loading={loading}
                  error={error}
                  onSelect={setSelectedLead}
                  highlightedLeadId={highlightedLeadId}
                />
              </div>
            </div>

            {/* Opportunities Section */}
            <div ref={opportunitiesRef} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 rounded-t-2xl">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Oportunidades
                </h2>
              </div>
              <div className="p-4">
                <OpportunitiesTable opportunities={opportunities} />
              </div>
            </div>
          </div>
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

      {/* Toast Notification */}
      <Toast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type={toastType}
        title={toastTitle}
        message={toastMessage}
        duration={5000}
      />
    </div>
  );
}