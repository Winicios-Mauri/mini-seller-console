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
    <div className="space-y-4">
      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="w-full text-gray-600 hover:text-gray-800 border-gray-300"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          {t('filters.clearFilters')}
        </Button>
      )}
      
      {/* Search Input */}
      <div className="space-y-2">
        <Input
          label={t('common.search')}
          placeholder={t('filters.searchPlaceholder')}
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          leftIcon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
      </div>
      
      {/* Status Filter */}
      <div className="space-y-2">
        <Select
          label={t('filters.status')}
          placeholder={t('common.all')}
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          options={statusOptions.map(status => ({ value: status, label: t(`status.${status.toLowerCase()}`) }))}
        />
      </div>
      
      {/* Source Filter */}
      <div className="space-y-2">
        <Select
          label={t('filters.source')}
          placeholder={t('common.all')}
          value={filters.source}
          onChange={(e) => handleFilterChange('source', e.target.value)}
          options={sourceOptions.map(source => ({ value: source, label: t(`source.${source.toLowerCase().replace(/\s+/g, '')}`) }))}
        />
      </div>
      
      {/* Sort Options */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">{t('filters.sortBy')}</label>
        <div className="space-y-2">
          <Button
            variant={filters.sortBy === 'score' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('score')}
            className="w-full justify-start"
          >
            <span className="flex items-center justify-between w-full">
              <span>{t('filters.score')}</span>
              {filters.sortBy === 'score' && (
                <span className="text-xs">
                  {filters.sortOrder === 'desc' ? '↓' : '↑'}
                </span>
              )}
            </span>
          </Button>
          <Button
            variant={filters.sortBy === 'name' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('name')}
            className="w-full justify-start"
          >
            <span className="flex items-center justify-between w-full">
              <span>{t('filters.name')}</span>
              {filters.sortBy === 'name' && (
                <span className="text-xs">
                  {filters.sortOrder === 'desc' ? '↓' : '↑'}
                </span>
              )}
            </span>
          </Button>
          <Button
            variant={filters.sortBy === 'company' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('company')}
            className="w-full justify-start"
          >
            <span className="flex items-center justify-between w-full">
              <span>{t('filters.company')}</span>
              {filters.sortBy === 'company' && (
                <span className="text-xs">
                  {filters.sortOrder === 'desc' ? '↓' : '↑'}
                </span>
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
