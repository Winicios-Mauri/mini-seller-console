import React from 'react';
import { Input, Select, Button } from './ui';
import { LeadFilters as LeadFiltersType } from '../hooks/useLeads';
import { useTranslation } from '../hooks/useTranslation';

interface Props {
  filters: LeadFiltersType;
  onFiltersChange: (filters: LeadFiltersType) => void;
  statusOptions: string[];
  sourceOptions: string[];
  onClearFilters: () => void;
}

export default function LeadFilters({ 
  filters, 
  onFiltersChange, 
  statusOptions, 
  sourceOptions,
  onClearFilters 
}: Props) {
  const { t } = useTranslation();
  
  const handleFilterChange = (key: keyof LeadFiltersType, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSortChange = (sortBy: 'score' | 'name' | 'company') => {
    const newOrder = filters.sortBy === sortBy && filters.sortOrder === 'desc' ? 'asc' : 'desc';
    onFiltersChange({ ...filters, sortBy, sortOrder: newOrder });
  };

  const hasActiveFilters = filters.search || filters.status || filters.source;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{t('filters.title')}</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            {t('filters.clearFilters')}
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          label={t('common.search')}
          placeholder={t('filters.searchPlaceholder')}
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          leftIcon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
        
        <Select
          label={t('filters.status')}
          placeholder={t('common.all')}
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          options={statusOptions.map(status => ({ value: status, label: t(`status.${status.toLowerCase()}`) }))}
        />
        
        <Select
          label={t('filters.source')}
          placeholder={t('common.all')}
          value={filters.source}
          onChange={(e) => handleFilterChange('source', e.target.value)}
          options={sourceOptions.map(source => ({ value: source, label: t(`source.${source.toLowerCase().replace(' ', '')}`) }))}
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{t('filters.sortBy')}</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Button
              variant={filters.sortBy === 'score' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('score')}
              className="w-full"
            >
              {t('filters.score')} {filters.sortBy === 'score' && (filters.sortOrder === 'desc' ? '↓' : '↑')}
            </Button>
            <Button
              variant={filters.sortBy === 'name' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('name')}
              className="w-full"
            >
              {t('filters.name')} {filters.sortBy === 'name' && (filters.sortOrder === 'desc' ? '↓' : '↑')}
            </Button>
            <Button
              variant={filters.sortBy === 'company' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('company')}
              className="w-full"
            >
              {t('filters.company')} {filters.sortBy === 'company' && (filters.sortOrder === 'desc' ? '↓' : '↑')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
